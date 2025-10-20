import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../App';
import { BookOpenIcon, CartIcon } from './Icons';

export const Header: React.FC = () => {
  const { cart, currentUser, logout, searchTerm, setSearchTerm } = useApp();
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
          <BookOpenIcon className="w-8 h-8 text-indigo-600" />
          <span>Book Store</span>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by title or author..."
            className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all w-64 bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {currentUser?.isAdmin && (
            <Link to="/admin" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">
              Admin Panel
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-5">
          <Link to="/cart" className="relative text-gray-600 hover:text-indigo-600 transition-colors">
            <CartIcon className="w-7 h-7" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
          {currentUser ? (
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-700">Hi, {currentUser.name.split(' ')[0]}</span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors text-sm font-semibold"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
                to="/login"
                className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors text-sm font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};