import { z } from "zod";

// Shared between the browser form and the server route, so both enforce the same limits.
export const BRIEF_LIMITS = {
  minChars: 20,
  maxChars: 3000,
  maxPhotos: 4,
  // Photos are resized in the browser before upload; this caps one encoded photo (~1.5 MB).
  maxPhotoChars: 2_000_000,
} as const;

export const PROJECT_TYPES = ["Komple Ev", "Mutfak", "Banyo", "Salon", "Yatak Odası", "Ev Yapımı"] as const;

export const briefRequestSchema = z.object({
  description: z
    .string()
    .trim()
    .min(BRIEF_LIMITS.minChars, `Lütfen ihtiyacınızı en az ${BRIEF_LIMITS.minChars} karakterle anlatın.`)
    .max(BRIEF_LIMITS.maxChars, `Açıklama en fazla ${BRIEF_LIMITS.maxChars} karakter olabilir.`),
  projectType: z.enum(PROJECT_TYPES).nullable(),
  areaM2: z.number().int().min(1).max(5000).nullable(),
  photos: z
    .array(
      z
        .string()
        .regex(/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/, "Fotoğraf biçimi desteklenmiyor.")
        .max(BRIEF_LIMITS.maxPhotoChars, "Fotoğraflardan biri çok büyük."),
    )
    .max(BRIEF_LIMITS.maxPhotos, `En fazla ${BRIEF_LIMITS.maxPhotos} fotoğraf ekleyebilirsiniz.`),
});

export type BriefRequest = z.infer<typeof briefRequestSchema>;

// Strict-schema friendly: every field required, flat objects, no bounds (counts are asked in the prompt).
export const briefSchema = z.object({
  baslik: z.string(),
  ozet: z.string(),
  kapsam: z.string(),
  alanlar: z.array(z.object({ ad: z.string(), gozlem: z.string(), isler: z.array(z.string()) })),
  oncelikler: z.array(z.string()),
  sorular: z.array(z.object({ soru: z.string(), neden: z.string() })),
  hazirlik: z.array(z.string()),
});

export type ProjectBrief = z.infer<typeof briefSchema>;

export type BriefStreamEvent =
  | { type: "partial"; data: unknown }
  | { type: "done"; data: ProjectBrief }
  | { type: "error"; message: string };
