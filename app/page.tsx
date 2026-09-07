import Navigation from './components/Navigation';
import StackMotion from './components/StackMotion';
import Hero from './components/sections/Hero';
import StackField from './components/sections/StackField';
import Projects from './components/sections/Projects';
import ProfessionalExperience from './components/sections/Experiences';
import GithubActivity from './components/sections/GithubActivity';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contacts';

/**
 * Sections flow over the fixed field (see Atmosphere in the layout). Only the
 * Work and Contact plates are opaque; everything else lets the sky through.
 * Nothing reveals on scroll: the content is simply there.
 */
export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <Hero />
        <StackField />
        <Projects />
        <ProfessionalExperience />
        <Skills />
        <GithubActivity />
        <Contact />
      </main>
      <StackMotion />
    </>
  );
}
