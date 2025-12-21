/**
 * Formata números grandes para exibição (1K, 1M, etc)
 */
export function formatNumber(numStr: string | number): string {
    const num = typeof numStr === "string" ? parseInt(numStr) : numStr;
    if (isNaN(num)) return String(numStr);
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return String(num);
}

/**
 * Calcula percentual de crescimento de vídeos
 */
export function videoGrowthCalc(recent: number, total: number): string {
    if (!total || total === 0) return "0.0";
    return ((recent / total) * 100).toFixed(1);
}

/**
 * Calcula percentual de crescimento de views
 */
export function viewsGrowthCalc(recent: number, total: number): string {
    if (!total || total === 0) return "0.0";
    return ((recent / total) * 100).toFixed(1);
}

/**
 * Calcula idade do canal em formato legível
 */
export function calculateChannelAge(publishedAt: Date): string {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - publishedAt.getTime());
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    const diffMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));

    if (diffYears >= 1) {
        return diffYears === 1 ? "1 ano" : `${diffYears} anos`;
    }
    return diffMonths === 1 ? "1 mês" : `${diffMonths} meses`;
}

/**
 * Formata data para exibição local
 */
export function formatDate(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("pt-BR");
}

/**
 * Formata percentual
 */
export function formatPercent(value: number, decimals: number = 1): string {
    return value.toFixed(decimals) + "%";
}

