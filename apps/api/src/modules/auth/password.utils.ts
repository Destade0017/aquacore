import bcrypt from 'bcryptjs';

const BCRYPT_SALT_ROUNDS = 12;

/**
 * Hashes a plaintext password securely using bcrypt.
 * Never logs or persists the plaintext password.
 * 
 * @param password Plaintext password to hash
 * @returns Promise resolving to the hashed password string
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
};

/**
 * Compares a plaintext password against a stored bcrypt hash.
 * Never logs or exposes passwords or hashes.
 * 
 * @param password Plaintext password to verify
 * @param hash Stored bcrypt hash to compare against
 * @returns Promise resolving to boolean (true if match, false otherwise)
 */
export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
