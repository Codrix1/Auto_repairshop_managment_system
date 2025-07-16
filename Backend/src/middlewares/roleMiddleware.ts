import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { AuthenticationError } from "./errorMiddleware";
import Employee from "../models/Employee";

const roleMiddleware = (role: string) => asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { name } = req.body;
        const employee = await Employee.findOne({ name });
        if (employee?.role != role) {
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