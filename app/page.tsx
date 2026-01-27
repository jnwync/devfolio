'use client';

import ProfessionalExperience from './components/sections/Experiences';
import Hero from './components/sections/Hero';
import Navigation from './components/Navigation';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contacts';

export default function Home() {
  return (
    <main id="main-content">
      <Navigation />
      <Hero />
      <ProfessionalExperience />
      <Skills />
      <Contact />
    </main>
  );
}
