import { Router } from 'express';

import {
  createCar,               
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  getAllCarsForCustomer
} from '../controllers/carController';

const carRouter = Router();

carRouter.post('/', createCar);
carRouter.get('/', getAllCars);
carRouter.get('/:id', getCarById);
carRouter.get('/customer/:customerid', getAllCarsForCustomer);
carRouter.put('/:id', updateCar);
carRouter.delete('/:id', deleteCar);

export default carRouter;