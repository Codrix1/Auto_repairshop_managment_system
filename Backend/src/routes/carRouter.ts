import { Router } from 'express';
import {
  createCar,               
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  getAllCarsForCustomer
} from '../controllers/carController';
import { authMiddleware } from '../middlewares/authMiddleWare';
import { roleMiddleware } from '../middlewares/roleMiddleware';

const carRouter = Router();

carRouter.post('/', authMiddleware, createCar);
carRouter.get('/', authMiddleware, getAllCars);
carRouter.get('/:id', authMiddleware, getCarById);
carRouter.get('/customer/:customerid', authMiddleware, getAllCarsForCustomer);
carRouter.put('/:id', authMiddleware, updateCar);
carRouter.delete('/:id', authMiddleware, deleteCar);

export default carRouter;