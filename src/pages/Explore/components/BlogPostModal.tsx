import { Modal } from '../../../components/Modal';
import { X } from 'lucide-react';
import type { BlogPost } from '../types';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export function BlogPostModal({ post, onClose }: BlogPostModalProps) {
  if (!post) return null;

  return (
    <Modal isOpen={!!post} onClose={onClose}>
      <div className="relative p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
        
        <h2 className="text-2xl font-bold mb-4 pr-12">{post.title}</h2>
        <div className="prose max-w-none">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-600 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-6 text-sm text-gray-500">
          Posted on {new Date(post.createdAt).toLocaleDateString()}
        </div>
      </div>
    </Modal>
  );
}