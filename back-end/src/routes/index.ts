import { NextFunction, Request, Response, Router } from "express";
import { userRoutes } from "./user.routes.js";
import { vehicleRoutes } from "./vehicle.routes.js";
import { supplyRoutes } from "./supply.router.js";
import { detailsRoutes } from "./details.router.js";
import authentication from "../middlewares/Authentication.js";
import ValidateFields from "../middlewares/ValidateFields.js";


const routes = Router();
routes.use("/users", ValidateFields, userRoutes);
routes.use("/vehicle", authentication.required, vehicleRoutes);
routes.use("/supply", authentication.required, supplyRoutes);
routes.use("/details", authentication.required, detailsRoutes);

routes.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({ message: 'Rota inválida' });
  next();
})

export default routes;