export interface CaseStudy {
    id: string;
    brandName: string;
    logoUrl: string; // URL to the uploaded logo
    videoUrl?: string; // YouTube or Instagram embed link
    description?: string; // Brief campaign goal
    metrics?: string; // "500k views, 10% conversion"
}

export interface PricingPackage {
    title: string;
    price: string;
    features: string[];
    isPopular?: boolean;
    isActive?: boolean;
}

export interface ProfileContext {
    name?: string;
    bio?: string;
    niche?: string;
    metrics?: any[];
    videos?: any[];
}
