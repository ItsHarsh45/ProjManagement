import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Timeline } from '../components/Timeline';
import { Testimonials } from '../components/Testimonials';

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Timeline />
      <Testimonials />
    </div>
  );
}