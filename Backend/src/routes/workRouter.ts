import { Router } from "express";
import { addWork, getAllWorks, getWorkById, updateWork, deleteWork } from "../controllers/workController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const workRouter = Router();

workRouter.post('/', authMiddleware, addWork);
workRouter.get('/', authMiddleware, getAllWorks);
workRouter.get('/:id', authMiddleware, getWorkById);
workRouter.put('/:id', authMiddleware, updateWork);
workRouter.delete('/:id', authMiddleware, deleteWork);

export default workRouter;