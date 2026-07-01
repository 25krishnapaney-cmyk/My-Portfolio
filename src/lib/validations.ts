import { z } from 'zod';

/**
 * Sanitizes a raw string input to protect against XSS, HTML Injection, SQL/NoSQL injection tokens,
 * and null-byte injection. Trims leading/trailing whitespace.
 */
export function sanitizeString(val: unknown): string {
  if (typeof val !== 'string') return '';
  
  return val
    .replace(/\0/g, '') // Remove null bytes
    .trim()
    // Strip dangerous HTML/script tags and event handlers (XSS protection)
    .replace(/<(script|iframe|object|embed|applet|style|meta|base|link|form)[^>]*>/gi, '')
    .replace(/<\/(script|iframe|object|embed|applet|style|meta|base|link|form)>/gi, '')
    .replace(/on[a-z]+\s*=/gi, '') // Remove inline event handlers (e.g., onerror=, onload=)
    .replace(/javascript:/gi, ''); // Remove javascript: URI schemes
}

/**
 * Strips common SQL / NoSQL injection sequences from search/query strings.
 */
export function sanitizeQueryParam(val: unknown): string {
  const cleaned = sanitizeString(val);
  return cleaned
    .replace(/(--|;|'|"|`|\$where|\$ne|\$gt|\$lt|\$regex)/g, '')
    .slice(0, 100); // Limit query length to prevent ReDoS / payload flooding
}

// -----------------------------------------------------------------------------
// 1. Contact Form Schema
// -----------------------------------------------------------------------------
export const contactFormSchema = z.object({
  name: z
    .string({ message: 'Name is required.' })
    .trim()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(100, { message: 'Name cannot exceed 100 characters.' })
    .regex(/^[a-zA-Z\s.-]+$/, { message: 'Name can only contain letters, spaces, hyphens, and periods.' })
    .transform(sanitizeString),

  email: z
    .string({ message: 'Email address is required.' })
    .trim()
    .toLowerCase()
    .email({ message: 'Please provide a valid email address.' })
    .max(255, { message: 'Email address is too long.' }),

  subject: z
    .string({ message: 'Subject is required.' })
    .trim()
    .min(3, { message: 'Subject must be at least 3 characters long.' })
    .max(150, { message: 'Subject cannot exceed 150 characters.' })
    .transform(sanitizeString),

  message: z
    .string({ message: 'Message is required.' })
    .trim()
    .min(10, { message: 'Message must be at least 10 characters long.' })
    .max(2000, { message: 'Message cannot exceed 2000 characters.' })
    .transform(sanitizeString),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// -----------------------------------------------------------------------------
// 2. Project Search & Pagination Schema
// -----------------------------------------------------------------------------
export const projectQuerySchema = z.object({
  category: z
    .string()
    .optional()
    .transform((val) => (val ? sanitizeQueryParam(val) : 'ALL')),

  search: z
    .string()
    .optional()
    .transform((val) => (val ? sanitizeQueryParam(val) : '')),

  page: z
    .string()
    .optional()
    .default('1')
    .transform((val) => {
      const parsed = parseInt(val, 10);
      return isNaN(parsed) || parsed < 1 ? 1 : Math.min(parsed, 100);
    }),

  limit: z
    .string()
    .optional()
    .default('10')
    .transform((val) => {
      const parsed = parseInt(val, 10);
      return isNaN(parsed) || parsed < 1 ? 10 : Math.min(parsed, 50);
    }),
});

export type ProjectQueryData = z.infer<typeof projectQuerySchema>;

// -----------------------------------------------------------------------------
// 3. Authentication Verification Schema (Stub for admin/protected routes)
// -----------------------------------------------------------------------------
export const authVerifySchema = z.object({
  token: z
    .string({ message: 'Authentication token is required.' })
    .trim()
    .min(10, { message: 'Token is too short.' })
    .max(500, { message: 'Token is too long.' })
    .regex(/^[a-zA-Z0-9-_=.]+$/, { message: 'Token contains invalid characters.' }),
});

export type AuthVerifyData = z.infer<typeof authVerifySchema>;

/**
 * Formats Zod validation errors into a clean, user-friendly object mapping field names to error strings
 * without exposing internal server stack traces or library structures.
 */
export function formatValidationErrors(error: z.ZodError): Record<string, string> {
  const formatted: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join('.') || 'form';
    if (!formatted[path]) {
      formatted[path] = issue.message;
    }
  }
  return formatted;
}
