import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import type { ProjectFormData } from '../types';

export function useProjectSubmit() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const submitProject = async (data: ProjectFormData, userId: string) => {
    setSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'projects'), {
        ...data,
        status: 'pending',
        userId,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      return true;
    } catch (err) {
      setError('Failed to submit project');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { submitProject, submitting, error };
}