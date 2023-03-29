import { AppError } from "../../errors/AppError.js";
import { prisma } from "../../prisma/client.js";
import checkPlate from "../../helper/checkPlate.js";
class ServiceVehicle {
    async getAllVehicle() {
        const allVehicle = await prisma.vehicle.findMany();
        return allVehicle;
    }
    async getVehicle(plate) {
        checkPlate(plate);
        const vehicleExists = await prisma.vehicle.findUnique({ where: { plate } });
        if (!vehicleExists)
            throw new AppError(`Não existe nenhum veículo cadastrado com a placa de n°: ${plate}`);
        return vehicleExists;
    }
    async getVehicleWithSupply(plate) {
        checkPlate(plate);
        const vehicleWithSupplies = await prisma.vehicle.findUnique({ where: { plate }, include: { supplies: true } });
        if (!vehicleWithSupplies)
            throw new AppError(`Não existe nenhum veículo cadastrado com a placa de n°: ${plate}`);
        return vehicleWithSupplies;
    }
    async create(vehicle, id) {
        const { plate } = vehicle;
        checkPlate(plate);
        const userAlreadyExists = await prisma.user.findUnique({ where: { id } });
        if (!userAlreadyExists)
            throw new AppError("Usuário não cadastrado.");
        const vehicleAlreadyExists = await prisma.vehicle.findFirst({ where: { plate: { equals: plate, mode: 'insensitive' } } });
        if (vehicleAlreadyExists)
            throw new AppError(`Veículo com n° da placa: ${plate} já cadastrado.`);
        return await prisma.vehicle.create({ data: { ...vehicle, registered_by: id } })
            .then(() => ({ status: "success", message: "Veículo cadastrado com sucesso." }))
            .catch(() => { throw new AppError("Error ao cadastrar veículo."); });
    }
    async update(vehicle) {
        const { plate } = vehicle;
        checkPlate(plate);
        const vehicleExists = await prisma.vehicle.findFirst({ where: { plate: { equals: plate, mode: 'insensitive' } } });
        if (!vehicleExists)
            throw new AppError(`Veículo com n° da placa: ${plate} não encontrado.`);
        return await prisma.vehicle.update({
            where: { plate: vehicle.plate },
            data: vehicle
        })
            .then(() => ({ status: "success", message: "Veículo atualizado com sucesso." }))
            .catch(() => { throw new AppError("Error ao atualizar veículo."); });
    }
    async delete(plate) {
        const vehicleExists = await prisma.vehicle.findUnique({ where: { plate } });
        if (!vehicleExists)
            throw new AppError(`Não existe nenhum veículo cadastrado com a placa de n°: ${plate}`);
        return await prisma.vehicle.delete({ where: { plate } })
            .then(() => ({ status: "success", message: "Veículo deletado com sucesso." }))
            .catch(() => { throw new AppError("Error ao deletar veículo."); });
    }
}
export default new ServiceVehicle();
//# sourceMappingURL=ServiceVehicle.js.map