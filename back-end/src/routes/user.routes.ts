import { Router } from "express";
import  userController from "../controllers/user/UserController.js";
import ValidateFields from "../middlewares/ValidateFields.js";

const userRoutes = Router();

userRoutes.post("/register", ValidateFields, userController.register);
userRoutes.post("/token", ValidateFields, userController.token);
userRoutes.post("/token/valid" ,userController.tokenValid);

export {userRoutes};