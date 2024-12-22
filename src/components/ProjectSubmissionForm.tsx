import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { projectSchema } from '../schemas/projectSchema';
import { FormInput } from './forms/FormInput';
import { FormTextarea } from './forms/FormTextarea';
import type { ProjectFormData } from '../types/project';

interface ProjectSubmissionFormProps {
  onSuccess?: () => void;
}

export function ProjectSubmissionForm({ onSuccess }: ProjectSubmissionFormProps) {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema)
  });

  const onSubmit = async (data: ProjectFormData) => {
    if (!user) return;
    setSubmitting(true);
    setError('');

    try {
      // Remove empty demoUrl if it's not provided
      const projectData = {
        ...data,
        demoUrl: data.demoUrl || null
      };

      await addDoc(collection(db, 'projects'), {
        ...projectData,
        status: 'pending',
        userId: user.uid,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });

      reset();
      onSuccess?.();
    } catch (err) {
      setError('Failed to submit project');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <FormInput
        label="Project Title"
        {...register('title')}
        error={errors.title?.message}
      />

      <FormTextarea
        label="Description"
        {...register('description')}
        error={errors.description?.message}
      />

      <FormInput
        label="GitHub URL"
        {...register('githubUrl')}
        error={errors.githubUrl?.message}
      />

      <FormInput
        label="Demo URL (Optional)"
        {...register('demoUrl')}
        error={errors.demoUrl?.message}
        placeholder="https://example.com"
      />

      <FormInput
        label="Project Image URL"
        {...register('imageUrl')}
        error={errors.imageUrl?.message}
        placeholder="https://example.com/image.jpg"
      />

      <FormInput
        label="Tags (comma-separated)"
        {...register('tags')}
        error={errors.tags?.message}
        placeholder="react, typescript, firebase"
      />

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
      >
        {submitting ? 'Submitting...' : 'Submit Project'}
      </button>
    </form>
  );
}