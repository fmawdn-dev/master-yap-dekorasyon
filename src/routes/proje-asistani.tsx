import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ProjectAssistant } from "@/components/site/ProjectAssistant";
import { IMAGES } from "@/lib/projects";

export const Route = createFileRoute("/proje-asistani")({
  head: () => ({
    meta: [
      { title: "AI Proje Asistanı | Master Yapı Dekorasyon" },
      {
        name: "description",
        content: "Tadilat ihtiyacınızı anlatın, oda fotoğraflarınızı ekleyin; size özel proje özeti ve keşif öncesi soru listesi saniyeler içinde hazır.",
      },
      { property: "og:title", content: "AI Proje Asistanı | Master Yapı Dekorasyon" },
      { property: "og:description", content: "Kişiye özel tadilat proje özeti ve keşif öncesi soru listesi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssistantPage,
});

function AssistantPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Proje Asistanı"
        title={<>Anlatın, <em className="text-gold">projenizi</em> birlikte netleştirelim</>}
        text="İhtiyacınızı kendi cümlelerinizle yazın, oda fotoğraflarınızı ekleyin. Yapay zekâ destekli asistanımız size özel bir proje özeti ve keşif öncesi soru listesi hazırlasın."
        image={IMAGES.bedroom}
      />
      <ProjectAssistant />
    </>
  );
}
