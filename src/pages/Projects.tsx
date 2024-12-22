import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../hooks/useProjects';
import { useProjectSearch } from '../hooks/useProjectSearch';
import { useUserNames } from '../hooks/useUserNames';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectSubmissionForm } from '../components/ProjectSubmissionForm';
import { SearchBar } from '../components/search/SearchBar';
import { SuccessMessage } from '../components/ui/SuccessMessage';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export function Projects() {
  const { user } = useAuth();
  const { projects, loading, error } = useProjects({ 
    status: 'approved',
    limit: 50
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showSubmissionForm, setShowSubmissionForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredProjects = useProjectSearch(projects, searchTerm);
  const userNames = useUserNames(projects.map(p => p.userId));

  const handleSubmissionSuccess = () => {
    setShowSubmissionForm(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <LoadingSpinner size="large" />
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
          
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>

          {user && (
            <button
              onClick={() => setShowSubmissionForm(!showSubmissionForm)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {showSubmissionForm ? 'Cancel' : 'Submit Your Project'}
            </button>
          )}
        </motion.div>

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
            {filteredProjects.length === 0 ? (
              <div className="text-center text-gray-600">
                No projects found matching your search.
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project}
                    userName={userNames[project.userId]}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}