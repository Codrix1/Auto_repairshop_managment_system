import { Router } from "express";
import { addEmployee, deleteEmployee, getAllEmployees, getEmployeeById, loginEmployee, updateEmployee } from "../controllers/employeeController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const employeeRouter = Router();

employeeRouter.get('/', authMiddleware, getAllEmployees);
employeeRouter.get('/:id', authMiddleware, getEmployeeById);
employeeRouter.post('/', addEmployee);
employeeRouter.post('/login', loginEmployee);
employeeRouter.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteEmployee);
employeeRouter.put('/:id', authMiddleware, roleMiddleware('admin'), updateEmployee);

export default employeeRouter;