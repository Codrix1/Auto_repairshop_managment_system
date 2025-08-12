import { Router } from "express";
import { addWork, getAllWorks, getWorkById, updateWork, deleteWork } from "../controllers/workController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const workRouter = Router();

workRouter.post('/', authMiddleware, roleMiddleware("admin"), addWork);
workRouter.get('/', authMiddleware, getAllWorks);
workRouter.get('/:id', authMiddleware, getWorkById);
workRouter.put('/:id', authMiddleware, roleMiddleware("admin"), updateWork);
workRouter.delete('/:id', authMiddleware, roleMiddleware("admin"), deleteWork);

export default workRouter;