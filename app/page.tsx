import Navigation from './components/Navigation';
import Intro from './components/Intro';
import MotionRoot from './components/motion/MotionRoot';
import StackMotion from './components/StackMotion';
import Hero from './components/sections/Hero';
import StackField from './components/sections/StackField';
import Projects from './components/sections/Projects';
import ProfessionalExperience from './components/sections/Experiences';
import GithubActivity from './components/sections/GithubActivity';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contacts';

/**
 * One continuous world (see WorldRoot in the layout): sections flow over
 * the same horizon and the day passes as you scroll. The intro comes first
 * in the DOM so its skip control is the first thing a keyboard reaches.
 */
export default function Home() {
  return (
    <>
      <Intro />
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
      <MotionRoot />
    </>
  );
}
