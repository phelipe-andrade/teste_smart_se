import { Request, Response } from "express";
import serviseUser from "../../services/ServiceUser.js";

class UserController {
    async register(req: Request, res: Response) {
        const {cpf, password} = req.body;        
        const result = await serviseUser.create({cpf, password});
        return res.status(201).json(result);
    }

    async token(req: Request, res: Response) {
        const {cpf, password} = req.body;        
        const result = await serviseUser.token({cpf, password});
        return res.status(201).json({token: result});
    }
}

export default new UserController();