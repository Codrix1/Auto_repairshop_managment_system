import { Router } from "express";
import { addInstallment, getAllInstallments, getInstallmentById, updateInstallment, deleteInstallment } from "../controllers/installmentController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const installmentRouter = Router();

installmentRouter.post('/', authMiddleware, roleMiddleware("admin"), addInstallment);
installmentRouter.get('/', authMiddleware, getAllInstallments);
installmentRouter.get('/:id', authMiddleware, getInstallmentById);
installmentRouter.put('/:id', authMiddleware, roleMiddleware("admin"), updateInstallment);
installmentRouter.delete('/:id', authMiddleware, roleMiddleware("admin"), deleteInstallment);

export default installmentRouter;