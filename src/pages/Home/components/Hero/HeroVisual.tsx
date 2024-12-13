import { motion } from 'framer-motion';

export function HeroVisual() {
  return (
    <div className="flex-1 relative w-full max-w-2xl flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 50,
          damping: 15
        }}
        className="relative z-10 bg-blue-500/10 rounded-3xl p-6 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-2xl -z-10"></div>
        <div className="relative w-full max-w-md aspect-square overflow-hidden rounded-2xl">
          <spline-viewer
            url="https://prod.spline.design/aNTjHfupwhd5yX-w/scene.splinecode"
            className="w-full h-full"
          />
        </div>
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity -z-20"></div>
      </motion.div>
    </div>
  );
}