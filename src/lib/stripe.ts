import Stripe from 'stripe';

// Stripe server-side client
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-04-30.basil',
    typescript: true,
});

// Helpers para criar checkout session
export async function createCheckoutSession({
    customerId,
    priceId,
    userId,
    profileId,
    successUrl,
    cancelUrl,
    trialDays = 5,
}: {
    customerId?: string;
    priceId: string;
    userId: string;
    profileId: string;
    successUrl: string;
    cancelUrl: string;
    trialDays?: number;
}) {
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
                userId,
                profileId,
            },
        },
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
            userId,
            profileId,
        },
        allow_promotion_codes: true,
        billing_address_collection: 'required',
    });

    return session;
}

// Criar portal de billing para gerenciar assinatura
export async function createBillingPortalSession({
    customerId,
    returnUrl,
}: {
    customerId: string;
    returnUrl: string;
}) {
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });

    return session;
}

// Criar customer no Stripe
export async function createStripeCustomer({
    email,
    name,
    userId,
}: {
    email: string;
    name?: string;
    userId: string;
}) {
    const customer = await stripe.customers.create({
        email,
        name,
        metadata: {
            userId,
        },
    });

    return customer;
}

// Cancelar subscription
export async function cancelSubscription(subscriptionId: string) {
    const subscription = await stripe.subscriptions.cancel(subscriptionId);
    return subscription;
}

// Obter subscription
export async function getSubscription(subscriptionId: string) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
}

