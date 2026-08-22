import Navigation from './components/Navigation';
import Intro from './components/Intro';
import ScrollReveals from './components/ScrollReveals';
import Hero from './components/sections/Hero';
import Projects from './components/sections/Projects';
import ProfessionalExperience from './components/sections/Experiences';
import GithubActivity from './components/sections/GithubActivity';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contacts';

export default function Home() {
  return (
    <>
      <Navigation />
      <Intro />
      <main id="main-content">
        {/* Everything above the contact scene lifts away to reveal it. */}
        <div className="page-above">
          {/* The hero pins only within this wrapper, so it releases once the
              dark Work panel has fully covered it. */}
          <div>
            <Hero />
            <Projects />
          </div>
          <ProfessionalExperience />
          <Skills />
          <GithubActivity />
        </div>
        <Contact />
      </main>
      <ScrollReveals />
    </>
  );
}
