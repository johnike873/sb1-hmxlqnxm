/*
  # Library Management System Schema

  1. Tables
    - profiles: User profiles with roles
    - books: Library book catalog
    - borrowings: Book lending records

  2. Security
    - RLS enabled on all tables
    - Role-based access policies
    - Public read access for books
    - Protected write access
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role text NOT NULL CHECK (role IN ('admin', 'staff', 'student')),
  full_name text NOT NULL,
  email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create books table
CREATE TABLE books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  isbn text UNIQUE NOT NULL,
  category text NOT NULL,
  description text,
  total_copies integer NOT NULL DEFAULT 1,
  available_copies integer NOT NULL DEFAULT 1,
  cover_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create borrowings table
CREATE TABLE borrowings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_id uuid REFERENCES books(id),
  user_id uuid REFERENCES profiles(id),
  borrow_date timestamptz DEFAULT now(),
  due_date timestamptz NOT NULL,
  return_date timestamptz,
  status text NOT NULL CHECK (status IN ('active', 'returned', 'overdue')) DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE borrowings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Books policies
CREATE POLICY "Books are viewable by everyone"
  ON books FOR SELECT
  USING (true);

CREATE POLICY "Admin and staff can insert books"
  ON books FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Admin and staff can update books"
  ON books FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'staff')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'staff')
    )
  );

-- Borrowings policies
CREATE POLICY "Users can view own borrowings"
  ON borrowings FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'staff')
    )
  );

CREATE POLICY "Users can create borrowings"
  ON borrowings FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND role IN ('admin', 'staff')
    )
  );

-- Insert sample data
INSERT INTO auth.users (id, email)
VALUES ('00000000-0000-0000-0000-000000000000', 'admin@library.com');

INSERT INTO profiles (id, role, full_name, email)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'admin',
  'System Admin',
  'admin@library.com'
);

INSERT INTO books (title, author, isbn, category, description, total_copies, available_copies, cover_url)
VALUES
  (
    'The Great Gatsby',
    'F. Scott Fitzgerald',
    '9780743273565',
    'Fiction',
    'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    5,
    5,
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e'
  ),
  (
    'To Kill a Mockingbird',
    'Harper Lee',
    '9780446310789',
    'Fiction',
    'The story of racial injustice and the loss of innocence in the American South.',
    3,
    3,
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c'
  ),
  (
    'The Hobbit',
    'J.R.R. Tolkien',
    '9780547928227',
    'Fantasy',
    'The tale of Bilbo Baggins, who embarks on a quest to help a group of dwarves reclaim their homeland.',
    4,
    4,
    'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf'
  );