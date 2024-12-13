import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
}

export function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3"
    >
      <CheckCircle className="w-5 h-5 text-green-500" />
      <p className="text-green-700">{message}</p>
    </motion.div>
  );
}