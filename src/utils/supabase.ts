import { supabase } from '../lib/supabase';
import type { Book, Borrowing } from '../types';
import { calculateDueDate } from './date';

/**
 * Fetches borrowings for a specific user.
 */
export async function fetchUserBorrowings(userId: string): Promise<Borrowing[]> {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const { data, error } = await supabase
    .from('borrowings')
    .select('*, book:books(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching user borrowings:', error.message);
    throw error;
  }

  return data || [];
}

/**
 * Fetches all borrowings.
 */
export async function fetchAllBorrowings(): Promise<Borrowing[]> {
  const { data, error } = await supabase
    .from('borrowings')
    .select('*, book:books(*)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all borrowings:', error.message);
    throw error;
  }

  return data || [];
}

/**
 * Borrows a book by creating a borrowing record.
 */
export async function borrowBook(bookId: string, userId: string): Promise<void> {
  if (!bookId || !userId) {
    throw new Error('Book ID and User ID are required');
  }

  const { error } = await supabase
    .from('borrowings')
    .insert([{
      book_id: bookId,
      user_id: userId,
      due_date: calculateDueDate(),
    }]);

  if (error) {
    console.error('Error borrowing book:', error.message);
    throw error;
  }
}