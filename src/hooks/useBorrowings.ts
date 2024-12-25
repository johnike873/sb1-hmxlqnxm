import { useState, useEffect } from 'react';
import type { Borrowing } from '../types';
import { fetchUserBorrowings, fetchAllBorrowings } from '../utils/supabase';

export function useBorrowings(userId?: string) {
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip fetching if userId is undefined
    if (userId === undefined) {
      setLoading(false);
      return;
    }

    async function loadBorrowings() {
      try {
        const data = userId 
          ? await fetchUserBorrowings(userId)
          : await fetchAllBorrowings();
        setBorrowings(data);
        setError(null);
      } catch (error: any) {
        console.error('Error loading borrowings:', error);
        setError(error.message);
        setBorrowings([]);
      } finally {
        setLoading(false);
      }
    }

    loadBorrowings();
  }, [userId]);

  return { borrowings, loading, error };
}