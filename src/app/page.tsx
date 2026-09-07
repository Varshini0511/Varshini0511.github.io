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
          eyebrow="Selected work"
          title="AI systems, built end to end"
          intro="Five systems I designed and shipped over the past year while teaching myself AI engineering — every one deployed and live, not just a repo. Each goes past the demo layer into the parts that decide whether something is production-worthy: retrieval quality, evaluation, guardrails and cost. Open any of them for the architecture and the reasoning behind it."
        >
          <Projects />
        </Section>

        <div className="border-t" />

        <Section
          id="experience"
          eyebrow="Experience"
          title={`${profile.yearsExperience} years of production engineering`}
          intro="Security-sensitive enterprise platforms — digital forensics, energy and insurance — across .NET, Angular and Azure."
        >
          <Experience />
        </Section>

        <div className="border-t" />

        <Section
          id="skills"
          eyebrow="Toolkit"
          title="What I work with"
          intro="Depth in the .NET and Azure stack, with a year of hands-on AI engineering layered on top."
        >
          <Skills />
        </Section>

        <div className="border-t" />

        <Section id="about" eyebrow="About" title="A bit of background">
          <About />
        </Section>

        <div className="border-t" />

        <Section
          id="contact"
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
