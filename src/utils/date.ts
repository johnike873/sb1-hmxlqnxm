import { addDays, format } from 'date-fns';

export const BORROW_DURATION_DAYS = 14;

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'MMM d, yyyy');
}

export function calculateDueDate(): string {
  return addDays(new Date(), BORROW_DURATION_DAYS).toISOString();
}