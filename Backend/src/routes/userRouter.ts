import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getUserById, loginUser, updateUser } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleWare";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const userRouter = Router();

userRouter.get('/', authMiddleware, getAllUsers);
userRouter.get('/:id', authMiddleware, getUserById);
userRouter.post('/', addUser);
userRouter.post('/login', loginUser);
userRouter.delete('/:id', authMiddleware, deleteUser);
userRouter.put('/:id', authMiddleware, updateUser);

export default userRouter;