import { HeroContent } from './HeroContent';
import { HeroVisual } from './HeroVisual';

export function Hero() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-indigo-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <HeroContent />
          <HeroVisual />
        </div>
      </div>

      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[600px] bg-indigo-50/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[400px] bg-purple-50/50 rounded-full blur-3xl"></div>
    </div>
  );
}