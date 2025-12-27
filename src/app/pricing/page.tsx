"use client";

import { useState } from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { PLANS, PLAN_LOSSES, FEATURE_LABELS, type Plan } from '@/lib/plans';
import Link from 'next/link';

export default function PricingPage() {
    const { subscription, isTrial, daysRemaining, openCheckout, isLoading } = useSubscription();
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    const handleSelectPlan = async (planId: string) => {
        setLoadingPlan(planId);
        try {
            await openCheckout(planId);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingPlan(null);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
            padding: '4rem 1rem',
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <Link href="/dashboard" style={{ color: '#8b5cf6', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
                        ← Voltar ao Dashboard
                    </Link>
                    
                    <h1 style={{
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        color: '#fff',
                        marginBottom: '1rem',
                    }}>
                        Escolha seu plano
                    </h1>
                    
                    {isTrial && daysRemaining > 0 && (
                        <div style={{
                            display: 'inline-block',
                            padding: '0.5rem 1rem',
                            background: 'rgba(245, 158, 11, 0.2)',
                            border: '1px solid rgba(245, 158, 11, 0.5)',
                            borderRadius: '9999px',
                            color: '#f59e0b',
                            fontSize: '0.9rem',
                            marginBottom: '1rem',
                        }}>
                            ⏰ Seu trial acaba em {daysRemaining} dia{daysRemaining > 1 ? 's' : ''}
                        </div>
                    )}
                    
                    <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
                        Todos os planos incluem trial de 5 dias com todas as funcionalidades.
                        Cancele a qualquer momento.
                    </p>
                </div>

                {/* Billing Toggle */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '3rem',
                }}>
                    <div style={{
                        display: 'flex',
                        background: 'rgba(30, 30, 46, 0.6)',
                        borderRadius: '9999px',
                        padding: '4px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}>
                        <button
                            onClick={() => setBillingPeriod('monthly')}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '9999px',
                                border: 'none',
                                background: billingPeriod === 'monthly' 
                                    ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' 
                                    : 'transparent',
                                color: billingPeriod === 'monthly' ? '#fff' : '#94a3b8',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            Mensal
                        </button>
                        <button
                            onClick={() => setBillingPeriod('yearly')}
                            style={{
                                padding: '0.75rem 1.5rem',
                                borderRadius: '9999px',
                                border: 'none',
                                background: billingPeriod === 'yearly' 
                                    ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' 
                                    : 'transparent',
                                color: billingPeriod === 'yearly' ? '#fff' : '#94a3b8',
                                fontWeight: 500,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                            }}
                        >
                            Anual
                            <span style={{
                                marginLeft: '0.5rem',
                                padding: '2px 8px',
                                background: 'rgba(16, 185, 129, 0.2)',
                                color: '#10b981',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                            }}>
                                -17%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    alignItems: 'stretch',
                }}>
                    {Object.values(PLANS).map((plan) => (
                        <PricingCard
                            key={plan.id}
                            plan={plan}
                            billingPeriod={billingPeriod}
                            isCurrentPlan={subscription?.planId === plan.id && !isTrial}
                            isTrial={isTrial}
                            onSelect={() => handleSelectPlan(plan.id)}
                            isLoading={loadingPlan === plan.id}
                            losses={PLAN_LOSSES[plan.id]}
                        />
                    ))}
                </div>

                {/* FAQ / Info */}
                <div style={{
                    marginTop: '4rem',
                    textAlign: 'center',
                    color: '#6b7280',
                    fontSize: '0.9rem',
                }}>
                    <p>💳 Pagamento seguro via Stripe • 🔒 Cancele quando quiser • 📧 Suporte por email</p>
                </div>
            </div>
        </div>
    );
}

function PricingCard({
    plan,
    billingPeriod,
    isCurrentPlan,
    isTrial,
    onSelect,
    isLoading,
    losses,
}: {
    plan: Plan;
    billingPeriod: 'monthly' | 'yearly';
    isCurrentPlan: boolean;
    isTrial: boolean;
    onSelect: () => void;
    isLoading: boolean;
    losses: string[];
}) {
    const price = billingPeriod === 'yearly' ? plan.priceYearly : plan.priceMonthly;
    const monthlyEquivalent = billingPeriod === 'yearly' 
        ? Math.round(plan.priceYearly / 12) 
        : plan.priceMonthly;

    return (
        <div style={{
            background: plan.isPopular
                ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(99, 102, 241, 0.1))'
                : 'rgba(30, 30, 46, 0.6)',
            border: `2px solid ${plan.isPopular ? 'rgba(139, 92, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
            borderRadius: '1.5rem',
            padding: '2rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Popular Badge */}
            {plan.isPopular && (
                <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                    padding: '0.25rem 1rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#fff',
                }}>
                    ⭐ Mais Popular
                </div>
            )}

            {/* Plan Name */}
            <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '0.5rem',
                marginTop: plan.isPopular ? '0.5rem' : 0,
            }}>
                {plan.name}
            </h3>
            
            <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                {plan.description}
            </p>

            {/* Price */}
            <div style={{ marginBottom: '1.5rem' }}>
                <span style={{
                    fontSize: '3rem',
                    fontWeight: 700,
                    color: '#fff',
                }}>
                    R${monthlyEquivalent}
                </span>
                <span style={{ color: '#6b7280' }}>/mês</span>
                
                {billingPeriod === 'yearly' && (
                    <div style={{ color: '#10b981', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        Cobrado R${price}/ano
                    </div>
                )}
            </div>

            {/* Features */}
            <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: '0 0 1.5rem 0',
                flex: 1,
            }}>
                <li style={{ 
                    color: '#fff', 
                    padding: '0.5rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}>
                    <span style={{ color: '#10b981' }}>✓</span>
                    {plan.maxPlatforms === 999 ? 'Plataformas ilimitadas' : `${plan.maxPlatforms} plataforma${plan.maxPlatforms > 1 ? 's' : ''}`}
                </li>
                <li style={{ 
                    color: '#fff', 
                    padding: '0.5rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}>
                    <span style={{ color: '#10b981' }}>✓</span>
                    {plan.maxMediaKits === 999 ? 'Media Kits ilimitados' : `${plan.maxMediaKits} Media Kit${plan.maxMediaKits > 1 ? 's' : ''}`}
                </li>
                {plan.features.map((feature) => (
                    <li key={feature} style={{ 
                        color: '#94a3b8', 
                        padding: '0.5rem 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.9rem',
                    }}>
                        <span style={{ color: '#10b981' }}>✓</span>
                        {FEATURE_LABELS[feature]}
                    </li>
                ))}
            </ul>

            {/* Losses (what you lose from trial) */}
            {isTrial && losses && losses.length > 0 && (
                <div style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '0.75rem',
                    padding: '1rem',
                    marginBottom: '1.5rem',
                }}>
                    <p style={{ color: '#f87171', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                        ⚠️ Você vai perder:
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {losses.map((loss, i) => (
                            <li key={i} style={{ 
                                color: '#fca5a5', 
                                fontSize: '0.8rem',
                                padding: '0.25rem 0',
                            }}>
                                • {loss}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* CTA Button */}
            <button
                onClick={onSelect}
                disabled={isLoading || isCurrentPlan}
                style={{
                    width: '100%',
                    padding: '1rem',
                    background: isCurrentPlan 
                        ? 'rgba(16, 185, 129, 0.2)'
                        : plan.isPopular 
                            ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' 
                            : 'rgba(255, 255, 255, 0.1)',
                    border: isCurrentPlan 
                        ? '1px solid rgba(16, 185, 129, 0.5)'
                        : 'none',
                    borderRadius: '0.75rem',
                    color: isCurrentPlan ? '#10b981' : '#fff',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: isLoading || isCurrentPlan ? 'not-allowed' : 'pointer',
                    opacity: isLoading ? 0.7 : 1,
                    transition: 'all 0.2s',
                }}
            >
                {isLoading ? 'Carregando...' : isCurrentPlan ? '✓ Plano Atual' : 'Começar com ' + plan.name}
            </button>
        </div>
    );
}

