import { motion, AnimatePresence } from 'framer-motion';
import { ProjectSubmissionForm } from '../../../components/ProjectSubmissionForm';
import { SuccessMessage } from '../../../components/ui/SuccessMessage';

interface ProjectSubmissionSectionProps {
  show: boolean;
  showSuccess: boolean;
  onSuccess: () => void;
}

export function ProjectSubmissionSection({ 
  show, 
  showSuccess, 
  onSuccess 
}: ProjectSubmissionSectionProps) {
  return (
    <AnimatePresence mode="wait">
      {showSuccess && (
        <motion.div
          key="success-message"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <SuccessMessage message="Project submitted successfully! It will be reviewed by our team." />
        </motion.div>
      )}

      {show && (
        <motion.div
          key="submission-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="max-w-2xl mx-auto mb-16 bg-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6">Submit Your Project</h2>
          <ProjectSubmissionForm onSuccess={onSuccess} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}