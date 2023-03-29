import { AppError } from "../../errors/AppError.js";
import serviseVehicle from "./ServiceVehicle.js";
class VehicleController {
    async getAll(req, res) {
        const result = await serviseVehicle.getAllVehicle();
        return res.status(200).json(result);
    }
    async getVehicle(req, res) {
        const { plate } = req.params;
        if (!plate || typeof plate !== 'string')
            throw new AppError("Placa do veículo informado não esta correto");
        const result = await serviseVehicle.getVehicle(plate);
        return res.status(200).json(result);
    }
    async create(req, res) {
        const { body, id } = req;
        if (!id)
            throw new AppError("Problema na autenticação.");
        const result = await serviseVehicle.create(body, id);
        return res.status(201).json({ status: "success", message: result });
    }
    async update(req, res) {
        try {
            const vehicle = req.body;
            const result = await serviseVehicle.update(vehicle);
            return res.status(200).json({ status: "success", message: result });
        }
        catch (error) {
            throw new AppError("Erro ao atualizar um veículo.");
        }
    }
    async delete(req, res) {
        const { plate } = req.query;
        if (!plate || typeof plate !== 'string')
            throw new AppError("Placa do veículo informado não esta correto");
        const result = await serviseVehicle.delete(plate);
        return res.status(200).json({ status: "success", message: result });
    }
}
export default new VehicleController();
//# sourceMappingURL=VehicleController.js.map