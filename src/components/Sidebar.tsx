import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { categories } from '../data/mockData';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { darkMode } = useTheme();
  const { user } = useAuth();

  const menuItems = [
    { label: 'Home', icon: '🏠', href: '/' },
    { label: 'Explore', icon: '🔥', href: '/explore/all' },
    { label: 'Subscriptions', icon: '🔔', href: '/subscriptions' },
    { label: 'Shop', icon: '🛍️', href: '/shop' },
    { label: 'Premium', icon: '⭐', href: '/premium' },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r overflow-y-auto transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} z-40`}
    >
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-4 px-6 py-3 rounded-lg transition ${
              darkMode
                ? 'hover:bg-gray-700'
                : 'hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}

        {/* Categories */}
        <div className="pt-4 border-t border-gray-700">
          <h3 className="px-6 py-2 text-sm font-semibold text-gray-500 uppercase">
            Categories
          </h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/explore/${category}`}
                className={`block px-6 py-2 rounded-lg transition text-sm capitalize ${
                  darkMode
                    ? 'hover:bg-gray-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Creator Links */}
        {user?.accountType === 'creator' && (
          <div className="pt-4 border-t border-gray-700">
            <h3 className="px-6 py-2 text-sm font-semibold text-gray-500 uppercase">
              Creator Tools
            </h3>
            <Link to="/creator" className="block px-6 py-2 rounded-lg hover:bg-gray-700 transition">
              Dashboard
            </Link>
            <Link to="/creator/upload" className="block px-6 py-2 rounded-lg hover:bg-gray-700 transition">
              Upload Video
            </Link>
            <Link to="/creator/analytics" className="block px-6 py-2 rounded-lg hover:bg-gray-700 transition">
              Analytics
            </Link>
            <Link to="/creator/wallet" className="block px-6 py-2 rounded-lg hover:bg-gray-700 transition">
              Wallet
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
