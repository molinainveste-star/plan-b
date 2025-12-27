import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createBillingPortalSession } from '@/lib/stripe';

export async function POST(request: NextRequest) {
    try {
        // Verificar usuário autenticado
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json(
                { error: 'Não autenticado' },
                { status: 401 }
            );
        }

        // Buscar subscription com stripe_customer_id
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('stripe_customer_id')
            .eq('user_id', user.id)
            .single();

        if (!subscription?.stripe_customer_id) {
            return NextResponse.json(
                { error: 'Nenhuma assinatura encontrada' },
                { status: 404 }
            );
        }

        // Criar portal session
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
        const returnUrl = `${baseUrl}/dashboard`;

        const session = await createBillingPortalSession({
            customerId: subscription.stripe_customer_id,
            returnUrl,
        });

        return NextResponse.json({ url: session.url });

    } catch (error: any) {
        console.error('Portal error:', error);
        return NextResponse.json(
            { error: error.message || 'Erro ao abrir portal' },
            { status: 500 }
        );
    }
}

