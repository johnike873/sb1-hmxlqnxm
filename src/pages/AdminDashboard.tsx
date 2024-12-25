import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Book, Borrowing, Profile } from '../types';
import BorrowingsList from '../components/BorrowingsList';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalBorrowings: 0,
    totalUsers: 0,
  });
  const [recentBorrowings, setRecentBorrowings] = useState<Borrowing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      const [
        { count: booksCount },
        { count: borrowingsCount },
        { count: usersCount },
        { data: borrowings },
      ] = await Promise.all([
        supabase.from('books').select('*', { count: 'exact', head: true }),
        supabase.from('borrowings').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase
          .from('borrowings')
          .select('*, book:books(*)')
          .order('created_at', { ascending: false })
          .limit(10),
      ]);

      setStats({
        totalBooks: booksCount || 0,
        totalBorrowings: borrowingsCount || 0,
        totalUsers: usersCount || 0,
      });
      setRecentBorrowings(borrowings || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Books</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.totalBooks}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Borrowings</h3>
          <p className="text-3xl font-bold text-green-600">{stats.totalBorrowings}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.totalUsers}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Borrowings</h2>
        <BorrowingsList borrowings={recentBorrowings} />
      </div>
    </div>
  );
}