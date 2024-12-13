import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import type { QueryConstraint } from 'firebase/firestore';

interface QueryOptions {
  collectionName: string;
  constraints?: QueryConstraint[];
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
  limitCount?: number;
}

export async function executeQuery<T>({ 
  collectionName,
  constraints = [],
  orderByField,
  orderDirection = 'desc',
  limitCount
}: QueryOptions): Promise<T[]> {
  try {
    const queryConstraints = [...constraints];
    
    if (orderByField) {
      queryConstraints.push(orderBy(orderByField, orderDirection));
    }
    
    if (limitCount) {
      queryConstraints.push(limit(limitCount));
    }

    const q = query(collection(db, collectionName), ...queryConstraints);
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  } catch (error) {
    console.error(`Error executing query for ${collectionName}:`, error);
    throw error;
  }
}