"use client";

import { useState, useEffect } from 'react';
import { useSubscription } from '@/hooks/useSubscription';

export interface Platform {
    id: string;
    name: string;
    icon: string;
    color: string;
    connected: boolean;
}

const PLATFORMS: Platform[] = [
    { id: 'youtube', name: 'YouTube', icon: '📺', color: '#FF0000', connected: false },
    { id: 'tiktok', name: 'TikTok', icon: '🎵', color: '#00F2EA', connected: false },
    { id: 'instagram', name: 'Instagram', icon: '📸', color: '#E4405F', connected: false },
    { id: 'twitter', name: 'Twitter/X', icon: '𝕏', color: '#1DA1F2', connected: false },
];

interface PlatformFilterProps {
    connectedPlatforms: string[]; // IDs das plataformas conectadas
    selectedPlatforms: string[];
    onSelectionChange: (selected: string[]) => void;
    showUpgradeModal?: () => void;
}

export function PlatformFilter({
    connectedPlatforms,
    selectedPlatforms,
    onSelectionChange,
    showUpgradeModal,
}: PlatformFilterProps) {
    const { isTrial, maxPlatforms, canConnectPlatform } = useSubscription();
    
    // "Geral" = todas as plataformas conectadas selecionadas
    const isAllSelected = connectedPlatforms.length > 0 && 
        connectedPlatforms.every(p => selectedPlatforms.includes(p));

    const handleTogglePlatform = (platformId: string) => {
        const isCurrentlySelected = selectedPlatforms.includes(platformId);

        if (isCurrentlySelected) {
            // Sempre pode remover
            const newSelection = selectedPlatforms.filter(p => p !== platformId);
            // Garantir que pelo menos uma esteja selecionada
            if (newSelection.length === 0 && connectedPlatforms.length > 0) {
                onSelectionChange([connectedPlatforms[0]]);
            } else {
                onSelectionChange(newSelection);
            }
        } else {
            // Verificar limite do plano
            if (!isTrial && selectedPlatforms.length >= maxPlatforms) {
                showUpgradeModal?.();
                return;
            }
            onSelectionChange([...selectedPlatforms, platformId]);
        }
    };

    const handleSelectAll = () => {
        if (isAllSelected) {
            // Deselecionar tudo, manter só a primeira
            onSelectionChange(connectedPlatforms.slice(0, 1));
        } else {
            // Selecionar todas conectadas (respeitando limite)
            if (!isTrial && connectedPlatforms.length > maxPlatforms) {
                showUpgradeModal?.();
                return;
            }
            onSelectionChange([...connectedPlatforms]);
        }
    };

    const platforms = PLATFORMS.map(p => ({
        ...p,
        connected: connectedPlatforms.includes(p.id),
    }));

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '1.5rem',
        }}>
            {/* Botão Geral */}
            {connectedPlatforms.length > 1 && (
                <FilterChip
                    label="Geral"
                    icon="📊"
                    isSelected={isAllSelected}
                    onClick={handleSelectAll}
                    color="#8b5cf6"
                />
            )}

            {/* Plataformas */}
            {platforms.map((platform) => (
                <FilterChip
                    key={platform.id}
                    label={platform.name}
                    icon={platform.icon}
                    isSelected={selectedPlatforms.includes(platform.id)}
                    isConnected={platform.connected}
                    isDisabled={!platform.connected}
                    onClick={() => platform.connected && handleTogglePlatform(platform.id)}
                    color={platform.color}
                    showLock={!platform.connected}
                />
            ))}

            {/* Indicador de limite */}
            {!isTrial && maxPlatforms < 999 && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem 0.75rem',
                    color: '#6b7280',
                    fontSize: '0.75rem',
                }}>
                    {selectedPlatforms.length}/{maxPlatforms} selecionadas
                </div>
            )}
        </div>
    );
}

interface FilterChipProps {
    label: string;
    icon: string;
    isSelected: boolean;
    isConnected?: boolean;
    isDisabled?: boolean;
    onClick: () => void;
    color: string;
    showLock?: boolean;
}

function FilterChip({
    label,
    icon,
    isSelected,
    isConnected = true,
    isDisabled = false,
    onClick,
    color,
    showLock = false,
}: FilterChipProps) {
    return (
        <button
            onClick={onClick}
            disabled={isDisabled}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                border: `2px solid ${isSelected ? color : 'rgba(255, 255, 255, 0.1)'}`,
                background: isSelected 
                    ? `${color}20` 
                    : 'rgba(30, 30, 46, 0.6)',
                color: isSelected ? '#fff' : isDisabled ? '#4b5563' : '#94a3b8',
                fontWeight: isSelected ? 600 : 400,
                fontSize: '0.875rem',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.5 : 1,
                transition: 'all 0.2s',
            }}
        >
            <span>{icon}</span>
            <span>{label}</span>
            {showLock && <span style={{ fontSize: '0.7rem' }}>🔒</span>}
            {isSelected && isConnected && (
                <span style={{ 
                    width: '6px', 
                    height: '6px', 
                    borderRadius: '50%', 
                    background: color,
                }} />
            )}
        </button>
    );
}

// Hook para gerenciar estado do filtro
export function usePlatformFilter(connectedPlatforms: string[]) {
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        // Inicializar com todas as plataformas conectadas
        if (connectedPlatforms.length > 0 && selected.length === 0) {
            setSelected(connectedPlatforms);
        }
    }, [connectedPlatforms]);

    return {
        selectedPlatforms: selected,
        setSelectedPlatforms: setSelected,
        isAllSelected: connectedPlatforms.every(p => selected.includes(p)),
    };
}

