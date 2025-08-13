import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getUserById, loginUser, updateUser } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const userRouter = Router();

userRouter.get('/', authMiddleware, roleMiddleware('admin'), getAllUsers);
userRouter.get('/:id', authMiddleware, roleMiddleware('admin'), getUserById);
userRouter.post('/', authMiddleware, roleMiddleware('admin'), addUser);
userRouter.post('/login', loginUser);
userRouter.delete('/:id', authMiddleware, roleMiddleware('admin'), deleteUser);
userRouter.put('/:id', authMiddleware, roleMiddleware('admin'), updateUser);

export default userRouter;