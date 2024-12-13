import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-indigo-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
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
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/projects')}
                className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium shadow-lg shadow-indigo-200 hover:shadow-xl hover:bg-indigo-700 transition-all"
              >
                Explore Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/about')}
                className="bg-white text-gray-800 px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all border border-gray-200"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          <div className="flex-1 relative w-full max-w-2xl flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 50,
                damping: 15
              }}
              className="relative z-10 bg-blue-500/10 rounded-3xl p-6 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-2xl -z-10"></div>
              <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-2xl">
                <spline-viewer
                  url="https://prod.spline.design/aNTjHfupwhd5yX-w/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity -z-20"></div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 -z-10 w-[800px] h-[600px] bg-indigo-50/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[400px] bg-purple-50/50 rounded-full blur-3xl"></div>
    </div>
  );
}