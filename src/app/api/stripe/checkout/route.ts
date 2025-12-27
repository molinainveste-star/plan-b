import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { getStripe, createStripeCustomer } from '@/lib/stripe';
import { PLANS, TRIAL_DAYS } from '@/lib/plans';

export async function POST(request: NextRequest) {
    try {
        const { planId, billingPeriod = 'monthly' } = await request.json();

        // Verificar usuário autenticado
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Não autenticado' },
                { status: 401 }
            );
        }

        // Buscar perfil e subscription
        let { data: profile } = await supabase
            .from('profiles')
            .select('*, subscriptions(*)')
            .eq('user_id', user.id)
            .single();

        // Se perfil não existe, criar usando admin client (bypassa RLS)
        if (!profile) {
            const username = user.email?.split('@')[0]?.toLowerCase().replace(/[^a-z0-9]/g, '') || `user${Date.now()}`;
            const uniqueUsername = username + Math.floor(Math.random() * 10000);
            
            console.log('Creating profile for user:', user.id, 'username:', uniqueUsername);
            
            const { data: newProfile, error: createError } = await supabaseAdmin
                .from('profiles')
                .insert({
                    user_id: user.id,
                    email: user.email,
                    full_name: user.user_metadata?.full_name || user.user_metadata?.name || username,
                    username: uniqueUsername,
                    subscription_status: 'trial',
                })
                .select('*')
                .single();

            if (createError) {
                console.error('Error creating profile:', createError);
                return NextResponse.json(
                    { error: `Erro ao criar perfil: ${createError.message}` },
                    { status: 500 }
                );
            }

            console.log('Profile created:', newProfile.id);

            // Criar subscription para o novo usuário
            const { error: subError } = await supabaseAdmin
                .from('subscriptions')
                .insert({
                    user_id: user.id,
                    profile_id: newProfile.id,
                    status: 'trial',
                    plan_id: 'starter',
                });

            if (subError) {
                console.error('Error creating subscription:', subError);
            }

            // Buscar novamente com subscription
            const { data: refreshedProfile } = await supabaseAdmin
                .from('profiles')
                .select('*, subscriptions(*)')
                .eq('user_id', user.id)
                .single();

            profile = refreshedProfile;
        }

        if (!profile) {
            return NextResponse.json(
                { error: 'Erro ao criar perfil' },
                { status: 500 }
            );
        }

        // Verificar plano
        const plan = PLANS[planId];
        if (!plan) {
            return NextResponse.json(
                { error: 'Plano inválido' },
                { status: 400 }
            );
        }

        // Obter ou criar customer no Stripe
        let customerId = profile.subscriptions?.[0]?.stripe_customer_id;

        if (!customerId) {
            const customer = await createStripeCustomer({
                email: user.email!,
                name: profile.full_name || undefined,
                userId: user.id,
            });
            customerId = customer.id;

            // Salvar customer_id
            await supabase
                .from('subscriptions')
                .update({ stripe_customer_id: customerId })
                .eq('user_id', user.id);
        }

        // Determinar se é trial ou não
        const subscription = profile.subscriptions?.[0];
        const isNewUser = !subscription || subscription.status === 'trial';
        const trialDays = isNewUser ? TRIAL_DAYS : 0;

        // Usar Price ID pré-cadastrado no Stripe
        const priceId = billingPeriod === 'yearly' 
            ? plan.stripePriceIdYearly 
            : plan.stripePriceIdMonthly;

        if (!priceId) {
            return NextResponse.json(
                { error: 'Preço não configurado para este plano' },
                { status: 400 }
            );
        }

        // URLs de callback
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
        const successUrl = `${baseUrl}/dashboard?success=subscription&plan=${planId}`;
        const cancelUrl = `${baseUrl}/pricing?cancelled=true`;

        // Criar Checkout Session
        const session = await getStripe().checkout.sessions.create({
            customer: customerId,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            subscription_data: {
                trial_period_days: trialDays,
                metadata: {
                    userId: user.id,
                    profileId: profile.id,
                    planId,
                },
            },
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                userId: user.id,
                profileId: profile.id,
                planId,
            },
            allow_promotion_codes: true,
            billing_address_collection: 'required',
            locale: 'pt-BR',
        });

        return NextResponse.json({ 
            url: session.url,
            sessionId: session.id,
        });

    } catch (error: any) {
        console.error('Checkout error:', error);
        return NextResponse.json(
            { error: error.message || 'Erro ao criar checkout' },
            { status: 500 }
        );
    }
}

