import { Request, Response } from "express";
import { AppError } from "../../errors/AppError.js";
import { RequestWithUserId } from "../../protocols/ResquestWithUserId.js";
import serviseSupply from "../../services/ServiceSupply.js";

class SupplyController {
  async getAll(req: Request, res: Response){
    const result = await serviseSupply.getAllSupplies();
    return res.status(200).json(result);
  }

  async getSuppply(req: Request, res: Response) {
    const id = Number(req.params.id);      
    if(!id || typeof id !== 'number') throw new AppError("Id do abastecimento informado não está correto.");
    const result = await serviseSupply.getSupply(id);
    return res.status(200).json(result);
  }
  
  async create(req: RequestWithUserId, res: Response) {
    const {body, id} = req;
    if(!id) throw new AppError("Problema na autenticação.")
    const result = await serviseSupply.create(body, id);
    return res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const supply = req.body;
    const result = await serviseSupply.update(supply);
    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id); 
    if(!id || typeof id !== 'number') throw new AppError("Id do abastecimento informado não está correto.");
    const result = await serviseSupply.delete(id);
    return res.status(200).json(result);
  }
}

export default new SupplyController();