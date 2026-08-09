import Navigation from './components/Navigation';
import Hero from './components/sections/Hero';
import EvidenceBand from './components/sections/EvidenceBand';
import Projects from './components/sections/Projects';
import ProfessionalExperience from './components/sections/Experiences';
import GithubActivity from './components/sections/GithubActivity';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Contact from './components/sections/Contacts';

export default function Home() {
  return (
    <main id="main-content">
      <Navigation />
      <Hero />
      <EvidenceBand />
      <Projects />
      <ProfessionalExperience />
      <GithubActivity />
      <Skills />
      <Education />
      <Contact />
    </main>
  );
}
