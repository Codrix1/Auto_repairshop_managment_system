import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import User from "../models/User";

dotenv.config({path: '../.env', quiet: true});

// Extend Express Request type to include 'employee'
declare module 'express-serve-static-core' {
  interface Request {
    employee?: any;
  }
}

// Define the expected JWT payload type
interface JwtPayload {
  id: string;
}

// Protect Route Middleware
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(401).json({ error: 'Not authorized, verify your token.' });
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      req.employee = await User.findById(decoded.id).select('-password'); 
      next();
    } catch (error) {
      res.status(401).json({ error: 'Token invalid or expired' });
    }
};