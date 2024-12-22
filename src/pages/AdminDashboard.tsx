import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs, doc, updateDoc, orderBy, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { FormInput } from '../components/forms/FormInput';
import { FormTextarea } from '../components/forms/FormTextarea';
import { Trash2 } from 'lucide-react';
import type { Project } from '../types/project';
import type { BlogPost } from '../types/blog';

export function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'projects' | 'blog'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (activeTab === 'projects') {
      fetchPendingProjects();
    } else if (activeTab === 'blog') {
      fetchBlogPosts();
    }
  }, [activeTab]);

  const fetchPendingProjects = async () => {
    try {
      const q = query(
        collection(db, 'projects'),
        where('status', '==', 'pending')
      );
      const snapshot = await getDocs(q);
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogPosts = async () => {
    try {
      const q = query(collection(db, 'blog_posts'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as BlogPost[];
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectStatus = async (projectId: string, status: 'approved' | 'rejected') => {
    try {
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, {
        status,
        updatedAt: Date.now()
      });
      setProjects(projects.filter(p => p.id !== projectId));
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      const excerpt = blogContent.slice(0, 150) + (blogContent.length > 150 ? '...' : '');
      
      await addDoc(collection(db, 'blog_posts'), {
        title: blogTitle,
        content: blogContent,
        excerpt,
        authorId: user.uid,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        bookmarkedBy: []
      });

      setBlogTitle('');
      setBlogContent('');
      setShowBlogEditor(false);
      fetchBlogPosts();
    } catch (error) {
      console.error('Error creating blog post:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }
    
    try {
      await deleteDoc(doc(db, 'blog_posts', postId));
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 bg-gradient-to-br from-white via-indigo-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Tabs */}
        <div className="mb-8 flex space-x-4">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'projects'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-indigo-50'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'blog'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-indigo-50'
            }`}
          >
            Blog
          </button>
        </div>

        {/* Projects Tab Content */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h1 className="text-2xl font-bold mb-8">Project Submissions</h1>

            {projects.length === 0 ? (
              <p className="text-gray-600">No pending submissions</p>
            ) : (
              <div className="space-y-6">
                {projects.map(project => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold mb-2">{project.title}</h3>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map(tag => (
                            <span key={tag} className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-4">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-700"
                          >
                            GitHub Repository
                          </a>
                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-700"
                            >
                              Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-48 h-32 object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() => project.id && handleProjectStatus(project.id, 'approved')}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => project.id && handleProjectStatus(project.id, 'rejected')}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Blog Tab Content */}
        {activeTab === 'blog' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Blog Management</h2>
              <button
                onClick={() => setShowBlogEditor(!showBlogEditor)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                {showBlogEditor ? 'Cancel' : 'New Post'}
              </button>
            </div>

            {showBlogEditor && (
              <form onSubmit={handleBlogSubmit} className="space-y-6 mb-8">
                <FormInput
                  label="Title"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  required
                />
                <FormTextarea
                  label="Content"
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  rows={10}
                  required
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
                >
                  {submitting ? 'Publishing...' : 'Publish Post'}
                </button>
              </form>
            )}

            <div className="space-y-4">
              {posts.map(post => (
                <div
                  key={post.id}
                  className="bg-gray-50 p-4 rounded-lg shadow flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => post.id && handleDeletePost(post.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}