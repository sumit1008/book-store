import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../App';
import { BookOpenIcon } from '../components/Icons';

export const LoginPage: React.FC = () => {
  const [loginType, setLoginType] = useState<'user' | 'admin'>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleTabChange = (type: 'user' | 'admin') => {
    setLoginType(type);
    setError('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const loggedInUser = login(email, password);
    if (loggedInUser) {
      if(loginType === 'admin' && !loggedInUser.isAdmin) {
        setError('These are not valid admin credentials.');
        return;
      }
       if(loginType === 'user' && loggedInUser.isAdmin) {
        setError('Admin users must log in via the Admin panel.');
        return;
      }
      navigate(loggedInUser.isAdmin ? '/admin' : '/');
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 m-4">
        <div className="flex justify-center mb-6">
          <BookOpenIcon className="w-16 h-16 text-indigo-600" />
        </div>
        
        <div className="flex border-b-2 border-gray-200 mb-6">
          <button
            onClick={() => handleTabChange('user')}
            className={`w-1/2 py-3 text-center font-semibold transition-colors ${
              loginType === 'user' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            User Login
          </button>
          <button
            onClick={() => handleTabChange('admin')}
            className={`w-1/2 py-3 text-center font-semibold transition-colors ${
              loginType === 'admin' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Admin Login
          </button>
        </div>
        
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {loginType === 'user' ? 'Welcome Back' : 'Admin Access'}
        </h2>
        <p className="text-center text-gray-500 mb-8">
          {loginType === 'user' ? 'Login to your Gemini Books account' : 'Please enter admin credentials'}
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </form>

        {loginType === 'admin' && (
           <div className="mt-4 text-center text-sm text-gray-600">
            <p>Default Admin: admin@example.com / adminpassword</p>
          </div>
        )}
        
        {loginType === 'user' && (
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign up
                    </Link>
                </p>
            </div>
        )}
      </div>
    </div>
  );
};