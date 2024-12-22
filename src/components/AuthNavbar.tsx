import { Link } from 'react-router-dom';
import { Code2, User as UserIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../hooks/useAdmin';
import { auth } from '../lib/firebase';

export function AuthNavbar() {
  const { user } = useAuth();
  const { isAdmin } = useAdmin(user);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // If user is admin, only show the admin dashboard link
  if (isAdmin) {
    return (
      <nav className="fixed top-4 left-4 right-4 z-50">
        <div className="bg-blue-100/40 backdrop-blur-lg shadow-xl rounded-2xl border border-blue-200/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <Code2 className="w-6 h-6 text-blue-600" />
                <Link to="/admin" className="font-semibold text-black">Admin Dashboard</Link>
              </div>

              <button
                onClick={handleSignOut}
                className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Regular user navigation
  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="bg-blue-100/40 backdrop-blur-lg shadow-xl rounded-2xl border border-blue-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Code2 className="w-6 h-6 text-blue-600" />
              <Link to="/" className="font-semibold text-black">GeekPeak</Link>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-black hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/projects" className="text-black hover:text-blue-600 transition-colors">Projects</Link>
              <Link to="/explore" className="text-black hover:text-blue-600 transition-colors">Explore</Link>
              <Link to="/about" className="text-black hover:text-blue-600 transition-colors">About</Link>
              <Link to="/contact" className="text-black hover:text-blue-600 transition-colors">Contact</Link>
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link to="/profile" className="flex items-center gap-2 text-black hover:text-blue-600 px-4 py-2 transition-colors">
                    <UserIcon className="w-5 h-5" />
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/register"
                  className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md transition-colors"
                >
                  Join
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}