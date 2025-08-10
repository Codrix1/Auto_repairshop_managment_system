import { Router } from "express";
import { addEmployee, deleteEmployee, getAllEmployees, getEmployeeById, updateEmployee } from "../controllers/employeeController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const employeeRouter = Router();

employeeRouter.get('/', authMiddleware, getAllEmployees);
employeeRouter.get('/:id', authMiddleware, getEmployeeById);
employeeRouter.post('/', addEmployee);
employeeRouter.delete('/:id', authMiddleware, deleteEmployee);
employeeRouter.put('/:id', authMiddleware, updateEmployee);

export default employeeRouter;