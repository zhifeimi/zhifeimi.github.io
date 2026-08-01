import { Nav } from '@/components/Nav';
import { Hero } from '@/sections/Hero';
import { Projects } from '@/sections/Projects';
import { Skills } from '@/sections/Skills';
import { Journey } from '@/sections/Journey';
import { Certifications } from '@/sections/Certifications';
import { Education } from '@/sections/Education';
import { Contact } from '@/sections/Contact';
import { useReveal } from '@/hooks/useReveal';
import { useI18n } from '@/i18n';

export default function App() {
  const { lang } = useI18n();
  const ref = useReveal<HTMLDivElement>(lang);

  return (
    <div ref={ref} className="min-h-screen bg-ink text-text">
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Journey />
        <Certifications />
        <Education />
        <Contact />
      </main>
    </div>
  );
}
