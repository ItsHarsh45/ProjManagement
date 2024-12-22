import { useState, useEffect } from 'react';
import type { Project } from '../types/project';

export function useProjectSearch(projects: Project[], searchTerm: string) {
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProjects(projects);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const filtered = projects.filter(project => {
      const titleMatch = project.title.toLowerCase().includes(searchTermLower);
      const tagsMatch = project.tags.some(tag => 
        tag.toLowerCase().includes(searchTermLower)
      );
      return titleMatch || tagsMatch;
    });

    setFilteredProjects(filtered);
  }, [projects, searchTerm]);

  return filteredProjects;
}