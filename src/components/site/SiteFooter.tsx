import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <p className="font-display text-3xl font-medium">Master Yapı Dekorasyon</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-foreground/65">
            Anahtar teslim ev yapımı, tadilat, iç mimari ve dekorasyon. Keşiften teslimata kadar tek muhatap,
            tek sorumluluk.
          </p>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-gold uppercase">Sayfalar</p>
          <ul className="space-y-2.5 text-sm text-ink-foreground/75">
            <li><Link to="/hizmetler" className="hover:text-gold">Hizmetler</Link></li>
            <li><Link to="/projeler" className="hover:text-gold">Projeler</Link></li>
            <li><Link to="/maliyet-hesaplama" className="hover:text-gold">Maliyet Hesaplama</Link></li>
            <li><Link to="/iletisim" className="hover:text-gold">İletişim</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-gold uppercase">İletişim</p>
          <ul className="space-y-3 text-sm text-ink-foreground/75">
            <li className="flex gap-2.5"><Phone className="mt-0.5 size-4 shrink-0 text-gold" /><a href={SITE.phoneHref}>{SITE.phoneDisplay}</a></li>
            <li className="flex gap-2.5"><Mail className="mt-0.5 size-4 shrink-0 text-gold" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li className="flex gap-2.5"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" />{SITE.address}</li>
            <li className="flex gap-2.5"><Clock className="mt-0.5 size-4 shrink-0 text-gold" />{SITE.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-ink-foreground/50 md:px-8">
          © {new Date().getFullYear()} Master Yapı Dekorasyon. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
