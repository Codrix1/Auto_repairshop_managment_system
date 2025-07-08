import { Router } from "express";
import { 
    addCustomer,
    deleteCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer
} from "../controllers/customerController";


const customerRouter = Router();


customerRouter.get('/', getAllCustomers);
customerRouter.get('/:id', getCustomerById);
customerRouter.post('/', addCustomer);
customerRouter.put('/:id', updateCustomer);
customerRouter.delete('/:id', deleteCustomer);

export default customerRouter;