import { motion } from 'framer-motion';
import { milestones } from '../data/milestones';

export function Timeline() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold mb-16 text-center text-gray-900"
        >
          Our <span className="text-blue-600">Journey</span>
        </motion.h2>
        <div className="relative">
          {/* Vertical line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute left-1/2 transform -translate-x-1/2 h-full border-2 border-gray-200 hidden md:block"
          ></motion.div>
          
          <div className="space-y-16">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="grid md:grid-cols-2 gap-8 items-center relative"
              >
                {/* Milestone dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
                  viewport={{ once: true }}
                  className="absolute left-1/2 transform -translate-x-1/2 hidden md:block"
                >
                  <div className="w-6 h-6 bg-blue-500 rounded-full border-4 border-gray-100 absolute -left-3 top-1/2 -mt-3"></div>
                </motion.div>
                
                <div
                  className={`
                    ${index % 2 === 0 ? 'md:order-1 md:text-right md:pr-8' : 'md:order-2 md:text-left md:pl-8'}
                    z-10
                  `}
                >
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-video rounded-xl overflow-hidden shadow-2xl"
                  >
                    <img
                      src={milestone.imageUrl}
                      alt={milestone.title}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                </div>
                
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    ${index % 2 === 0 ? 'md:order-2 md:pl-8' : 'md:order-1 md:pr-8'}
                    bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300
                  `}
                >
                  <div className="space-y-4">
                    <motion.span 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="text-blue-600 font-bold text-lg tracking-wide"
                    >
                      {milestone.year}
                    </motion.span>
                    <motion.h3 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="text-2xl font-bold text-gray-900"
                    >
                      {milestone.title}
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      viewport={{ once: true }}
                      className="text-gray-600 leading-relaxed"
                    >
                      {milestone.description}
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Timeline;