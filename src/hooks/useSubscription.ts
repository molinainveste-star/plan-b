"use client";

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { PLANS, getDaysRemaining, type Plan } from '@/lib/plans';

export interface SubscriptionData {
    id: string;
    userId: string;
    planId: string;
    status: 'trial' | 'active' | 'cancelled' | 'expired' | 'past_due';
    trialEndsAt: string | null;
    currentPeriodEnd: string | null;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
}

export interface UseSubscriptionReturn {
    subscription: SubscriptionData | null;
    plan: Plan | null;
    isLoading: boolean;
    error: string | null;
    
    // Status helpers
    isTrial: boolean;
    isActive: boolean;
    isExpired: boolean;
    daysRemaining: number;
    
    // Plan helpers
    maxPlatforms: number;
    maxMediaKits: number;
    canConnectPlatform: (currentCount: number) => boolean;
    canCreateMediaKit: (currentCount: number) => boolean;
    hasFeature: (feature: string) => boolean;
    
    // Actions
    refresh: () => Promise<void>;
    openCheckout: (planId: string) => Promise<void>;
    openPortal: () => Promise<void>;
}

export function useSubscription(): UseSubscriptionReturn {
    const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSubscription = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                setSubscription(null);
                return;
            }

            const { data, error: fetchError } = await supabase
                .from('subscriptions')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (fetchError && fetchError.code !== 'PGRST116') {
                throw fetchError;
            }

            if (data) {
                setSubscription({
                    id: data.id,
                    userId: data.user_id,
                    planId: data.plan_id || 'starter',
                    status: data.status,
                    trialEndsAt: data.trial_ends_at,
                    currentPeriodEnd: data.current_period_end,
                    stripeCustomerId: data.stripe_customer_id,
                    stripeSubscriptionId: data.stripe_subscription_id,
                });
            }
        } catch (err: any) {
            setError(err.message);
            console.error('Error fetching subscription:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSubscription();
    }, [fetchSubscription]);

    // Computed values
    const plan = subscription ? PLANS[subscription.planId] || PLANS.starter : null;
    const isTrial = subscription?.status === 'trial';
    const isActive = subscription?.status === 'active' || isTrial;
    const isExpired = subscription?.status === 'expired' || subscription?.status === 'cancelled';
    
    const daysRemaining = isTrial && subscription?.trialEndsAt
        ? getDaysRemaining(subscription.trialEndsAt)
        : 0;

    const maxPlatforms = plan?.maxPlatforms || 1;
    const maxMediaKits = plan?.maxMediaKits || 1;

    // Helper functions
    const canConnectPlatform = (currentCount: number) => {
        if (!isActive) return false;
        // Durante trial, pode tudo
        if (isTrial) return true;
        return currentCount < maxPlatforms;
    };

    const canCreateMediaKit = (currentCount: number) => {
        if (!isActive) return false;
        if (isTrial) return true;
        return currentCount < maxMediaKits;
    };

    const hasFeature = (feature: string) => {
        if (!plan) return false;
        if (isTrial) return true; // Trial tem tudo
        return plan.features.includes(feature as any);
    };

    // Actions
    const openCheckout = async (planId: string) => {
        try {
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planId }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            // Redirect to Stripe Checkout
            window.location.href = data.url;
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const openPortal = async () => {
        try {
            const response = await fetch('/api/stripe/portal', {
                method: 'POST',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            // Redirect to Stripe Portal
            window.location.href = data.url;
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    return {
        subscription,
        plan,
        isLoading,
        error,
        isTrial,
        isActive,
        isExpired,
        daysRemaining,
        maxPlatforms,
        maxMediaKits,
        canConnectPlatform,
        canCreateMediaKit,
        hasFeature,
        refresh: fetchSubscription,
        openCheckout,
        openPortal,
    };
}

