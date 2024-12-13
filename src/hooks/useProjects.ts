import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy, limit, type QueryConstraint } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Project } from '../types/project';

interface UseProjectsOptions {
  status?: 'pending' | 'approved' | 'rejected';
  userId?: string;
  limit?: number;
}

export function useProjects({ status, userId, limit: queryLimit = 50 }: UseProjectsOptions = {}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRef = collection(db, 'projects');
        const constraints: QueryConstraint[] = [];

        if (status) {
          constraints.push(where('status', '==', status));
        }

        if (userId) {
          constraints.push(where('userId', '==', userId));
        }

        // Always order by creation date, newest first
        constraints.push(orderBy('createdAt', 'desc'));
        constraints.push(limit(queryLimit));

        const q = query(projectsRef, ...constraints);
        const snapshot = await getDocs(q);
        
        const projectsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Project[];
        
        setProjects(projectsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to fetch projects');
        }
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [status, userId, queryLimit]);

  return { projects, loading, error };
}