import { useEffect, useState } from 'react';
import { milestones } from '../data/milestones';

export function Timeline() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);
  
  // Simple device detection - runs once on mount
  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);
    
    // Mobile devices load immediately
    if (mobile) {
      setIsLoaded(true);
      setVisibleItems(milestones.map((_, i) => i));
    } else {
      // For desktop, use very basic intersection observer
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setIsLoaded(true);
          window.removeEventListener('scroll', handleScroll);
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);
  
  // For desktop, incrementally reveal items as they scroll into view
  useEffect(() => {
    if (!isLoaded || isMobile) return;
    
    // Use a very simple, lightweight visibility checker
    const handleVisibility = () => {
      const newVisible = [];
      
      document.querySelectorAll('.milestone-item').forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          newVisible.push(index);
        }
      });
      
      if (newVisible.length > 0) {
        setVisibleItems(prev => [...new Set([...prev, ...newVisible])]);
      }
    };
    
    window.addEventListener('scroll', handleVisibility);
    handleVisibility(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleVisibility);
  }, [isLoaded, isMobile]);
  
  // Render simple placeholder for desktop until scrolled
  if (!isLoaded && !isMobile) {
    return (
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-16 text-center text-gray-900">
            Our Journey
          </h2>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500">Scroll to view our timeline...</p>
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-16 text-center text-gray-900">
          Our Journey
        </h2>
        <div className="relative">
          {/* Simple static line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-2 border-gray-200 hidden md:block"></div>
          
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`
                  milestone-item grid md:grid-cols-2 gap-8 items-center relative 
                  ${!isMobile && !visibleItems.includes(index) ? 'opacity-0' : 'opacity-100'}
                  transition-opacity duration-500
                `}
              >
                {/* Simple static dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
                  <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-gray-100 absolute -left-3 top-1/2 -mt-3"></div>
                </div>
                
                <div
                  className={`
                    ${index % 2 === 0 ? 'md:order-1 md:text-right md:pr-8' : 'md:order-2 md:text-left md:pl-8'}
                    z-10
                  `}
                >
                  {/* No animation on image container */}
                  <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={milestone.imageUrl}
                      alt={milestone.title}
                      className="object-cover w-full h-full"
                      loading={isMobile ? "eager" : "lazy"}
                      // Add width and height to improve CLS
                      width="480"
                      height="270"
                    />
                  </div>
                </div>
                
                <div
                  className={`
                    ${index % 2 === 0 ? 'md:order-2 md:pl-8' : 'md:order-1 md:pr-8'}
                    bg-white rounded-lg shadow p-6 border-l-4 border-blue-500
                    ${visibleItems.includes(index) ? 'animate-fadeIn' : ''}
                  `}
                >
                  <div className="space-y-4">
                    <span className="text-blue-600 font-bold text-lg">
                      {milestone.year}
                    </span>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;