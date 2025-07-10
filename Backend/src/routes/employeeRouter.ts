import { Router } from "express";
import { addEmployee, deleteEmployee, getAllEmployees, getEmployeeById, updateEmployee } from "../controllers/employeeController";


const employeeRouter = Router();


employeeRouter.get('/',getAllEmployees);
employeeRouter.get('/:id',getEmployeeById);
employeeRouter.post('/',addEmployee);
employeeRouter.delete('/:id',deleteEmployee);
employeeRouter.put('/:id',updateEmployee);

export default employeeRouter;