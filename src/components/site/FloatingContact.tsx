import { Link } from "@tanstack/react-router";
import { Calculator } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function FloatingContact() {
  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      <Link
        to="/maliyet-hesaplama"
        className="group flex items-center gap-2 rounded-full border border-border bg-card/95 py-2.5 pr-4 pl-3 text-sm font-semibold text-foreground shadow-lift backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-gold"
      >
        <span className="grid size-7 place-items-center rounded-full bg-gradient-gold text-gold-foreground">
          <Calculator className="size-4" />
        </span>
        Hızlı Teklif
      </Link>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Destek"
        className="group relative flex items-center gap-2 rounded-full bg-whatsapp py-3 pr-5 pl-3.5 text-sm font-semibold text-whatsapp-foreground shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-whatsapp animate-pulse-ring" />
        <WhatsAppIcon className="relative size-6" />
        <span className="relative">WhatsApp Destek</span>
      </a>
    </div>
  );
}
