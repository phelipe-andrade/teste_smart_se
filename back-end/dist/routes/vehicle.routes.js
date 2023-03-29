import { Router } from "express";
import vehicleController from "../controllers/vehicle/VehicleController.js";
import validateFields from "../middlewares/ValidateFields.js";
const vehicleRoutes = Router();
vehicleRoutes.get("/", vehicleController.getAll);
vehicleRoutes.get("/:plate", vehicleController.getVehicle);
vehicleRoutes.post("/", validateFields, vehicleController.create);
vehicleRoutes.patch("/", vehicleController.update);
vehicleRoutes.delete("/:plate", vehicleController.delete);
export { vehicleRoutes };
//# sourceMappingURL=vehicle.routes.js.map