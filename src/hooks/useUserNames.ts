import { useState, useEffect } from 'react';
import { UserService } from '../lib/services/userService';

export function useUserNames(userIds: string[]) {
  const [userNames, setUserNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserNames = async () => {
      const uniqueIds = [...new Set(userIds)];
      const names: Record<string, string> = {};

      await Promise.all(
        uniqueIds.map(async (userId) => {
          try {
            const profile = await UserService.getUserProfile(userId);
            names[userId] = profile?.displayName || 'Anonymous';
          } catch (error) {
            console.error('Error fetching user name:', error);
            names[userId] = 'Anonymous';
          }
        })
      );

      setUserNames(names);
      setLoading(false);
    };

    if (userIds.length > 0) {
      fetchUserNames();
    } else {
      setLoading(false);
    }
  }, [userIds]);

  return { userNames, loading };
}