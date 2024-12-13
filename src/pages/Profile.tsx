import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { ProfileHeader } from '../components/ProfileHeader';
import type { Project } from '../types/project';

export function Profile() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProjects = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, 'projects'),
          where('userId', '==', user.uid)
        );
        const snapshot = await getDocs(q);
        const projectsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Project[];
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProjects();
  }, [user]);

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-white via-indigo-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <ProfileHeader user={user} />

          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">My Projects</h2>
              {loading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : projects.length > 0 ? (
                <div className="space-y-4">
                  {projects.map(project => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 rounded-lg p-6"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold mb-2">{project.title}</h3>
                          <p className="text-gray-600 mb-4">{project.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                              <span key={tag} className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                          project.status === 'approved' ? 'bg-green-100 text-green-800' :
                          project.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No projects submitted yet</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}