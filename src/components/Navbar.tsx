import React from 'react';
import { Code2 } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-4 left-4 right-4 z-50">
      <div className="bg-blue-100/40 backdrop-blur-lg shadow-xl rounded-2xl border border-blue-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Code2 className="w-6 h-6 text-blue-600" />
              <span className="font-semibold text-black">GeekPeak</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-black hover:text-blue-600 transition-colors">Home</a>
              <a href="#projects" className="text-black hover:text-blue-600 transition-colors">Projects</a>
              <a href="#about" className="text-black hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-black hover:text-blue-600 transition-colors">Contact</a>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-black hover:text-blue-600 px-4 py-2 transition-colors">Join</button>
              <button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md transition-colors">
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;