import { AppError } from "../errors/AppError.js";
import validateCPF from "../helper/validateCPF.js";
import { prisma } from "../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
class ServiceUser {
    async create({ cpf, password }) {
        const { valid: isValid, value: validCPF } = validateCPF(cpf);
        if (!isValid)
            throw new AppError("CPF informado inválido.");
        const passwordHash = bcrypt.hashSync(password, 10);
        const userAlreadyExists = await prisma.user.findUnique({ where: { cpf: validCPF } });
        if (userAlreadyExists)
            throw new AppError("Usuário já existe!");
        const user = await prisma.user.create({
            data: { cpf: validCPF, password: passwordHash },
            select: { id: true, cpf: true }
        });
        return user;
    }
    async token({ cpf, password }) {
        const { valid: isValid, value: validCPF } = validateCPF(cpf);
        if (!isValid)
            throw new AppError("CPF informado inválido.");
        const user = await prisma.user.findUnique({ where: { cpf: validCPF } });
        if (!user)
            throw new AppError("Usuário não encontrado ou não cadastrado.");
        const userValid = bcrypt.compareSync(password, user.password);
        if (!userValid)
            throw new AppError("CPF e/ou senha esta(ão) incorreto(s).");
        const secretKey = process.env.JWT_SECRET || 'defaultSecret';
        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1d' });
        return token;
    }
}
export default new ServiceUser();
//# sourceMappingURL=ServiceUser.js.map