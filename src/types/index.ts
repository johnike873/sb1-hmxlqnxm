export interface Profile {
  id: string;
  role: 'admin' | 'staff' | 'student';
  full_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  description: string;
  total_copies: number;
  available_copies: number;
  cover_url: string;
  created_at: string;
  updated_at: string;
}

export interface Borrowing {
  id: string;
  book_id: string;
  user_id: string;
  borrow_date: string;
  due_date: string;
  return_date: string | null;
  status: 'active' | 'returned' | 'overdue';
  created_at: string;
  updated_at: string;
  book?: Book;
}