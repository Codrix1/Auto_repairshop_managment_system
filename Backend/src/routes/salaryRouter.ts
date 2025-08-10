import { Router } from "express";
import { addSalary, deleteSalary, getAllSalaries, updateSalary, calcSalaryByWeek, calcSalaryByMonth } from "../controllers/salaryController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const salaryRouter = Router();

salaryRouter.get('/', authMiddleware, getAllSalaries);
salaryRouter.post('/', addSalary);
salaryRouter.delete('/:id', authMiddleware, deleteSalary);
salaryRouter.put('/:id', authMiddleware, updateSalary);
salaryRouter.get('/:id/calc-salary-by-week', authMiddleware, calcSalaryByWeek)
salaryRouter.get('/:id/calc-salary-by-month', authMiddleware, calcSalaryByMonth)

export default salaryRouter;