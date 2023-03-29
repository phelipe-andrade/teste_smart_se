import { Router } from "express";
import detailsController from "../controllers/details/detailsController.js";
const detailsRoutes = Router();
detailsRoutes.get("/vehicle/:plate", detailsController.vehicle);
detailsRoutes.get("/supply/:id", detailsController.supply);
detailsRoutes.get("/user/", detailsController.user);
export { detailsRoutes };
//# sourceMappingURL=details.router.js.map