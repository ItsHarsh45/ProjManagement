import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { ADMIN_EMAILS } from '../lib/constants';

export function useAdmin(user: User | null) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = () => {
      setIsAdmin(Boolean(user?.email && ADMIN_EMAILS.includes(user.email)));
      setLoading(false);
    };

    checkAdminStatus();
  }, [user]);

  return { isAdmin, loading };
}