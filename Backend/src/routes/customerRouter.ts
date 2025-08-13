import { Router } from "express";
import { 
    addCustomer,
    deleteCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer
} from "../controllers/customerController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const customerRouter = Router();

customerRouter.get('/', authMiddleware, getAllCustomers);
customerRouter.get('/:id', authMiddleware, getCustomerById);
customerRouter.post('/', authMiddleware, addCustomer);
customerRouter.put('/:id', authMiddleware, updateCustomer);
customerRouter.delete('/:id', authMiddleware, roleMiddleware("admin"),deleteCustomer);

export default customerRouter;