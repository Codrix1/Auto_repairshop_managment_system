import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({ quiet: true })

// Generate JWT
export const generateToken = (id: any) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.sign({ id }, secret, { expiresIn: '1d' });
};