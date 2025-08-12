import { Router } from "express";
import { addBill, getAllBills, getBillById, updateBill, deleteBill } from "../controllers/billController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const billRouter = Router();

billRouter.post('/', authMiddleware, roleMiddleware("admin"), addBill);
billRouter.get('/', authMiddleware, getAllBills);
billRouter.get('/:id', authMiddleware, getBillById);
billRouter.put('/:id', authMiddleware, roleMiddleware("admin"), updateBill);
billRouter.delete('/:id', authMiddleware, roleMiddleware("admin"), deleteBill);

export default billRouter;