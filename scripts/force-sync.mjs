import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Gera bio com IA quando o canal não tem descrição
 */
async function generateBioWithAI(channelName, niche, subscriberCount, videoTitles) {
    if (!GEMINI_API_KEY) {
        console.log('⚠️ GEMINI_API_KEY não configurada, usando bio padrão');
        return `Criador de conteúdo de ${niche} com ${subscriberCount} inscritos.`;
    }

    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        // Tentar múltiplos modelos
        const modelsToTry = ['gemini-2.0-flash', 'gemini-pro', 'gemini-1.0-pro'];
        let model;
        for (const modelName of modelsToTry) {
            try {
                model = genAI.getGenerativeModel({ model: modelName });
                break;
            } catch {
                continue;
            }
        }
        if (!model) {
            model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        }

        const prompt = `
            Crie uma bio profissional e atraente para um Media Kit de criador de conteúdo.
            
            DADOS:
            - Nome do canal: ${channelName}
            - Nicho: ${niche}
            - Inscritos: ${subscriberCount}
            - Títulos de vídeos recentes: ${videoTitles.slice(0, 5).join(', ')}
            
            REGRAS:
            - Máximo 2 frases
            - Tom profissional mas acessível
            - Mencione o nicho e o tamanho da audiência
            - NÃO use emojis
            - Escreva em português brasileiro
            - Retorne APENAS o texto da bio, nada mais
        `;

        const result = await model.generateContent(prompt);
        const bio = result.response.text().trim();
        console.log('🤖 Bio gerada com IA:', bio);
        return bio;
    } catch (error) {
        console.error('❌ Erro ao gerar bio com IA:', error.message);
        return `Criador de conteúdo de ${niche} com ${subscriberCount} inscritos.`;
    }
}

/**
 * Formata número para exibição (1000 -> 1K, 1000000 -> 1M)
 */
function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

async function syncProfile(slug) {
    console.log(`🔄 Syncing profile: ${slug}`);
    
    // Get profile
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('id, youtube_channel_id, niche')
        .eq('username', slug)
        .single();
    
    if (!profile || !profile.youtube_channel_id) {
        console.log('❌ Profile not found or no YouTube ID');
        return;
    }
    
    console.log(`📺 YouTube Channel: ${profile.youtube_channel_id}`);
    
    // Fetch channel data
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics,contentDetails,snippet&id=${profile.youtube_channel_id}&key=${YOUTUBE_API_KEY}`;
    const channelRes = await fetch(channelUrl);
    const channelData = await channelRes.json();
    
    if (!channelData.items?.length) {
        console.log('❌ Channel not found');
        return;
    }
    
    const channel = channelData.items[0];
    const uploadsPlaylistId = channel.contentDetails?.relatedPlaylists?.uploads;
    const channelName = channel.snippet.title;
    const subscriberCount = formatNumber(parseInt(channel.statistics.subscriberCount) || 0);
    
    console.log(`📋 Uploads playlist: ${uploadsPlaylistId}`);
    console.log(`👤 Channel name: ${channelName}`);
    console.log(`📊 Subscribers: ${subscriberCount}`);
    
    // Fetch videos
    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=20&key=${YOUTUBE_API_KEY}`;
    const playlistRes = await fetch(playlistUrl);
    const playlistData = await playlistRes.json();
    
    if (!playlistData.items?.length) {
        console.log('❌ No videos found');
        return;
    }
    
    const videoIds = playlistData.items.map(item => item.snippet.resourceId.videoId).join(',');
    const videoTitles = playlistData.items.map(item => item.snippet.title);
    
    // Fetch video stats
    const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${YOUTUBE_API_KEY}`;
    const videosRes = await fetch(videosUrl);
    const videosData = await videosRes.json();
    
    const videos = videosData.items.map(video => ({
        profile_id: profile.id,
        video_id: video.id,
        title: video.snippet.title,
        view_count: parseInt(video.statistics.viewCount) || 0,
        like_count: parseInt(video.statistics.likeCount) || 0,
        comment_count: parseInt(video.statistics.commentCount) || 0,
        published_at: video.snippet.publishedAt
    }));
    
    console.log(`🎬 Found ${videos.length} videos`);
    
    // Gerar bio - usar do YouTube ou gerar com IA
    let bio = channel.snippet.description;
    if (!bio || bio.trim().length < 20) {
        console.log('📝 Canal sem descrição, gerando bio com IA...');
        bio = await generateBioWithAI(
            channelName,
            profile.niche || 'Entretenimento',
            subscriberCount,
            videoTitles
        );
    } else {
        console.log('📝 Usando descrição do YouTube');
    }
    
    // Update profile
    await supabase.from('profiles').update({ bio }).eq('id', profile.id);
    
    // Delete old videos
    await supabase.from('video_performance').delete().eq('profile_id', profile.id);
    
    // Insert new videos
    const { error: insertError } = await supabase.from('video_performance').insert(videos.slice(0, 10));
    
    if (insertError) {
        console.log('❌ Error inserting videos:', insertError);
        return;
    }
    
    console.log('✅ Sync complete!');
    console.log(`📄 Bio final: ${bio.substring(0, 100)}...`);
    
    // Verify
    const { data: check } = await supabase
        .from('video_performance')
        .select('video_id, title')
        .eq('profile_id', profile.id);
    
    console.log(`✅ Videos in DB: ${check?.length || 0}`);
}

const slug = process.argv[2] || 'renatocariani';
syncProfile(slug).catch(console.error);

