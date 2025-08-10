import { Router } from "express";
import { addCarPart, getAllCarParts, getCarPartById, updateCarPart, deleteCarPart } from "../controllers/carPartController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const carPartsRouter = Router();

carPartsRouter.post('/', authMiddleware, addCarPart);
carPartsRouter.get('/', authMiddleware, getAllCarParts);
carPartsRouter.get('/:id', authMiddleware, getCarPartById);
carPartsRouter.put('/:id', authMiddleware, updateCarPart);
carPartsRouter.delete('/:id', authMiddleware, deleteCarPart);
export default carPartsRouter;  