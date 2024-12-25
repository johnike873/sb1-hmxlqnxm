import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useBorrowings } from '../hooks/useBorrowings';
import BorrowingsList from '../components/BorrowingsList';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { borrowings, loading, error } = useBorrowings(user?.id);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>
      <div className="space-y-6">
        {error && <ErrorMessage message={error} />}
        <div>
          <h2 className="text-xl font-semibold mb-4">My Borrowings</h2>
          {borrowings.length > 0 ? (
            <BorrowingsList borrowings={borrowings} />
          ) : (
            <p className="text-gray-600">No books borrowed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}