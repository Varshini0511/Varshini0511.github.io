import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />

        <Section
          id="work"
          index="01"
          eyebrow="Selected work"
          title="AI systems, built end to end"
          intro="Six systems I designed and built over the past year while teaching myself AI engineering — five deployed and live, and one (RideSmartAgent) that runs locally because it drives real logged-in browser sessions. Each goes past the demo layer into the parts that decide whether something is production-worthy: retrieval quality, evaluation, guardrails and cost. Open any of them for the architecture and the reasoning behind it."
        >
          <Projects />
        </Section>

        <div className="border-t" />

        <Section
          id="experience"
          index="02"
          eyebrow="Experience"
          title={`${profile.yearsExperience} years of production engineering`}
          intro="Security-sensitive enterprise platforms — digital forensics, energy and insurance — across .NET, Angular and Azure."
        >
          <Experience />
        </Section>

        <div className="border-t" />

        <Section
          id="skills"
          index="03"
          eyebrow="Toolkit"
          title="What I work with"
          intro="Depth in the .NET and Azure stack, with a year of hands-on AI engineering layered on top."
        >
          <Skills />
        </Section>

        <div className="border-t" />

        <Section id="about" index="04" eyebrow="About" title="A bit of background">
          <About />
        </Section>

        <div className="border-t" />

        <Section
          id="contact"
          index="05"
          eyebrow="Contact"
          title="Let's talk"
          intro="I'm open to Full-Stack and AI Engineering roles. The fastest way to reach me is email or LinkedIn."
        >
          <Contact />
        </Section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-[var(--faint)] sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-mono">Built with Next.js, TypeScript &amp; Tailwind</p>
        </div>
      </footer>
    </>
  );
}
