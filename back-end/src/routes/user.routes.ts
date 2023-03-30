import { Router } from "express";
import  userController from "../controllers/user/UserController.js";

const userRoutes = Router();

userRoutes.post("/register", userController.register);
userRoutes.post("/token" ,userController.token);

export {userRoutes};