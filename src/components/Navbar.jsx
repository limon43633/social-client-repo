// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Fixed import
import { useTheme } from '../context/ThemeContext'; // Fixed import
import { LogIn, LogOut, PlusCircle, CalendarCheck, Settings, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const privateLinks = [
    { name: 'Create Event', path: '/create-event', icon: PlusCircle },
    { name: 'Manage Events', path: '/manage-events', icon: Settings },
    { name: 'Joined Events', path: '/joined-events', icon: CalendarCheck },
  ];

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  if (loading) return null;

  // Fallback Avatar + Display Name
  const avatarURL =
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.displayName || user?.email || "User"
    )}&background=random&color=fff`;

  const displayName = user?.displayName || user?.email || "Unknown User";

  return (
    <header className="backdrop-blur-xl bg-white/20 dark:bg-gray-900/20 border-b border-white/30 dark:border-white/10 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <nav className="max-w-[1280px] mx-auto px-4 w-full">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-wider 
              bg-gradient-to-r from-[#4fbf8b] to-[#3cae9e] bg-clip-text text-transparent
              hover:opacity-80 transition-opacity"
            >
              SOCIALSPARK
            </Link>
          </div>

          {/* Right Options */}
          <div className="flex items-center space-x-4 md:space-x-6">

            {/* Upcoming Events Link */}
            <Link 
              to="/upcoming-events"
              className="text-gray-700 dark:text-gray-300 font-medium 
              hidden md:block px-4 py-2 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-400/20 
              hover:text-orange-700 dark:hover:text-orange-300 transition"
            >
              Upcoming Events
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 
              dark:text-gray-400 dark:hover:text-gray-200 transition
              hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Auth Section */}
            {!user ? (
              // Show Login button when user is not logged in
              <Link
                to="/login"
                className="bg-[#4fbf8b] text-white px-4 py-2 rounded-lg font-semibold 
                hover:bg-[#41a97a] flex items-center shadow-lg hover:shadow-xl transition
                transform hover:scale-105"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </Link>
            ) : (
              // Show user avatar and dropdown when logged in
              <div className="relative">
                <div className="flex items-center space-x-3">
                  
                  {/* Avatar with hover tooltip */}
                  <div className="relative group">
                    <button
                      className="block rounded-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      aria-label="User menu"
                    >
                      <img
                        className="h-10 w-10 rounded-full border-2 border-indigo-500 object-cover
                        hover:border-indigo-600 transition-colors"
                        src={avatarURL}
                        alt={displayName}
                      />
                    </button>
                    
                    {/* Hover tooltip for display name */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                    px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 
                    transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      {displayName}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                      border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>

                  {/* Desktop Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="hidden sm:flex items-center text-gray-700 dark:text-gray-300 
                    hover:text-red-500 transition p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    aria-label="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 
                    rounded-lg shadow-xl py-1 z-20 border border-gray-200 dark:border-gray-700"
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b dark:border-gray-700">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {displayName}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </div>
                    </div>

                    {/* Navigation Links */}
                    {privateLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 
                        hover:bg-indigo-50 dark:hover:bg-gray-700 transition group"
                      >
                        <link.icon className="w-4 h-4 text-indigo-500 mr-3 group-hover:scale-110 transition-transform" />
                        {link.name}
                      </Link>
                    ))}

                    {/* Mobile Logout */}
                    <button
                      onClick={handleLogout}
                      className="sm:hidden w-full flex items-center px-4 py-3 text-sm text-red-500 
                      hover:bg-red-50 dark:hover:bg-gray-700 border-t dark:border-gray-700 transition"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;