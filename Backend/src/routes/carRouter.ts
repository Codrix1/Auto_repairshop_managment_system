import { Router } from 'express';

import {
  createCar,               
  getAllCars,
  getCarById,
  updateCar,
  deleteCar
} from '../controllers/carController';

const carRouter = Router();

carRouter.post('/', createCar);
carRouter.get('/', getAllCars);
carRouter.get('/:id', getCarById);
carRouter.put('/:id', updateCar);
carRouter.delete('/:id', deleteCar);

export default carRouter;