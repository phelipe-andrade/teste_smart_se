import { Router } from "express";
import supplyController from "../controllers/supply/supplyController.js";
import validateFields from "../middlewares/ValidateFields.js";

const supplyRoutes = Router();

supplyRoutes.post("/", validateFields, supplyController.create);
supplyRoutes.get("/", supplyController.getAll);
supplyRoutes.get("/:id", supplyController.getSuppply);
supplyRoutes.patch("/", supplyController.update);
supplyRoutes.delete("/:id", supplyController.delete);

export {supplyRoutes};