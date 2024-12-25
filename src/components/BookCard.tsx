import React from 'react';
import type { Book } from '../types';
import { format } from 'date-fns';

interface BookCardProps {
  book: Book;
  onBorrow?: () => void;
  onReturn?: () => void;
  showActions?: boolean;
}

export default function BookCard({ book, onBorrow, onReturn, showActions = true }: BookCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={book.cover_url}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-gray-600">{book.author}</p>
        <p className="text-sm text-gray-500 mt-1">ISBN: {book.isbn}</p>
        <p className="text-sm text-gray-500">Category: {book.category}</p>
        <p className="mt-2 text-sm">{book.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Available: {book.available_copies}/{book.total_copies}
          </span>
          {showActions && book.available_copies > 0 && onBorrow && (
            <button
              onClick={onBorrow}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Borrow
            </button>
          )}
          {showActions && onReturn && (
            <button
              onClick={onReturn}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Return
            </button>
          )}
        </div>
      </div>
    </div>
  );
}