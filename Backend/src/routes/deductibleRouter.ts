import { Router } from "express";
import { addDeductible, getAllDeductibles, getDeductibleById, updateDeductible, deleteDeductible } from "../controllers/deductibleController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const deductibleRouter = Router();

deductibleRouter.post('/', authMiddleware, roleMiddleware("admin"), addDeductible);
deductibleRouter.get('/', authMiddleware, getAllDeductibles);
deductibleRouter.get('/:id', authMiddleware, getDeductibleById);
deductibleRouter.put('/:id', authMiddleware, roleMiddleware("admin"), updateDeductible);
deductibleRouter.delete('/:id', authMiddleware, roleMiddleware("admin"), deleteDeductible);

export default deductibleRouter;