import { motion } from 'framer-motion';

interface HeroButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant: 'primary' | 'secondary';
}

export function HeroButton({ children, onClick, variant }: HeroButtonProps) {
  const baseClasses = "px-8 py-4 rounded-xl font-medium shadow-lg transition-all";
  const variantClasses = {
    primary: "bg-indigo-600 text-white shadow-indigo-200 hover:shadow-xl hover:bg-indigo-700",
    secondary: "bg-white text-gray-800 hover:shadow-xl border border-gray-200"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </motion.button>
  );
}