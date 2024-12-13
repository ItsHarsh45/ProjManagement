import { User } from 'firebase/auth';
import { ADMIN_EMAILS } from '../constants';

export function isAdmin(user: User | null): boolean {
  return Boolean(user?.email && ADMIN_EMAILS.includes(user.email));
}

export function formatUserName(user: User | null): string {
  if (!user) return 'User';
  return user.displayName || user.email?.split('@')[0] || 'User';
}