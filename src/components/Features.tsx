import { motion } from 'framer-motion';
import { BookOpen, Users, Award, Rocket, Code, Star } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Project Showcase',
    description: 'Share your academic projects with a global audience. Get recognition for your innovative work and build your portfolio.'
  },
  {
    icon: Users,
    title: 'Community Collaboration',
    description: 'Connect with fellow students, share ideas, and collaborate on exciting projects. Learn from peers and grow together.'
  },
  {
    icon: Award,
    title: 'Quality Standards',
    description: 'All projects undergo thorough review to ensure high quality. Get constructive feedback to improve your work.'
  },
  {
    icon: Rocket,
    title: 'Career Growth',
    description: 'Build a strong portfolio that showcases your skills to potential employers. Take your career to new heights.'
  },
  {
    icon: Code,
    title: 'Technical Excellence',
    description: 'Focus on cutting-edge technologies and best practices. Stay ahead with modern development approaches.'
  },
  {
    icon: Star,
    title: 'Recognition',
    description: 'Outstanding projects get featured on our platform. Earn badges and certificates for your achievements.'
  }
];

export function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose GeekPeak?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform offers everything you need to showcase your projects, grow your skills,
            and advance your career in technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}