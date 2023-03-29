import { Router } from "express";
import { CreateUserController } from "../controllers/user/CreateUserController.js";
const createUserController = new CreateUserController();
const userRoutes = Router();
userRoutes.post("/", createUserController.handle);
export { userRoutes };
//# sourceMappingURL=user.routes%20copy.js.map