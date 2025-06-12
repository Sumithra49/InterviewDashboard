import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, Users, UserPlus } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              JobConnect
            </span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Link 
              to="/apply" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive('/apply') 
                  ? 'bg-blue-100 text-blue-700 shadow-md' 
                  : 'hover:bg-blue-50 text-gray-700'
              }`}
            >
              <UserPlus className="h-4 w-4" />
              <span className="font-medium">Apply</span>
            </Link>
            
            <Link 
              to="/recruiter" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive('/recruiter') 
                  ? 'bg-purple-100 text-purple-700 shadow-md' 
                  : 'hover:bg-purple-50 text-gray-700'
              }`}
            >
              <Users className="h-4 w-4" />
              <span className="font-medium">Recruiter</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;