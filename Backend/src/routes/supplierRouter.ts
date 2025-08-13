import { Router } from "express";
import {
  addSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
} from "../controllers/supplierController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const supplierRouter = Router();

// List and get by id
supplierRouter.get("/", authMiddleware, getAllSuppliers);
supplierRouter.get("/:id", authMiddleware, getSupplierById);

// Create and update (admin only)
supplierRouter.post("/", authMiddleware, roleMiddleware('admin'), addSupplier);
supplierRouter.put(
  "/:id",
  authMiddleware, roleMiddleware('admin'),
  updateSupplier
);

export default supplierRouter;


