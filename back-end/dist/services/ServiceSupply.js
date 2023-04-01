import { AppError } from "../errors/AppError.js";
import { prisma } from "../prisma/client.js";
import checkPlate from "../helper/checkPlate.js";
class ServiceSupply {
    async getAllSupplies() {
        return await prisma.supply.findMany({
            select: {
                id: true,
                qtd: true,
                type_fuel: true,
                value: true,
                created_at: true
            }
        });
    }
    async getSupply(id) {
        const supplyExists = await prisma.supply.findUnique({ where: { id } });
        if (!supplyExists)
            throw new AppError(`Não existe nenhum abastecimento cadastrado com o id de n°: ${id}`);
        return supplyExists;
    }
    async create(supply, id) {
        const { vehiclePlate } = supply;
        checkPlate(vehiclePlate);
        const userAlreadyExists = await prisma.user.findUnique({ where: { id } });
        if (!userAlreadyExists)
            throw new AppError("Usuário não cadastrado.");
        const vehicleAlreadyExists = await prisma.vehicle.findFirst({ where: { plate: { equals: vehiclePlate, mode: 'insensitive' } } });
        if (!vehicleAlreadyExists)
            throw new AppError(`Veículo com n° da placa: ${vehiclePlate.toLocaleUpperCase()} não está cadastrado.`);
        return await prisma.supply.create({ data: { ...supply, registered_by: id } })
            .then(() => ({ status: "success", message: "Abastecimento cadastrado com sucesso." }))
            .catch(() => { throw new AppError("Error ao cadastrar abastecimento."); });
    }
    async update(supply) {
        const { id } = supply;
        const supplyExists = await prisma.supply.findFirst({ where: { id } });
        if (!supplyExists)
            throw new AppError(`Abastecimento com id de n°: ${id} não encontrado.`);
        return await prisma.supply.update({
            where: { id },
            data: supply
        })
            .then(() => ({ status: "success", message: "Abastecimento atualizado com sucesso." }))
            .catch(() => { throw new AppError("Error ao atualizar abastecimento."); });
    }
    async delete(id) {
        const supplyExists = await prisma.supply.findUnique({ where: { id } });
        if (!supplyExists)
            throw new AppError(`Não existe nenhum abastecimento cadastrado com o id de n°: ${id}`);
        return await prisma.supply.delete({ where: { id } })
            .then(() => ({ status: "success", message: "Abastecimento deletado com sucesso." }))
            .catch(() => { throw new AppError("Error ao deletar abastecimento."); });
    }
}
export default new ServiceSupply();
//# sourceMappingURL=ServiceSupply.js.map