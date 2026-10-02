import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CareerArc from "@/components/CareerArc";
import Experience from "@/components/Experience";
import CaseStudies from "@/components/CaseStudies";
import Projects from "@/components/Projects";
import Approach from "@/components/Approach";
import TechMatrix from "@/components/TechMatrix";
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
          id="career"
          index="01"
          eyebrow="Career"
          title="Eight years across three enterprise domains"
          intro="Digital forensics, energy and insurance — security-sensitive platforms where a wrong answer has a cost. The same fundamentals carried across .NET Framework, .NET Core and .NET 8, on-prem, AWS and Azure."
        >
          <CareerArc />
          <div className="mt-12">
            <Experience />
          </div>
        </Section>

        <Section
          id="systems"
          index="02"
          eyebrow="Systems"
          title="Enterprise systems, in detail"
          intro="Three pieces of work told as architecture: what was built, the decisions behind it, and how it is wired. Components are limited to what is in my work history."
        >
          <CaseStudies />
        </Section>

        <Section
          id="ai"
          index="03"
          eyebrow="Applied AI"
          title="AI systems, built end to end"
          intro="Seven systems I designed and built over the past year while teaching myself AI engineering — six deployed and live, and one (RideSmartAgent) that runs locally because it drives real logged-in browser sessions. Each goes past the demo into what makes something production-worthy: retrieval quality, evaluation, guardrails and cost."
        >
          <Projects />
        </Section>

        <Section
          id="approach"
          index="04"
          eyebrow="Approach"
          title="How I engineer"
          intro="One set of habits, applied to a forensics platform and to an LLM agent alike. Each principle below points at the work that shows it."
        >
          <Approach />
        </Section>

        <Section
          id="stack"
          index="05"
          eyebrow="Technology"
          title="Depth and continuity"
          intro="What carried across every role, what each stage added, and where the AI work sits. A technology appears against a role only where it is in that role's stack."
        >
          <TechMatrix />
        </Section>

        <Section id="about" index="06" eyebrow="About" title="Background">
          <About />
        </Section>

        <Section id="contact" index="07" eyebrow="Contact" title="Let's talk">
          <Contact />
        </Section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-[var(--faint)] sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-mono">Next.js · TypeScript · Tailwind</p>
        </div>
      </footer>
    </>
  );
}
