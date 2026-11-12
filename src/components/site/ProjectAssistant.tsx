import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Check, ClipboardList, ImagePlus, Loader2, RotateCcw, Sparkles, Square, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import {
  BRIEF_LIMITS,
  PROJECT_TYPES,
  briefRequestSchema,
  type BriefStreamEvent,
  type ProjectBrief,
} from "@/lib/project-brief";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

type PartialBrief = {
  baslik?: string;
  ozet?: string;
  kapsam?: string;
  alanlar?: Array<{ ad?: string; gozlem?: string; isler?: Array<string | undefined> } | undefined>;
  oncelikler?: Array<string | undefined>;
  sorular?: Array<{ soru?: string; neden?: string } | undefined>;
  hazirlik?: Array<string | undefined>;
};

type Photo = { id: string; dataUrl: string; name: string };
type Status = "idle" | "loading" | "done" | "error";

const MAX_SIDE = 1280;

// Shrink photos in the browser so uploads stay small and fast.
async function resizePhoto(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Fotoğraf okunamadı."));
      el.src = url;
    });
    const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Fotoğraf işlenemedi.");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.82);
  } finally {
    URL.revokeObjectURL(url);
  }
}

const clean = <T,>(list: Array<T | undefined> | undefined) => (list ?? []).filter((x): x is T => Boolean(x));

function buildWhatsAppMessage(brief: ProjectBrief, answers: Record<number, string>) {
  const lines = [
    "Merhaba, AI Proje Asistanı ile hazırladığım özeti gönderiyorum.",
    "",
    `*${brief.baslik}*`,
    brief.kapsam,
    "",
    brief.ozet,
    "",
    "*Keşif öncesi sorular*",
    ...brief.sorular.map((q, i) => `${i + 1}. ${q.soru}${answers[i]?.trim() ? `\n   → ${answers[i]!.trim()}` : ""}`),
  ];
  return lines.join("\n");
}

