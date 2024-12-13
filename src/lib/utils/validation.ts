import { z } from 'zod';

export const validateUrl = (url: string, options: { startsWith?: string[] } = {}) => {
  const urlSchema = z.string().url('Must be a valid URL');
  
  if (options.startsWith) {
    return urlSchema.refine(
      (val) => options.startsWith!.some(prefix => val.startsWith(prefix)),
      `URL must start with ${options.startsWith.join(' or ')}`
    );
  }
  
  return urlSchema;
};