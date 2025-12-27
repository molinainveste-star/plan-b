import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe, createStripeCustomer } from '@/lib/stripe';
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
        const { data: profile } = await supabase
            .from('profiles')
            .select('*, subscriptions(*)')
            .eq('user_id', user.id)
            .single();

        if (!profile) {
            return NextResponse.json(
                { error: 'Perfil não encontrado' },
                { status: 404 }
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

        // Criar preço no Stripe (ou usar existente)
        // Por enquanto, criamos dinamicamente - em produção, usar preços pré-cadastrados
        const priceAmount = billingPeriod === 'yearly' 
            ? plan.priceYearly * 100 // centavos
            : plan.priceMonthly * 100;

        const priceInterval = billingPeriod === 'yearly' ? 'year' : 'month';

        // Buscar ou criar produto/preço
        let priceId = billingPeriod === 'yearly' 
            ? plan.stripePriceIdYearly 
            : plan.stripePriceIdMonthly;

        if (!priceId) {
            // Criar produto e preço dinamicamente
            const product = await stripe.products.create({
                name: `Provly ${plan.name}`,
                description: plan.description,
                metadata: { planId },
            });

            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: priceAmount,
                currency: 'brl',
                recurring: { interval: priceInterval },
                metadata: { planId, billingPeriod },
            });

            priceId = price.id;
        }

        // URLs de callback
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
        const successUrl = `${baseUrl}/dashboard?success=subscription&plan=${planId}`;
        const cancelUrl = `${baseUrl}/pricing?cancelled=true`;

        // Criar Checkout Session
        const session = await stripe.checkout.sessions.create({
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

