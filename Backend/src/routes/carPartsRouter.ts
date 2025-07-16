import { Router } from "express";
import { addCarPart, getAllCarParts, getCarPartById, updateCarPart, deleteCarPart } from "../controllers/carPartController";

const carPartsRouter = Router();

carPartsRouter.post('/',addCarPart);
carPartsRouter.get('/',getAllCarParts);
carPartsRouter.get('/:id',getCarPartById);
carPartsRouter.put('/:id',updateCarPart);
carPartsRouter.delete('/:id',deleteCarPart);

export default carPartsRouter;  