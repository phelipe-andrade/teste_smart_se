import { Router } from "express";
import { userRoutes } from "./user.routes.js";
import { vehicleRoutes } from "./vehicle.routes.js";
import { supplyRoutes } from "./supply.router.js";
import { detailsRoutes } from "./details.router.js";
import authentication from "../middlewares/Authentication.js";
const routes = Router();
routes.use("/users", userRoutes);
routes.use("/vehicle", authentication.required, vehicleRoutes);
routes.use("/supply", authentication.required, supplyRoutes);
routes.use("/details", authentication.required, detailsRoutes);
routes.use((req, res, next) => {
    res.status(404).send({ message: 'Rota inválida' });
    next();
});
export default routes;
//# sourceMappingURL=index.js.map