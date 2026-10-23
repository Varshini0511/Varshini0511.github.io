import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Panel from "@/components/Panel";
import Section from "@/components/Section";
import CareerArc from "@/components/CareerArc";
import Experience from "@/components/Experience";
import CaseStudies from "@/components/CaseStudies";
import Projects from "@/components/Projects";
import Mobile from "@/components/Mobile";
import Approach from "@/components/Approach";
import TechMatrix from "@/components/TechMatrix";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { profile } from "@/data/profile";

/**
 * Each tab is a panel; the nav switches between them (see TabController and the
 * [data-panel] rules in globals.css). All panels are rendered into the HTML.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main className="min-h-[72vh]">
        <Panel id="overview">
          <Hero />
        </Panel>

        <Panel id="career">
          <Section
            eyebrow="Career"
            title="Eight years in enterprise engineering"
            intro="Digital forensics, energy and insurance: security-sensitive platforms where a wrong answer has a cost. The same fundamentals carried across .NET Framework, .NET Core and .NET 8, on-prem, AWS and Azure."
          >
            <CareerArc />
            <div className="mt-12">
              <Experience />
            </div>
          </Section>
        </Panel>

        <Panel id="systems">
          <Section
            eyebrow="Systems"
            title="Enterprise systems, in detail"
            intro="Three engagements as architecture: what was built, the decisions behind it and how it is wired. Components are limited to those my work history names."
          >
            <CaseStudies />
          </Section>
        </Panel>

        <Panel id="ai">
          <Section
            eyebrow="Applied AI"
            title="AI systems"
            intro="Eight systems built over the past year while learning AI engineering. Six are deployed and live; two run on your own machine: RideSmartAgent, which drives real logged-in browser sessions, and inferouter, an inference gateway. Each goes past the demo into retrieval quality, evaluation, guardrails and cost."
          >
            <Projects />
          </Section>
        </Panel>

        <Panel id="mobile">
          <Section
            eyebrow="Mobile"
            title="One product, three runtimes"
            intro="The same problem, finding the cheapest ride in India, built three ways. Each makes a different trade-off between what it can see, what it asks of the user and where it runs."
          >
            <Mobile />
          </Section>
        </Panel>

        <Panel id="stack">
          <Section
            eyebrow="Technology"
            title="Depth and continuity"
            intro="What carried across every role, what each stage added, and where the independent work sits."
          >
            <TechMatrix />
          </Section>
        </Panel>

        <Panel id="about">
          <Section
            eyebrow="Approach"
            title="How I engineer"
            intro="One set of habits, applied to a forensics platform and to an LLM agent alike. Each principle points at the work that shows it."
          >
            <Approach />
          </Section>
          <Section lead={false} eyebrow="About" title="Background">
            <About />
          </Section>
        </Panel>

        <Panel id="contact">
          <Section eyebrow="Contact" title="Get in touch">
            <Contact />
          </Section>
        </Panel>
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
