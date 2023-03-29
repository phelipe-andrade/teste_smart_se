import jwt from 'jsonwebtoken';
import { AppError } from "../errors/AppError.js";
const secretKey = process.env.JWT_SECRET || 'defaultSecret';
export default class Authentication {
    static required(req, res, next) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token)
                throw new AppError("Token inválido ou não enviado");
            const decode = jwt.verify(token, secretKey);
            if (decode.id)
                req.id = decode.id;
            next();
        }
        catch (error) {
            throw new AppError("Token inválido ou não enviado", 401);
        }
    }
    ;
}
//# sourceMappingURL=Authentication.js.map