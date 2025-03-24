import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, User as UserIcon, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../hooks/useAdmin';
import { auth } from '../lib/firebase';

export function AuthNavbar() {
  const { user } = useAuth();
  const { isAdmin } = useAdmin(user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Admin navigation (simplified for both desktop and mobile)
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

  // Regular user navigation with mobile menu
  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="bg-blue-100/40 backdrop-blur-lg shadow-xl rounded-2xl border border-blue-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and site name */}
            <div className="flex items-center gap-2">
              <Code2 className="w-6 h-6 text-blue-600" />
              <Link to="/" className="font-semibold text-black">GeekPeak</Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-black hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/projects" className="text-black hover:text-blue-600 transition-colors">Projects</Link>
              <Link to="/explore" className="text-black hover:text-blue-600 transition-colors">Explore</Link>
              <Link to="/about" className="text-black hover:text-blue-600 transition-colors">About</Link>
              <Link to="/contact" className="text-black hover:text-blue-600 transition-colors">Contact</Link>
            </div>
            
            {/* Desktop user controls */}
            <div className="hidden md:flex items-center gap-4">
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
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-100 transition-colors"
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-b-2xl border-t border-blue-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/projects" 
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link 
                to="/explore" 
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              <Link 
                to="/about" 
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-blue-100">
              {user ? (
                <div className="px-2 space-y-1">
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-5 h-5" />
                      Profile
                    </div>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="px-2 space-y-1">
                  <Link
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Join
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}