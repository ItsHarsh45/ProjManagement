import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

export function FeaturedProject() {
  return (
    <section id="projects" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl font-bold mb-6">Featured Project</h2>
            <h3 className="text-2xl font-semibold mb-4">AI-Powered Study Assistant</h3>
            <p className="text-gray-600 mb-6">
              An innovative AI application that helps students optimize their study habits
              through personalized recommendations and real-time feedback.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600"
              >
                <Github className="w-5 h-5" />
                <span>View Source</span>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Live Demo</span>
              </a>
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80"
              alt="AI Study Assistant Interface"
              className="object-cover w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}