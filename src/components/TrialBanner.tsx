"use client";

import Link from 'next/link';
import { useSubscription } from '@/hooks/useSubscription';

export function TrialBanner() {
    const { isTrial, isExpired, daysRemaining, isLoading } = useSubscription();

    if (isLoading) return null;

    // Não mostrar se não está em trial e não expirou
    if (!isTrial && !isExpired) return null;

    // Determinar cor baseado nos dias restantes
    let bgColor = 'rgba(16, 185, 129, 0.1)'; // verde
    let borderColor = 'rgba(16, 185, 129, 0.3)';
    let textColor = '#10b981';
    let icon = '✨';

    if (isExpired) {
        bgColor = 'rgba(239, 68, 68, 0.1)';
        borderColor = 'rgba(239, 68, 68, 0.3)';
        textColor = '#ef4444';
        icon = '🚫';
    } else if (daysRemaining <= 1) {
        bgColor = 'rgba(239, 68, 68, 0.1)';
        borderColor = 'rgba(239, 68, 68, 0.3)';
        textColor = '#ef4444';
        icon = '⚠️';
    } else if (daysRemaining <= 2) {
        bgColor = 'rgba(245, 158, 11, 0.1)';
        borderColor = 'rgba(245, 158, 11, 0.3)';
        textColor = '#f59e0b';
        icon = '⏰';
    }

    return (
        <div style={{
            background: bgColor,
            border: `1px solid ${borderColor}`,
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            marginBottom: '1.5rem',
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>{icon}</span>
                <span style={{ color: textColor, fontWeight: 500, fontSize: '0.9rem' }}>
                    {isExpired ? (
                        'Seu trial expirou. Escolha um plano para continuar.'
                    ) : daysRemaining === 0 ? (
                        'Seu trial expira HOJE!'
                    ) : daysRemaining === 1 ? (
                        'Seu trial expira amanhã!'
                    ) : (
                        `Trial: ${daysRemaining} dias restantes`
                    )}
                </span>
            </div>

            <Link
                href="/pricing"
                style={{
                    padding: '0.5rem 1rem',
                    background: isExpired || daysRemaining <= 1 
                        ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                        : 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                    color: '#fff',
                    borderRadius: '0.5rem',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    transition: 'all 0.2s',
                }}
            >
                {isExpired ? 'Escolher Plano' : 'Ver Planos'}
            </Link>
        </div>
    );
}

