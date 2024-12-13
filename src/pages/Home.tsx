import { Hero } from '../components/Hero';
import { FeaturedProject } from '../components/FeaturedProject';
import { Timeline } from '../components/Timeline';
import { Testimonials } from '../components/Testimonials';

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <FeaturedProject />
      <Timeline />
      <Testimonials />
    </div>
  );
}