import { motion } from 'framer-motion';
import { Github, ExternalLink, User } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';
import type { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { profile } = useUserProfile(project.userId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="aspect-video">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {profile?.displayName || 'Loading...'}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"
          >
            <Github className="w-5 h-5" />
            <span>Source</span>
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}