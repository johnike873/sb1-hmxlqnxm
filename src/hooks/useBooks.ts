import { useState, useEffect } from 'react';
import type { Book } from '../types';
import { fetchBooks, borrowBook, updateBookCopies } from '../utils/supabase';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadBooks() {
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleBorrow(book: Book, userId: string) {
    try {
      await borrowBook(book.id, userId);
      await updateBookCopies(book.id, book.available_copies - 1);
      await loadBooks();
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  return { books, loading, handleBorrow };
}