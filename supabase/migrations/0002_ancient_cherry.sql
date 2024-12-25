/*
  # Add Sample Data
  
  1. Sample Users
    - Add staff members
    - Add students
  2. Sample Books
    - Add books across different categories
  3. Sample Borrowings
    - Create borrowing records
*/

-- Insert sample staff members
INSERT INTO auth.users (id, email) VALUES
  ('11111111-1111-1111-1111-111111111111', 'librarian1@library.com'),
  ('22222222-2222-2222-2222-222222222222', 'librarian2@library.com');

INSERT INTO profiles (id, role, full_name, email) VALUES
  ('11111111-1111-1111-1111-111111111111', 'staff', 'Sarah Johnson', 'librarian1@library.com'),
  ('22222222-2222-2222-2222-222222222222', 'staff', 'Michael Chen', 'librarian2@library.com');

-- Insert sample students
INSERT INTO auth.users (id, email) VALUES
  ('33333333-3333-3333-3333-333333333333', 'student1@university.edu'),
  ('44444444-4444-4444-4444-444444444444', 'student2@university.edu'),
  ('55555555-5555-5555-5555-555555555555', 'student3@university.edu');

INSERT INTO profiles (id, role, full_name, email) VALUES
  ('33333333-3333-3333-3333-333333333333', 'student', 'Emily Brown', 'student1@university.edu'),
  ('44444444-4444-4444-4444-444444444444', 'student', 'James Wilson', 'student2@university.edu'),
  ('55555555-5555-5555-5555-555555555555', 'student', 'Sofia Garcia', 'student3@university.edu');

-- Insert additional books
INSERT INTO books (title, author, isbn, category, description, total_copies, available_copies, cover_url) VALUES
  (
    '1984',
    'George Orwell',
    '9780451524935',
    'Science Fiction',
    'A dystopian social science fiction novel that follows Winston Smith in a totalitarian future society.',
    5,
    3,
    'https://images.unsplash.com/photo-1517770413964-df8ca61194a6'
  ),
  (
    'Pride and Prejudice',
    'Jane Austen',
    '9780141439518',
    'Classic',
    'A romantic novel following the emotional development of Elizabeth Bennet.',
    4,
    4,
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f'
  ),
  (
    'The Alchemist',
    'Paulo Coelho',
    '9780062315007',
    'Fiction',
    'A philosophical story about following one''s dreams.',
    6,
    5,
    'https://images.unsplash.com/photo-1589829085413-56de8ae18c73'
  ),
  (
    'Dune',
    'Frank Herbert',
    '9780441172719',
    'Science Fiction',
    'A science fiction novel set in a distant future amid a feudal interstellar society.',
    3,
    2,
    'https://images.unsplash.com/photo-1546521343-4eb2c01aa44b'
  ),
  (
    'The Lord of the Rings',
    'J.R.R. Tolkien',
    '9780618640157',
    'Fantasy',
    'An epic high-fantasy novel that follows the quest to destroy the One Ring.',
    5,
    4,
    'https://images.unsplash.com/photo-1506466010722-395aa2bef877'
  ),
  (
    'The Silent Patient',
    'Alex Michaelides',
    '9781250301697',
    'Thriller',
    'A psychological thriller about a woman''s act of violence against her husband.',
    4,
    3,
    'https://images.unsplash.com/photo-1587876931567-564ce588bfbd'
  ),
  (
    'Educated',
    'Tara Westover',
    '9780399590504',
    'Non-Fiction',
    'A memoir about a woman who leaves her survivalist family and goes on to earn a PhD.',
    3,
    2,
    'https://images.unsplash.com/photo-1532012197267-da84d127e765'
  ),
  (
    'The Midnight Library',
    'Matt Haig',
    '9780525559474',
    'Fiction',
    'A novel about a library between life and death, and the infinite possibilities of lives one could live.',
    4,
    3,
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570'
  ),
  (
    'Atomic Habits',
    'James Clear',
    '9780735211292',
    'Self-Help',
    'A guide about building good habits and breaking bad ones.',
    5,
    4,
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c'
  ),
  (
    'The Thursday Murder Club',
    'Richard Osman',
    '9780241425442',
    'Mystery',
    'Four retirees meet weekly to solve cold cases, until a real murder occurs.',
    3,
    2,
    'https://images.unsplash.com/photo-1587876931567-564ce588bfbd'
  );

-- Insert sample borrowings
INSERT INTO borrowings (book_id, user_id, borrow_date, due_date, status) VALUES
  (
    (SELECT id FROM books WHERE isbn = '9780451524935'),
    '33333333-3333-3333-3333-333333333333',
    NOW() - INTERVAL '10 days',
    NOW() + INTERVAL '4 days',
    'active'
  ),
  (
    (SELECT id FROM books WHERE isbn = '9780062315007'),
    '44444444-4444-4444-4444-444444444444',
    NOW() - INTERVAL '5 days',
    NOW() + INTERVAL '9 days',
    'active'
  ),
  (
    (SELECT id FROM books WHERE isbn = '9780441172719'),
    '55555555-5555-5555-5555-555555555555',
    NOW() - INTERVAL '15 days',
    NOW() - INTERVAL '1 day',
    'overdue'
  ),
  (
    (SELECT id FROM books WHERE isbn = '9780618640157'),
    '33333333-3333-3333-3333-333333333333',
    NOW() - INTERVAL '20 days',
    NOW() - INTERVAL '6 days',
    'returned'
  ),
  (
    (SELECT id FROM books WHERE isbn = '9781250301697'),
    '44444444-4444-4444-4444-444444444444',
    NOW() - INTERVAL '8 days',
    NOW() + INTERVAL '6 days',
    'active'
  ),
  (
    (SELECT id FROM books WHERE isbn = '9780399590504'),
    '55555555-5555-5555-5555-555555555555',
    NOW() - INTERVAL '12 days',
    NOW() + INTERVAL '2 days',
    'active'
  ),
  (
    (SELECT id FROM books WHERE isbn = '9780525559474'),
    '33333333-3333-3333-3333-333333333333',
    NOW() - INTERVAL '25 days',
    NOW() - INTERVAL '11 days',
    'returned'
  ),
  (
    (SELECT id FROM books WHERE isbn = '9780735211292'),
    '44444444-4444-4444-4444-444444444444',
    NOW() - INTERVAL '3 days',
    NOW() + INTERVAL '11 days',
    'active'
  ),
  (
    (SELECT id FROM books WHERE isbn = '9780241425442'),
    '55555555-5555-5555-5555-555555555555',
    NOW() - INTERVAL '18 days',
    NOW() - INTERVAL '4 days',
    'overdue'
  ),
  (
    (SELECT id FROM books WHERE isbn = '9780141439518'),
    '33333333-3333-3333-3333-333333333333',
    NOW() - INTERVAL '1 day',
    NOW() + INTERVAL '13 days',
    'active'
  );