import { AppError } from "../../errors/AppError.js";
import { prisma } from "../../prisma/client.js";
import validatePlate from "../../helper/validatePlate.js";
class ServiceVehicle {
    async getAllVehicle() {
        const allVehicle = await prisma.vehicle.findMany();
        return allVehicle;
    }
    async getVehicle(plate) {
        this.checkPlate(plate);
        const vehicleExists = await prisma.vehicle.findUnique({ where: { plate } });
        if (!vehicleExists)
            throw new AppError(`Não existe nenhum veículo cadastrado com a placa de n°: ${plate}`);
        return vehicleExists;
    }
    async create(vehicle, id) {
        const { plate } = vehicle;
        this.checkPlate(plate);
        const userAlreadyExists = await prisma.user.findUnique({ where: { id } });
        if (!userAlreadyExists)
            throw new AppError("Usuário não cadastrado.");
        const vehicleAlreadyExists = await prisma.vehicle.findFirst({ where: { plate: { equals: plate, mode: 'insensitive' } } });
        if (vehicleAlreadyExists)
            throw new AppError(`Veículo com n° da placa: ${plate} já cadastrado.`);
        return await prisma.vehicle.create({ data: { ...vehicle, registered_by: id } })
            .then(() => "Veículo cadastrado com sucesso.")
            .catch(() => "Error ao cadastrar veívulo.");
    }
    async update(vehicle) {
        const { plate } = vehicle;
        this.checkPlate(plate);
        const vehicleExists = await prisma.vehicle.findFirst({ where: { plate: { equals: plate, mode: 'insensitive' } } });
        if (!vehicleExists)
            throw new AppError(`Veículo com n° da placa: ${plate} não encontrado.`);
        return await prisma.vehicle.update({
            where: { plate: vehicle.plate },
            data: vehicle
        })
            .then(() => "Veículo atualizado com sucesso.")
            .catch(() => "Error ao atualizar veículo.");
    }
    async delete(plate) {
        const vehicleExists = await prisma.vehicle.findUnique({ where: { plate } });
        if (!vehicleExists)
            throw new AppError(`Não existe nenhum veículo cadastrado com a placa de n°: ${plate}`);
        return await prisma.vehicle.delete({ where: { plate } })
            .then(() => "Veículo apagado com sucesso.")
            .catch(() => "Error ao deletar veículo.");
    }
    checkPlate(plate) {
        const validPlate = validatePlate(plate);
        if (!validPlate)
            throw new AppError("Informações da placa estão erradas");
    }
}
export default new ServiceVehicle();
//# sourceMappingURL=ServiceVehicle.js.map