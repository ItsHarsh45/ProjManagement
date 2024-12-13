import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useProjects } from '../../hooks/useProjects';
import { ProjectsHeader } from './components/ProjectsHeader';
import { ProjectsList } from './components/ProjectsList';
import { ProjectSubmissionSection } from './components/ProjectSubmissionSection';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ErrorMessage } from '../../components/ui/ErrorMessage';

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
            <ErrorMessage message={error} className="inline-block" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-white via-indigo-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectsHeader 
          user={user}
          showSubmissionForm={showSubmissionForm}
          onToggleSubmissionForm={() => setShowSubmissionForm(!showSubmissionForm)}
        />

        <ProjectSubmissionSection
          show={showSubmissionForm}
          showSuccess={showSuccess}
          onSuccess={handleSubmissionSuccess}
        />

        {!showSubmissionForm && <ProjectsList projects={projects} />}
      </div>
    </div>
  );
}