import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

// Usar service role para webhook (não tem usuário autenticado)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'Missing stripe-signature header' },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message);
        return NextResponse.json(
            { error: `Webhook Error: ${err.message}` },
            { status: 400 }
        );
    }

    // Handler para cada tipo de evento
    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                await handleCheckoutCompleted(session);
                break;
            }

            case 'customer.subscription.created': {
                const subscription = event.data.object as Stripe.Subscription;
                await handleSubscriptionCreated(subscription);
                break;
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                await handleSubscriptionUpdated(subscription);
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                await handleSubscriptionDeleted(subscription);
                break;
            }

            case 'invoice.payment_succeeded': {
                const invoice = event.data.object as Stripe.Invoice;
                await handlePaymentSucceeded(invoice);
                break;
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice;
                await handlePaymentFailed(invoice);
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });

    } catch (error: any) {
        console.error('Webhook handler error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

// Handlers
async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const { userId, profileId, planId } = session.metadata || {};

    if (!userId) {
        console.error('No userId in checkout session metadata');
        return;
    }

    console.log('Checkout completed:', { userId, profileId, planId });

    // Atualizar subscription no banco
    await supabaseAdmin
        .from('subscriptions')
        .update({
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: session.subscription as string,
            plan_id: planId || 'starter',
            status: session.subscription ? 'trial' : 'active', // Trial se tiver trial_period
            updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

    // Atualizar profile
    await supabaseAdmin
        .from('profiles')
        .update({
            subscription_status: 'trial',
            trial_used: true,
        })
        .eq('user_id', userId);
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
    const { userId, profileId, planId } = subscription.metadata || {};

    if (!userId) return;

    const status = subscription.status === 'trialing' ? 'trial' : 'active';

    await supabaseAdmin
        .from('subscriptions')
        .update({
            stripe_subscription_id: subscription.id,
            plan_id: planId || 'starter',
            status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            trial_ends_at: subscription.trial_end 
                ? new Date(subscription.trial_end * 1000).toISOString() 
                : null,
        })
        .eq('user_id', userId);

    await supabaseAdmin
        .from('profiles')
        .update({ subscription_status: status })
        .eq('user_id', userId);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    const { userId } = subscription.metadata || {};

    // Buscar por stripe_subscription_id se não tiver userId
    const { data: existingSubscription } = await supabaseAdmin
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_subscription_id', subscription.id)
        .single();

    const targetUserId = userId || existingSubscription?.user_id;
    if (!targetUserId) return;

    let status: string;
    switch (subscription.status) {
        case 'trialing':
            status = 'trial';
            break;
        case 'active':
            status = 'active';
            break;
        case 'canceled':
            status = 'cancelled';
            break;
        case 'past_due':
            status = 'past_due';
            break;
        default:
            status = 'expired';
    }

    await supabaseAdmin
        .from('subscriptions')
        .update({
            status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancelled_at: subscription.canceled_at 
                ? new Date(subscription.canceled_at * 1000).toISOString() 
                : null,
        })
        .eq('stripe_subscription_id', subscription.id);

    await supabaseAdmin
        .from('profiles')
        .update({ subscription_status: status })
        .eq('user_id', targetUserId);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    await supabaseAdmin
        .from('subscriptions')
        .update({
            status: 'cancelled',
            cancelled_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', subscription.id);

    // Buscar user_id para atualizar profile
    const { data } = await supabaseAdmin
        .from('subscriptions')
        .select('user_id')
        .eq('stripe_subscription_id', subscription.id)
        .single();

    if (data?.user_id) {
        await supabaseAdmin
            .from('profiles')
            .update({ subscription_status: 'cancelled' })
            .eq('user_id', data.user_id);
    }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
    if (!invoice.subscription) return;

    await supabaseAdmin
        .from('subscriptions')
        .update({
            status: 'active',
            updated_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', invoice.subscription as string);
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
    if (!invoice.subscription) return;

    await supabaseAdmin
        .from('subscriptions')
        .update({
            status: 'past_due',
            updated_at: new Date().toISOString(),
        })
        .eq('stripe_subscription_id', invoice.subscription as string);
}

