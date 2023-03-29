import { AppError } from "../../errors/AppError.js";
import serviceDetails from "../../services/ServiceDetails.js";
class DetailsController {
    async vehicle(req, res) {
        const { plate } = req.params;
        if (!plate || typeof plate !== 'string')
            throw new AppError("Placa do veículo informado não esta correto.");
        const result = await serviceDetails.vehicleWithDetails(plate);
        return res.status(200).json(result);
    }
    async supply(req, res) {
        const id = Number(req.params.id);
        if (!id || typeof id !== 'number')
            throw new AppError("Id do abastecimento informado não está correto.");
        const result = await serviceDetails.supplyWithDetails(id);
        return res.status(200).json(result);
    }
    async user(req, res) {
        const id = Number(req.id);
        if (!id || typeof id !== 'number')
            throw new AppError("Id do usuário informado não está correto.");
        const result = await serviceDetails.userWithDetails(id);
        return res.status(200).json(result);
    }
}
export default new DetailsController();
//# sourceMappingURL=detailsController.js.map