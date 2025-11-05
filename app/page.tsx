import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import GitHubStats from "@/components/GitHubStats";
import DiscordPresence from "@/components/DiscordPresence";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <GitHubStats />
      <SectionDivider />
      <DiscordPresence />
      <SectionDivider />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
