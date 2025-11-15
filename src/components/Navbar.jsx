import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useTheme } from '../context/AppContext.jsx'; 
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

  return (
    <header className="shadow-lg sticky top-0 z-50 bg-[var(--nav-bg)] transition-colors duration-300">
      <nav className="max-w-[1280px] mx-auto px-4 w-full">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-extrabold tracking-wider 
              bg-gradient-to-r from-[#4fbf8b] to-[#3cae9e] bg-clip-text text-transparent"
            >
              SOCIALSPARK
            </Link>
          </div>

          {/* Right Options */}
          <div className="flex items-center space-x-6">

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
              dark:text-gray-400 dark:hover:text-gray-200 transition"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Auth Buttons */}
            {!user ? (
              <Link
                to="/login"
                className="bg-[#4fbf8b] text-white px-4 py-2 rounded-lg font-semibold 
                hover:bg-[#41a97a] flex items-center shadow-lg hover:shadow-xl transition"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Login
              </Link>
            ) : (
              <div className="relative">
                <div className="flex items-center space-x-3">

                  {/* Avatar */}
                  <button
                    className="block rounded-full focus:ring-2 focus:ring-indigo-500"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onMouseEnter={() => setIsDropdownOpen(true)}
                  >
                    <img
                      className="h-10 w-10 rounded-full border-2 border-indigo-500 object-cover"
                      src={user.photoURL}
                      alt={user.displayName}
                    />
                  </button>

                  {/* Logout (Desktop) */}
                  <button
                    onClick={handleLogout}
                    className="hidden sm:flex text-gray-700 dark:text-gray-300 
                    hover:text-red-500 transition"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 
                    rounded-lg shadow-xl py-1 z-20"
                    onMouseLeave={() => setIsDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 border-b dark:border-gray-700 truncate">
                      {user.displayName}
                    </div>

                    {privateLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 
                        hover:bg-indigo-50 dark:hover:bg-gray-700 transition"
                      >
                        <link.icon className="w-4 h-4 text-indigo-500 mr-2" />
                        {link.name}
                      </Link>
                    ))}

                    {/* Mobile Logout */}
                    <button
                      onClick={handleLogout}
                      className="sm:hidden w-full flex items-center px-4 py-2 text-sm text-red-500 
                      hover:bg-red-50 dark:hover:bg-gray-700 border-t dark:border-gray-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
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
