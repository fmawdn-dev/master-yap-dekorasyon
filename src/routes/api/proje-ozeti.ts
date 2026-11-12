import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/proje-ozeti")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleProjectBrief } = await import("@/lib/ai/project-brief.server");
        return handleProjectBrief(request);
      },
    },
  },
});
