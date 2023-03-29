import jwt from 'jsonwebtoken';
import { AppError } from "../errors/AppError.js";
const secretKey = process.env.JWT_SECRET || 'defaultSecret';
export function loginRequired(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        throw new AppError("Token inválido ou não enviado");
    const decode = jwt.verify(token, secretKey);
    req.body = decode;
    next();
}
;
//# sourceMappingURL=login.js.map