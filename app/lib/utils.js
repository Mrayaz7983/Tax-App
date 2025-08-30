/**
 * Utility functions for environment validation and error handling
 */

/**
 * Validates required environment variables
 * @param {string[]} requiredVars - Array of required environment variable names
 * @throws {Error} If any required environment variable is missing
 */
export function validateEnvVars(requiredVars) {
  const missingVars = requiredVars.filter(varName => {
    const value = process.env[varName];
    return value === undefined || value === null || value.trim() === '';
  });

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}. ` +
      `Please check your .env.local file and ensure all required variables are set.`
    );
  }
}

/**
 * Handles Supabase errors with consistent formatting
 * @param {Error} error - The error object from Supabase
 * @param {string} context - Context where the error occurred (e.g., 'signup', 'login')
 * @returns {string} User-friendly error message
 */
export function handleSupabaseError(error, context) {
  console.error(`Supabase ${context} error:`, error);

  // Handle specific Supabase error codes
  if (error.code) {
    switch (error.code) {
      case 'invalid_credentials':
        return 'Invalid email or password. Please try again.';
      case 'user_already_exists':
        return 'An account with this email already exists.';
      case 'email_not_confirmed':
        return 'Please confirm your email address before logging in.';
      case 'weak_password':
        return 'Password is too weak. Please use a stronger password.';
      case 'invalid_email':
        return 'Please enter a valid email address.';
      default:
        return `An error occurred during ${context}. Please try again.`;
    }
  }

  // Handle network errors
  if (error.message?.includes('NetworkError') || error.message?.includes('Failed to fetch')) {
    return 'Network error. Please check your internet connection and try again.';
  }

  // Generic error message
  return `An unexpected error occurred during ${context}. Please try again.`;
}

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid boolean and message
 */
export function validatePassword(password) {
  if (password.length < 6) {
    return { isValid: false, message: 'Password must be at least 6 characters long' };
  }
  
  // Add more password strength checks as needed
  return { isValid: true, message: 'Password is valid' };
}
