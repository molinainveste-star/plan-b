import { z } from "zod";

// ===========================================
// SLUG VALIDATION (Sanitização + Regex)
// ===========================================
const slugRegex = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/;

export const slugSchema = z
    .string()
    .min(3, "Slug deve ter no mínimo 3 caracteres")
    .max(30, "Slug deve ter no máximo 30 caracteres")
    .transform((val) => val.toLowerCase().trim())
    .refine((val) => slugRegex.test(val), {
        message: "Slug inválido. Use apenas letras minúsculas, números e hífens",
    });

// ===========================================
// EMAIL VALIDATION
// ===========================================
export const emailSchema = z
    .string()
    .email("Email inválido")
    .max(255, "Email muito longo")
    .transform((val) => val.toLowerCase().trim());

// ===========================================
// YOUTUBE INPUT VALIDATION
// ===========================================
const youtubeChannelIdRegex = /^UC[a-zA-Z0-9_-]{22}$/;
const youtubeHandleRegex = /^@?[a-zA-Z0-9_.-]+$/;
const youtubeUrlRegex = /^https?:\/\/(www\.)?youtube\.com\/(channel\/UC[a-zA-Z0-9_-]{22}|@[a-zA-Z0-9_.-]+|c\/[a-zA-Z0-9_.-]+)/;

export const youtubeInputSchema = z
    .string()
    .min(1, "YouTube input é obrigatório")
    .max(200, "Input muito longo")
    .trim()
    .refine(
        (val) =>
            youtubeChannelIdRegex.test(val) ||
            youtubeHandleRegex.test(val) ||
            youtubeUrlRegex.test(val),
        {
            message: "Formato inválido. Use @handle, Channel ID (UC...) ou URL do YouTube",
        }
    );

// Optional YouTube input (para criação de perfil)
export const youtubeInputOptionalSchema = z
    .string()
    .max(200, "Input muito longo")
    .trim()
    .optional()
    .refine(
        (val) => {
            if (!val || val === "") return true;
            return (
                youtubeChannelIdRegex.test(val) ||
                youtubeHandleRegex.test(val) ||
                youtubeUrlRegex.test(val)
            );
        },
        {
            message: "Formato inválido. Use @handle, Channel ID (UC...) ou URL do YouTube",
        }
    );

// ===========================================
// PROFILE SCHEMAS
// ===========================================
export const createProfileSchema = z.object({
    name: z
        .string()
        .min(2, "Nome deve ter no mínimo 2 caracteres")
        .max(100, "Nome muito longo")
        .trim(),
    email: emailSchema,
    slug: slugSchema,
    youtubeChannelId: youtubeInputOptionalSchema,
});

export type CreateProfileInput = z.infer<typeof createProfileSchema>;

// ===========================================
// UPDATE SCHEMAS
// ===========================================
export const updateYouTubeMetricsSchema = z.object({
    slug: slugSchema,
    input: youtubeInputSchema,
});

export const updateProfileStorySchema = z.object({
    slug: slugSchema,
    story: z.string().max(5000, "História muito longa").trim(),
    pitch: z.string().max(2000, "Pitch muito longo").trim(),
});

export const updateProfileAvatarSchema = z.object({
    slug: slugSchema,
    avatarUrl: z.string().url("URL inválida").max(500, "URL muito longa"),
});

// ===========================================
// PRICING PACKAGE SCHEMA
// ===========================================
export const pricingPackageSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Nome do pacote é obrigatório").max(100),
    description: z.string().max(500).optional(),
    price: z.number().min(0, "Preço não pode ser negativo"),
    currency: z.enum(["BRL", "USD", "EUR"]).default("BRL"),
    deliverables: z.array(z.string().max(200)).max(20).optional(),
});

export const updatePricingPackagesSchema = z.object({
    slug: slugSchema,
    packages: z.array(pricingPackageSchema).max(10, "Máximo de 10 pacotes"),
});

// ===========================================
// CASE STUDY SCHEMA
// ===========================================
export const caseStudySchema = z.object({
    id: z.string().optional(),
    brandName: z.string().min(1, "Nome da marca é obrigatório").max(100),
    logoUrl: z.string().max(500).optional(),
    videoUrl: z.string().max(500).optional(),
    description: z.string().max(1000).optional(),
    metrics: z.string().max(500).optional(),
});

export const updateCaseStudiesSchema = z.object({
    slug: slugSchema,
    cases: z.array(caseStudySchema).max(20, "Máximo de 20 cases"),
});

// ===========================================
// DEMOGRAPHICS SCHEMA
// ===========================================
export const fetchDemographicsSchema = z.object({
    slug: slugSchema,
    accessToken: z.string().min(10, "Token inválido"),
});

// ===========================================
// VALIDATION HELPERS
// ===========================================
export function validateInput<T>(
    schema: z.ZodSchema<T>,
    data: unknown
): { success: true; data: T } | { success: false; error: string } {
    const result = schema.safeParse(data);
    
    if (!result.success) {
<<<<<<< HEAD
        const firstError = result.error.issues[0];
=======
        const firstError = result.error.errors[0];
>>>>>>> feature/redesign-alura-style
        return {
            success: false,
            error: firstError?.message || "Dados inválidos",
        };
    }
    
    return { success: true, data: result.data };
}

// XSS Prevention - Sanitize string for safe HTML output
export function sanitizeString(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;");
}

