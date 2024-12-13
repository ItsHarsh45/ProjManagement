import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HeroButton } from './HeroButton';

export function HeroContent() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex-1 relative z-20 text-center lg:text-left"
    >
      <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
        Discover Our University's{' '}
        <span className="text-indigo-600">Outstanding Projects</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Explore the innovative projects that showcase the creativity and talent of our students.
        Join us on a journey through excellence and inspiration.
      </p>
      <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
        <HeroButton
          onClick={() => navigate('/projects')}
          variant="primary"
        >
          Explore Projects
        </HeroButton>
        <HeroButton
          onClick={() => navigate('/about')}
          variant="secondary"
        >
          Learn More
        </HeroButton>
      </div>
    </motion.div>
  );
}