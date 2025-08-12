import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { AuthenticationError } from "./errorMiddleware";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config({path: '../.env', quiet: true});

const roleMiddleware = (role: string) => asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ error: 'Not authorized, verify your token.' });
        return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        if (decoded.role != role) {
          throw new AuthenticationError(`You are not authorized to view this page, role needed: ${role}`);
        }
        next();
      }
      catch (e) {
        throw new AuthenticationError(`you are not authorized to view this page ${e}`);
      }
    }
  );
  
export { roleMiddleware };