import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { BlogCard } from './BlogCard';
import { BlogPostModal } from './BlogPostModal';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
import { useLocalBookmarks } from '../../../hooks/useLocalBookmarks';
import type { BlogPost } from '../types';

interface BlogListProps {
  searchTerm: string;
  showBookmarked: boolean;
}

export function BlogList({ searchTerm, showBookmarked }: BlogListProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const { bookmarkedIds, toggleBookmark, isBookmarked } = useLocalBookmarks();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, 'blog_posts');
        const q = query(postsRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const fetchedPosts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];

        // Filter posts based on search and bookmarks
        let filteredPosts = fetchedPosts;
        
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filteredPosts = filteredPosts.filter(post => 
            post.title.toLowerCase().includes(term) ||
            post.excerpt.toLowerCase().includes(term)
          );
        }

        if (showBookmarked) {
          filteredPosts = filteredPosts.filter(post => 
            post.id && bookmarkedIds.includes(post.id)
          );
        }

        setPosts(filteredPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchTerm, showBookmarked, bookmarkedIds]);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        {showBookmarked 
          ? "You haven't bookmarked any articles yet"
          : "No articles found"}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {posts.map(post => (
          <BlogCard
            key={post.id}
            post={post}
            isBookmarked={post.id ? isBookmarked(post.id) : false}
            onToggleBookmark={() => post.id && toggleBookmark(post.id)}
            onReadMore={setSelectedPost}
          />
        ))}
      </div>

      <BlogPostModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </>
  );
}