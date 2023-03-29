import { AppError } from "../errors/AppError.js";
import { prisma } from "../prisma/client.js";
import checkPlate from "../helper/checkPlate.js";
class ServiceDetails {
    async vehicleWithDetails(plate) {
        checkPlate(plate);
        const vehicleWithSupplies = await prisma.vehicle.findUnique({ where: { plate }, include: { supplies: true } });
        if (!vehicleWithSupplies)
            throw new AppError(`Não existe nenhum veículo cadastrado com a placa de n°: ${plate}`);
        return vehicleWithSupplies;
    }
    async supplyWithDetails(id) {
        const supplyWithDetails = await prisma.supply.findUnique({
            where: { id },
            include: {
                user: {
                    select: { id: true, cpf: true }
                },
                vehicle: true
            }
        });
        if (!supplyWithDetails)
            throw new AppError(`Não existe nenhum abastecimento cadastrado com o id de n°: ${id}`);
        return supplyWithDetails;
    }
    async userWithDetails(id) {
        const userWithDetails = await prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                cpf: true,
                supplies: true,
                vehicles: true
            }
        });
        if (!userWithDetails)
            throw new AppError(`Não existe nenhum usuário cadastrado com CPF n°: ${id}`);
        return userWithDetails;
    }
}
export default new ServiceDetails();
//# sourceMappingURL=ServiceDetails.js.map