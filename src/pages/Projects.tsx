import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../hooks/useProjects';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectSubmissionForm } from '../components/ProjectSubmissionForm';
import { SuccessMessage } from '../components/ui/SuccessMessage';

export function Projects() {
  const { user } = useAuth();
  const { projects, loading, error } = useProjects({ 
    status: 'approved',
    limit: 50
  });
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmissionSuccess = () => {
    setShowSubmissionForm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000); // Hide success message after 5 seconds
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 bg-gradient-to-br from-white via-indigo-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Student Projects</h1>
            <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg inline-block">
              {error}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-white via-indigo-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Student Projects</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Discover innovative projects created by our talented students
          </p>
          
          {user && (
            <button
              onClick={() => setShowSubmissionForm(!showSubmissionForm)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {showSubmissionForm ? 'Cancel' : 'Submit Your Project'}
            </button>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <SuccessMessage message="Project submitted successfully! It will be reviewed by our team." />
            </motion.div>
          )}

          {showSubmissionForm ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-2xl mx-auto mb-16 bg-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6">Submit Your Project</h2>
              <ProjectSubmissionForm onSuccess={handleSubmissionSuccess} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {projects.length === 0 ? (
                <div className="text-center text-gray-600">
                  No projects available at the moment.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}