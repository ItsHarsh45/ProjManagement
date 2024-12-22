import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import type { User } from 'firebase/auth';

export interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  createdAt: number;
}

export class UserService {
  static async createUserProfile(user: User): Promise<void> {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      displayName: user.displayName || 'Anonymous',
      email: user.email,
      createdAt: Date.now()
    });
  }

  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (!userDoc.exists()) return null;
      return {
        id: userDoc.id,
        ...userDoc.data()
      } as UserProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }
}