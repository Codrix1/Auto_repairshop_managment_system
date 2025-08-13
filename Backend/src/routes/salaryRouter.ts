import { Router } from "express";
import { addSalary, deleteSalary, getSalaryById, getAllSalaries, updateSalary, calcSalaryByWeek, calcSalaryByMonth } from "../controllers/salaryController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const salaryRouter = Router();

salaryRouter.get('/', authMiddleware, roleMiddleware('admin'), getAllSalaries);
salaryRouter.get('/id',authMiddleware, getSalaryById)
salaryRouter.post('/', authMiddleware, roleMiddleware('admin'), addSalary);
salaryRouter.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteSalary);
salaryRouter.put('/:id', authMiddleware, roleMiddleware('admin'), updateSalary);
salaryRouter.get('/:id/calc-salary-by-week', authMiddleware, calcSalaryByWeek)
salaryRouter.get('/:id/calc-salary-by-month', authMiddleware, calcSalaryByMonth)

export default salaryRouter;