import { motion } from 'framer-motion';
import { BookmarkButton } from '../../../components/BookmarkButton';
import type { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onReadMore: (post: BlogPost) => void;
}

export function BlogCard({ 
  post, 
  isBookmarked, 
  onToggleBookmark,
  onReadMore 
}: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
          </div>
          <BookmarkButton
            isBookmarked={isBookmarked}
            onClick={onToggleBookmark}
            className="ml-4"
          />
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <button 
            className="text-indigo-600 hover:text-indigo-700 font-medium"
            onClick={() => onReadMore(post)}
          >
            Read more
          </button>
        </div>
      </div>
    </motion.article>
  );
}