import { AppError } from "../../errors/AppError.js";
import { prisma } from "../../prisma/client.js";
class ServiceUser {
    async create({ cpf, password }) {
        const userAlreadyExists = await prisma.user.findUnique({ where: { cpf } });
        if (userAlreadyExists) {
            throw new AppError("User already exists!");
        }
        const user = await prisma.user.create({
            data: {
                cpf,
                password
            }
        });
        return user;
    }
}
export default new ServiceUser();
//# sourceMappingURL=ServiceUser.js.map