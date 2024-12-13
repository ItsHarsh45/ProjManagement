import { z } from 'zod';
import { projectSchema } from '../schemas/projectSchema';

export type ProjectFormData = z.infer<typeof projectSchema>;

export interface Project extends ProjectFormData {
  id?: string;
  status: 'pending' | 'approved' | 'rejected';
  userId: string;
  createdAt: number;
  updatedAt: number;
}