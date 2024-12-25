import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Borrowing } from '../types';
import BorrowingsList from '../components/BorrowingsList';

export default function StaffDashboard() {
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBorrowings();
  }, []);

  async function loadBorrowings() {
    try {
      const { data, error } = await supabase
        .from('borrowings')
        .select('*, book:books(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBorrowings(data || []);
    } catch (error) {
      console.error('Error loading borrowings:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Staff Dashboard</h1>
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Borrowings</h2>
          <BorrowingsList borrowings={borrowings} />
        </div>
      </div>
    </div>
  );
}