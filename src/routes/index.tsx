import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { CampusReveal } from "@/components/CampusReveal";
import { Countdown } from "@/components/Countdown";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Technica Avinyā — Innovate. Collaborate. Elevate." },
      {
        name: "description",
        content:
          "Technica Avinya is our annual tech fest bringing together bright minds to build, compete, and innovate with purpose and harmony.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Audiowide&family=Orbitron:wght@700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,500&family=Inter:wght@300;400;500;600&family=Tiro+Devanagari+Sanskrit&display=swap",
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <Hero />
      <CampusReveal />
      <Countdown />
    </>
  );
}
