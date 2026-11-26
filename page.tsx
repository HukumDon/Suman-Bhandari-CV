import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { About } from "@/components/sections/about";
import { Awards } from "@/components/sections/awards";
import { Contact } from "@/components/sections/contact";
import { EducationSection } from "@/components/sections/education";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <EducationSection />
        <Awards />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
