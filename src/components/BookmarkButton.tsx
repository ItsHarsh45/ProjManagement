import { Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookmarkButtonProps {
  isBookmarked: boolean;
  onClick: () => void;
  className?: string;
}

export function BookmarkButton({ isBookmarked, onClick, className = '' }: BookmarkButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`p-2 rounded-full transition-colors ${
        isBookmarked 
          ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100' 
          : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
      } ${className}`}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
    </motion.button>
  );
}