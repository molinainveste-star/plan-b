"use client";

import Link from 'next/link';

interface TrialWatermarkProps {
    variant?: 'footer' | 'badge';
    showUpgradeLink?: boolean;
}

// Footer para Media Kit público (trial)
export function TrialWatermark({ 
    variant = 'footer',
    showUpgradeLink = true,
}: TrialWatermarkProps) {
    if (variant === 'badge') {
        return (
            <div style={{
                position: 'fixed',
                bottom: '1rem',
                right: '1rem',
                padding: '0.5rem 1rem',
                background: 'rgba(139, 92, 246, 0.9)',
                backdropFilter: 'blur(8px)',
                borderRadius: '9999px',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 500,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)',
            }}>
                <span>✨</span>
                <span>Powered by Provly</span>
                <span style={{ 
                    padding: '2px 6px', 
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    fontSize: '0.65rem',
                }}>
                    Trial
                </span>
            </div>
        );
    }

    // Footer variant (default)
    return (
        <div 
            style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '1.5rem 2rem',
                marginTop: '3rem',
                textAlign: 'center',
                background: 'linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.05))',
            }}
            className="trial-watermark no-print"
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap',
            }}>
                <span style={{ 
                    fontSize: '1.25rem',
                    background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                }}>
                    ✨
                </span>
                
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                    Powered by
                </span>
                
                <Link
                    href="https://provly.com"
                    target="_blank"
                    style={{
                        color: '#fff',
                        fontWeight: 600,
                        textDecoration: 'none',
                        fontSize: '1rem',
                    }}
                >
                    Provly
                </Link>
                
                <span style={{
                    padding: '0.25rem 0.5rem',
                    background: 'rgba(245, 158, 11, 0.2)',
                    color: '#f59e0b',
                    borderRadius: '4px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                }}>
                    Trial Version
                </span>
            </div>

            {showUpgradeLink && (
                <p style={{
                    color: '#6b7280',
                    fontSize: '0.8rem',
                    marginTop: '0.75rem',
                }}>
                    Crie seu Media Kit profissional em{' '}
                    <Link
                        href="https://provly.com"
                        target="_blank"
                        style={{ color: '#8b5cf6', textDecoration: 'none' }}
                    >
                        provly.com
                    </Link>
                </p>
            )}
        </div>
    );
}

// Para PDF - marca d'água mais visível
export function PdfWatermark() {
    return (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            fontSize: '4rem',
            fontWeight: 700,
            color: 'rgba(139, 92, 246, 0.1)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 1,
        }}>
            PROVLY TRIAL
        </div>
    );
}

