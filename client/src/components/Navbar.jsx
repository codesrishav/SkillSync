import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Briefcase, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-4 inset-x-0 mx-auto max-w-5xl z-50 transition-all duration-300">
      <div className="glass-card px-6 py-3 flex justify-between items-center mx-4">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-gradient-to-br from-brand-500 to-accent p-2 rounded-xl group-hover:scale-105 transition-transform">
            <Briefcase className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-900 tracking-tight group-hover:text-brand-600 transition-colors">SkillSync</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link 
                to="/dashboard" 
                className={`text-sm font-semibold transition-colors ${isActive('/dashboard') ? 'text-brand-600' : 'text-gray-600 hover:text-brand-500'}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/history" 
                className={`text-sm font-semibold transition-colors ${isActive('/history') ? 'text-brand-600' : 'text-gray-600 hover:text-brand-500'}`}
              >
                History
              </Link>
              <div className="h-4 w-px bg-gray-200"></div>
              <div className="flex items-center space-x-2 text-sm font-medium text-gray-700 bg-white/50 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
                <UserIcon className="h-4 w-4 text-brand-500" />
                <span>{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                title="Log out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-gray-600 hover:text-brand-600 transition-colors">
                Log in
              </Link>
              <Link
                to="/signup"
                className="btn-primary py-2 px-5 text-sm"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
