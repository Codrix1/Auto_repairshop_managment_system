import { Router } from "express";
import { addCarPart, getAllCarParts, getCarPartById, updateCarPart, deleteCarPart } from "../controllers/carPartController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const carPartsRouter = Router();

carPartsRouter.post('/', authMiddleware, roleMiddleware("admin"), addCarPart);
carPartsRouter.get('/', authMiddleware,getAllCarParts);
carPartsRouter.get('/:id', authMiddleware, getCarPartById);
carPartsRouter.put('/:id', authMiddleware, roleMiddleware("admin"), updateCarPart);
carPartsRouter.delete('/:id', authMiddleware, roleMiddleware("admin"), deleteCarPart);
export default carPartsRouter;