import { Github, ExternalLink } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectActionsProps {
  project: Project;
}

export function ProjectActions({ project }: ProjectActionsProps) {
  return (
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
  );
}