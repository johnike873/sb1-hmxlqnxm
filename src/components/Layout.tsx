import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Library, LogOut, Book, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export default function Layout() {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Library className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Library System</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <User className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link to="/books" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                <Book className="h-5 w-5" />
                <span>Books</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}