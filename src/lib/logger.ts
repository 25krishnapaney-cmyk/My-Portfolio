/**
 * Secure Logging Utility
 * Redacts sensitive secrets, passwords, tokens, API keys, and Personal Identifiable Information (PII)
 * such as email addresses from console logs before writing to the standard output.
 */

// Regular expressions for detecting sensitive data
const EMAIL_REGEX = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
const BEARER_TOKEN_REGEX = /(Bearer\s+[A-Za-z0-9-_=.]+)/gi;
const JWT_REGEX = /(ey[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*)/gi;
const API_KEY_REGEX = /(api[_-]?key[\s:="']+)([A-Za-z0-9-_]{16,})/gi;
const PASSWORD_REGEX = /(password[\s:="']+)([^"\s,]+)/gi;
const SECRET_REGEX = /(secret[\s:="']+)([A-Za-z0-9-_]{16,})/gi;

/**
 * Recursively redacts sensitive strings or object properties.
 */
export function sanitizeLogData(data: unknown): unknown {
  if (typeof data === 'string') {
    return data
      .replace(EMAIL_REGEX, '[REDACTED_EMAIL]')
      .replace(BEARER_TOKEN_REGEX, 'Bearer [REDACTED_TOKEN]')
      .replace(JWT_REGEX, '[REDACTED_JWT]')
      .replace(API_KEY_REGEX, '$1[REDACTED_API_KEY]')
      .replace(PASSWORD_REGEX, '$1[REDACTED_PASSWORD]')
      .replace(SECRET_REGEX, '$1[REDACTED_SECRET]');
  }

  if (data instanceof Error) {
    return {
      name: data.name,
      message: sanitizeLogData(data.message),
      // In production, we omit the stack trace to prevent leaking file paths or internal structure
      stack: process.env.NODE_ENV === 'production' ? '[REDACTED_STACK_TRACE]' : sanitizeLogData(data.stack),
    };
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeLogData(item));
  }

  if (data !== null && typeof data === 'object') {
    const sanitizedObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      const lowerKey = key.toLowerCase();
      if (
        lowerKey.includes('password') ||
        lowerKey.includes('secret') ||
        lowerKey.includes('token') ||
        lowerKey.includes('authorization') ||
        lowerKey.includes('apikey')
      ) {
        sanitizedObj[key] = '[REDACTED_SECRET]';
      } else if (lowerKey.includes('email')) {
        sanitizedObj[key] = '[REDACTED_EMAIL]';
      } else {
        sanitizedObj[key] = sanitizeLogData(value);
      }
    }
    return sanitizedObj;
  }

  return data;
}

export const secureLog = {
  info(message: string, ...optionalParams: unknown[]): void {
    const sanitizedParams = optionalParams.map(sanitizeLogData);
    console.log(`[INFO] ${sanitizeLogData(message)}`, ...sanitizedParams);
  },
  warn(message: string, ...optionalParams: unknown[]): void {
    const sanitizedParams = optionalParams.map(sanitizeLogData);
    console.warn(`[WARN] ${sanitizeLogData(message)}`, ...sanitizedParams);
  },
  error(message: string, ...optionalParams: unknown[]): void {
    const sanitizedParams = optionalParams.map(sanitizeLogData);
    console.error(`[ERROR] ${sanitizeLogData(message)}`, ...sanitizedParams);
  },
  debug(message: string, ...optionalParams: unknown[]): void {
    if (process.env.NODE_ENV !== 'production') {
      const sanitizedParams = optionalParams.map(sanitizeLogData);
      console.debug(`[DEBUG] ${sanitizeLogData(message)}`, ...sanitizedParams);
    }
  },
};
