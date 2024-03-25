import bcrypt from 'bcryptjs';

const saltRounds = 10; // Number of salt rounds

// Function to hash password
export const hashPassword = async (password) => {
    try {
        console.log(password)
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
};
