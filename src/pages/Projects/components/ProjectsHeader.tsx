import { motion } from 'framer-motion';
import type { User } from 'firebase/auth';

interface ProjectsHeaderProps {
  user: User | null;
  showSubmissionForm: boolean;
  onToggleSubmissionForm: () => void;
}

export function ProjectsHeader({ user, showSubmissionForm, onToggleSubmissionForm }: ProjectsHeaderProps) {
  return (
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
          onClick={onToggleSubmissionForm}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          {showSubmissionForm ? 'Cancel' : 'Submit Your Project'}
        </button>
      )}
    </motion.div>
  );
}