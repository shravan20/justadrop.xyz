import { UserRole } from '@/types';

/**
 * Determines if a test login is enabled for a specific role
 * In production, only admin test login will remain enabled
 */
export const isTestLoginEnabled = (role: UserRole): boolean => {
  // In production, only allow admin test login
  if (import.meta.env.PROD) {
    return role === 'admin';
  }
  
  // In development, allow all test logins
  return true;
};

/**
 * Test account email addresses
 */
export const TEST_ACCOUNTS = {
  ADMIN: 'admin@gmail.com',
  VOLUNTEER: 'volunteer@gmail.com',
  NGO: 'ngo@gmail.com',
};

/**
 * Checks if an email is a test account
 */
export const isTestAccount = (email: string): boolean => {
  return Object.values(TEST_ACCOUNTS).includes(email);
};

/**
 * Gets the role for a test account email
 */
export const getTestAccountRole = (email: string): UserRole | null => {
  switch (email) {
    case TEST_ACCOUNTS.ADMIN:
      return 'admin';
    case TEST_ACCOUNTS.VOLUNTEER:
      return 'volunteer';
    case TEST_ACCOUNTS.NGO:
      return 'ngo';
    default:
      return null;
  }
};
