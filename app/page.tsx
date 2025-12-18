'use client';

import FeaturedProjects from './components/sections/FeaturedProjects';
import Hero from './components/sections/Hero';
import Navigation from './components/Navigation';

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <FeaturedProjects />
    </main>
  );
}
