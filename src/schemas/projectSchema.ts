import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  githubUrl: z.string()
    .url('Must be a valid URL')
    .startsWith('https://github.com/', 'Must be a GitHub repository URL'),
  demoUrl: z.string()
    .url('Must be a valid URL')
    .optional(),
  imageUrl: z.string()
    .url('Must be a valid image URL')
    .startsWith('https://', 'Must be a secure URL (https)'),
  tags: z.string()
    .transform(str => str.split(',').map(tag => tag.trim()))
    .refine(tags => tags.length > 0, 'At least one tag is required')
    .refine(tags => tags.every(tag => tag.length > 0), 'Tags cannot be empty')
});