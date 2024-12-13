import { useState, useEffect } from 'react';
import { QueryConstraint } from 'firebase/firestore';
import { executeQuery } from '../lib/utils/firebase';

interface UseFirestoreQueryOptions {
  collectionName: string;
  constraints?: QueryConstraint[];
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
  limitCount?: number;
  enabled?: boolean;
}

export function useFirestoreQuery<T>({
  collectionName,
  constraints = [],
  orderByField,
  orderDirection = 'desc',
  limitCount,
  enabled = true
}: UseFirestoreQueryOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const result = await executeQuery<T>({
          collectionName,
          constraints,
          orderByField,
          orderDirection,
          limitCount
        });
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, constraints, orderByField, orderDirection, limitCount, enabled]);

  return { data, loading, error };
}