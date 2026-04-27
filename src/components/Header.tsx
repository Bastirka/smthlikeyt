import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Logo and Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
              ▶
            </div>
            <span className="hidden sm:inline">StreamHub</span>
          </Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
          <div className={`flex flex-1 items-center px-4 rounded-full border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className={`flex-1 py-2 outline-none ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
            <button type="submit" className="p-2 hover:text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Search */}
          <button className="md:hidden p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition"
          >
            {darkMode ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 1.78a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.828 2.828a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}
            >
              <img
                src={user?.avatar || 'https://via.placeholder.com/32'}
                alt={user?.username}
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden sm:inline text-sm font-medium">{user?.username}</span>
            </button>

            {showUserMenu && (
              <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="p-4 border-b border-gray-700">
                  <p className="font-semibold">{user?.username}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                <nav className="p-2 space-y-1">
                  <Link to="/" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
                    Home
                  </Link>
                  {user?.accountType === 'creator' && (
                    <>
                      <Link to="/creator" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
                        Creator Panel
                      </Link>
                      <Link to="/creator/upload" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
                        Upload Video
                      </Link>
                    </>
                  )}
                  {user?.accountType === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
                      Admin Panel
                    </Link>
                  )}
                  <Link to="/premium" className="block px-4 py-2 rounded hover:bg-gray-700 transition">
                    Premium
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 rounded hover:bg-gray-700 transition text-red-500"
                  >
                    Logout
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
