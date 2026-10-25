import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import HomeBlock from "@/components/HomeBlock";
import Bridge from "@/components/Bridge";
import SelectedWork from "@/components/SelectedWork";
import CallToAction from "@/components/CallToAction";
import Panel from "@/components/Panel";
import Section from "@/components/Section";
import CareerArc from "@/components/CareerArc";
import Experience from "@/components/Experience";
import Outcomes from "@/components/Outcomes";
import Projects from "@/components/Projects";
import Mobile from "@/components/Mobile";
import Approach from "@/components/Approach";
import TechMatrix from "@/components/TechMatrix";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const aiCount = profile.projects.filter((p) => p.kind === "ai").length;

/**
 * Each tab is a panel; the nav switches between them (see TabController and the
 * [data-panel] rules in globals.css). All panels are rendered into the HTML.
 *
 * The home tab is the whole pitch in one scroll — positioning, clients, the
 * enterprise-to-AI argument, selected work and a call to action — so a visitor
 * who never clicks a tab still sees the essentials.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main className="min-h-[72vh]">
        <Panel id="overview">
          <Hero />
          <Clients />
          <HomeBlock
            label="Why the combination matters"
            title="The habits that keep enterprise systems safe are the ones AI systems need."
            more={{ href: "/#about", text: "How I engineer" }}
          >
            <Bridge />
          </HomeBlock>
          <HomeBlock
            label="Selected AI work"
            title="Built past the demo: evaluated, guarded and costed."
            more={{ href: "/#ai", text: `All ${aiCount} AI systems` }}
          >
            <SelectedWork />
          </HomeBlock>
          <CallToAction />
        </Panel>

        <Panel id="career">
          <Section
            eyebrow="Experience"
            title="Eight years in enterprise engineering"
            intro="Digital forensics, energy and insurance: security-sensitive platforms where a wrong answer has a cost. The same fundamentals carried across .NET Framework, .NET Core and .NET 8, on-prem, AWS and Azure."
          >
            <CareerArc />
            <div className="mt-10">
              <Outcomes />
            </div>
            <div className="mt-12">
              <Experience />
            </div>
          </Section>
        </Panel>

        <Panel id="ai">
          <Section
            eyebrow="Applied AI"
            title="AI systems"
            intro={`${aiCount} systems built in 2026, alongside a full-time senior role, to take eight years of engineering into AI. Seven are live, one of them as a scheduled job; three run on my own machine because they drive real browser sessions, act as an inference gateway or work with my own accounts. Each goes past the demo into retrieval quality, evaluation, guardrails and cost.`}
          >
            <Projects />
          </Section>
          <Section
            lead={false}
            eyebrow="Also built · Mobile"
            title="One product, three runtimes"
            intro="The same problem, finding the cheapest ride in India, built three ways: Python automation, native Kotlin and cross-platform Expo. Each makes a different trade-off between what it can see, what it asks of the user and where it runs."
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

      <Footer />
    </>
  );
}