export function ProjectAssistant() {
  const [projectType, setProjectType] = useState<(typeof PROJECT_TYPES)[number] | null>(null);
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [brief, setBrief] = useState<PartialBrief | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const abortRef = useRef<AbortController | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const onPhotos = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    const room = BRIEF_LIMITS.maxPhotos - photos.length;
    if (files.length > room) setFormError(`En fazla ${BRIEF_LIMITS.maxPhotos} fotoğraf ekleyebilirsiniz.`);
    const accepted = files.filter((f) => f.type.startsWith("image/")).slice(0, Math.max(0, room));
    try {
      const added = await Promise.all(
        accepted.map(async (f) => ({ id: `${f.name}-${f.size}-${Math.random()}`, name: f.name, dataUrl: await resizePhoto(f) })),
      );
      setPhotos((p) => [...p, ...added].slice(0, BRIEF_LIMITS.maxPhotos));
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Fotoğraf eklenemedi.");
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      description,
      projectType,
      areaM2: area.trim() ? Math.round(Number(area)) || null : null,
      photos: photos.map((p) => p.dataUrl),
    };
    const parsed = briefRequestSchema.safeParse(payload);
    if (!parsed.success) {
      setFormError(parsed.error.issues[0]?.message ?? "Lütfen formu kontrol edin.");
      return;
    }
    setFormError("");
    setErrorMessage("");
    setAnswers({});
    setBrief(null);
    setStatus("loading");
    requestAnimationFrame(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch("/api/proje-ozeti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Asistana ulaşılamadı. Lütfen tekrar deneyin.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let finished = false;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const event = JSON.parse(line) as BriefStreamEvent;
          if (event.type === "partial") setBrief(event.data as PartialBrief);
          if (event.type === "done") {
            setBrief(event.data);
            setStatus("done");
            finished = true;
          }
          if (event.type === "error") throw new Error(event.message);
        }
      }
      if (!finished) throw new Error("Bağlantı yarıda kesildi. Lütfen tekrar deneyin.");
    } catch (err) {
      if (controller.signal.aborted) {
        setStatus((s) => (s === "loading" ? "idle" : s));
        return;
      }
      setErrorMessage(err instanceof Error ? err.message : "Beklenmeyen bir hata oluştu.");
      setStatus("error");
    } finally {
      abortRef.current = null;
    }
  };

  const stop = () => abortRef.current?.abort();
  const reset = () => {
    stop();
    setStatus("idle");
    setBrief(null);
    setErrorMessage("");
    setAnswers({});
  };

  const alanlar = clean(brief?.alanlar);
  const sorular = clean(brief?.sorular);
  const oncelikler = clean(brief?.oncelikler);
  const hazirlik = clean(brief?.hazirlik);
  const loading = status === "loading";

  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 lg:grid-cols-[1fr_1.15fr] lg:items-start">
      <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-border bg-card p-6 shadow-lift md:p-10 lg:sticky lg:top-28">
        <h2 className="text-3xl font-medium">İhtiyacınızı anlatın</h2>
        <p className="mt-2 text-sm text-muted-foreground">Ne kadar detay verirseniz özet o kadar size özel olur.</p>

        <div className="mt-8 space-y-2">
          <Label>Proje türü (isteğe bağlı)</Label>
          <div className="flex flex-wrap gap-2">
            {PROJECT_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setProjectType((cur) => (cur === t ? null : t))}
                aria-pressed={projectType === t}
                className={cn(
                  "rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-300",
                  projectType === t ? "border-gold bg-secondary shadow-gold" : "border-border hover:border-gold/60",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Label htmlFor="desc">Neyi değiştirmek istiyorsunuz?</Label>
          <Textarea
            id="desc"
            rows={7}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={BRIEF_LIMITS.maxChars}
            placeholder="Örn. 15 yıllık mutfağımızı tamamen yenilemek istiyoruz. Dolaplar şişti, tezgâh az geliyor. Açık mutfak olsun, ada tezgâh istiyoruz. İki çocuğumuz var, kolay temizlenen malzeme önemli…"
            className="rounded-xl"
          />
          <p className="text-right text-xs text-muted-foreground">
            {description.length} / {BRIEF_LIMITS.maxChars}
          </p>
        </div>

        <div className="mt-2 space-y-2">
          <Label htmlFor="area">Yaklaşık alan (m², isteğe bağlı)</Label>
          <Input id="area" inputMode="numeric" value={area} onChange={(e) => setArea(e.target.value.replace(/\D/g, "").slice(0, 4))} className="h-12 max-w-40 rounded-xl" />
        </div>

        <div className="mt-6 space-y-2">
          <Label>Oda fotoğrafları (en fazla {BRIEF_LIMITS.maxPhotos})</Label>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {photos.map((p) => (
              <div key={p.id} className="group relative aspect-square overflow-hidden rounded-xl border border-border">
                <img src={p.dataUrl} alt={p.name} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPhotos((list) => list.filter((x) => x.id !== p.id))}
                  aria-label={`${p.name} fotoğrafını kaldır`}
                  className="absolute top-1.5 right-1.5 grid size-7 place-items-center rounded-full bg-ink/80 text-ink-foreground transition hover:bg-ink"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
            {photos.length < BRIEF_LIMITS.maxPhotos && (
              <label className="grid aspect-square cursor-pointer place-items-center rounded-xl border border-dashed border-border text-muted-foreground transition hover:border-gold hover:text-gold-deep">
                <span className="flex flex-col items-center gap-1.5 text-xs font-medium">
                  <ImagePlus className="size-6" /> Fotoğraf ekle
                </span>
                <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={onPhotos} className="sr-only" aria-label="Oda fotoğrafı ekle" />
              </label>
            )}
          </div>
        </div>

        {formError && <p className="mt-4 text-sm text-destructive" role="alert">{formError}</p>}

        <div className="mt-8 flex flex-wrap gap-3">
          {loading ? (
            <Button type="button" variant="ink" size="xl" onClick={stop}>
              <Square /> Durdur
            </Button>
          ) : (
            <Button type="submit" variant="gold" size="xl">
              <Sparkles /> Proje Özetimi Oluştur
            </Button>
          )}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Özet yapay zekâ ile hazırlanır ve ön bilgi amaçlıdır; kesin kapsam ve fiyat ücretsiz keşifte netleşir. Fotoğraflarınız kaydedilmez.
        </p>
      </form>

      <div ref={resultRef} className="scroll-mt-28" aria-live="polite">
        {status === "idle" && !brief && (
          <div className="rounded-3xl border border-dashed border-border bg-secondary/40 p-10 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-ink text-gold">
              <ClipboardList className="size-6" />
            </span>
            <p className="mt-5 font-display text-2xl">Özetiniz burada görünecek</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Projenizin kısa özeti, alan alan yapılacak işler ve keşif öncesi size soracağımız sorular.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-3xl border border-destructive/40 bg-card p-8 shadow-soft" role="alert">
            <p className="font-display text-2xl">Özet hazırlanamadı</p>
            <p className="mt-2 text-sm text-muted-foreground">{errorMessage}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="soft" onClick={reset}>
                <RotateCcw /> Tekrar dene
              </Button>
              <Button asChild variant="whatsapp">
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon /> WhatsApp ile yazın
                </a>
              </Button>
            </div>
          </div>
        )}

        {(loading || status === "done") && (
          <article className="overflow-hidden rounded-3xl border border-border bg-card shadow-lift">
            <header className="bg-ink px-6 py-8 text-ink-foreground md:px-10">
              <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-gold uppercase">
                {loading ? <Loader2 className="size-3.5 animate-spin" /> : <Check className="size-3.5" />}
                {loading ? "Hazırlanıyor" : "Proje özetiniz"}
              </p>
              {brief?.baslik ? (
                <h3 className="mt-3 text-3xl leading-tight font-medium md:text-4xl">{brief.baslik}</h3>
              ) : (
                <div className="mt-4 h-9 w-2/3 animate-pulse rounded-lg bg-ink-foreground/10" />
              )}
              {brief?.kapsam && <p className="mt-3 inline-block rounded-lg bg-gold/15 px-3 py-1 text-sm text-gold">{brief.kapsam}</p>}
            </header>

            <div className="space-y-10 px-6 py-8 md:px-10">
              {brief?.ozet ? (
                <p className="text-base leading-relaxed">{brief.ozet}</p>
              ) : (
                <div className="space-y-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="h-4 animate-pulse rounded bg-muted" style={{ width: `${90 - i * 15}%` }} />
                  ))}
                </div>
              )}

              {oncelikler.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Sizin için önemli olanlar</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {oncelikler.map((o, i) => (
                      <span key={i} className="rounded-xl border border-gold/50 bg-secondary px-3 py-1.5 text-sm">{o}</span>
                    ))}
                  </div>
                </div>
              )}

              {alanlar.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Alan alan yapılacaklar</h4>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {alanlar.map((a, i) => (
                      <div key={i} className="rounded-2xl border border-border bg-background p-5">
                        <p className="font-display text-xl">{a.ad}</p>
                        {a.gozlem && <p className="mt-1 text-sm text-muted-foreground">{a.gozlem}</p>}
                        <ul className="mt-3 space-y-1.5">
                          {clean(a.isler).map((x, k) => (
                            <li key={k} className="flex gap-2 text-sm">
                              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                              {x}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {sorular.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Keşif öncesi sorular</h4>
                  <p className="mt-1 text-sm text-muted-foreground">Bildiklerinizi şimdiden yazabilirsiniz; keşif çok daha verimli geçer.</p>
                  <ol className="mt-4 space-y-4">
                    {sorular.map((q, i) => (
                      <li key={i} className="rounded-2xl border border-border p-4">
                        <div className="flex gap-3">
                          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-ink font-display text-sm text-gold">{i + 1}</span>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold">{q.soru}</p>
                            {q.neden && <p className="mt-0.5 text-xs text-muted-foreground">{q.neden}</p>}
                            {status === "done" && (
                              <Input
                                value={answers[i] ?? ""}
                                onChange={(e) => setAnswers((a) => ({ ...a, [i]: e.target.value }))}
                                maxLength={300}
                                placeholder="Cevabınız (isteğe bağlı)"
                                aria-label={`${i + 1}. sorunun cevabı`}
                                className="mt-3 h-10 rounded-xl"
                              />
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {hazirlik.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Keşif gününe hazırlık</h4>
                  <ul className="mt-3 space-y-2">
                    {hazirlik.map((h, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-gold-deep" /> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {status === "done" && brief && (
                <div className="flex flex-wrap gap-3 border-t border-border pt-8">
                  <Button asChild variant="whatsapp" size="lg">
                    <a href={whatsappLink(buildWhatsAppMessage(brief as ProjectBrief, answers))} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon /> Özeti WhatsApp ile Gönder
                    </a>
                  </Button>
                  <Button variant="soft" size="lg" onClick={reset}>
                    <RotateCcw /> Yeni özet
                  </Button>
                </div>
              )}
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
