import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import type { Book } from '../types';
import BookCard from '../components/BookCard';
import { addDays } from 'date-fns';

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*');

      if (error) throw error;
      setBooks(data || []);
    } catch (error) {
      console.error('Error loading books:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleBorrow(book: Book) {
    try {
      const dueDate = addDays(new Date(), 14); // 2 weeks from now

      const { error } = await supabase
        .from('borrowings')
        .insert([
          {
            book_id: book.id,
            user_id: user?.id,
            due_date: dueDate.toISOString(),
          },
        ]);

      if (error) throw error;

      // Update book's available copies
      const { error: updateError } = await supabase
        .from('books')
        .update({ available_copies: book.available_copies - 1 })
        .eq('id', book.id);

      if (updateError) throw updateError;

      loadBooks();
    } catch (error) {
      console.error('Error borrowing book:', error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Library Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onBorrow={() => handleBorrow(book)}
          />
        ))}
      </div>
    </div>
  );
}