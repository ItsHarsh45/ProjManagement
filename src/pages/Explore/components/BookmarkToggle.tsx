import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';

interface BookmarkToggleProps {
  active: boolean;
  onChange: (active: boolean) => void;
}

export function BookmarkToggle({ active, onChange }: BookmarkToggleProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onChange(!active)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        active 
          ? 'bg-indigo-100 text-indigo-700' 
          : 'bg-white text-gray-700 hover:bg-gray-50'
      }`}
    >
      <Bookmark className={`w-5 h-5 ${active ? 'fill-current' : ''}`} />
      <span className="font-medium">Bookmarks</span>
    </motion.button>
  );
}