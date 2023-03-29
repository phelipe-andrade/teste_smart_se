import { Request, Response } from "express";
import { AppError } from "../../errors/AppError.js";
import { RequestWithUserId } from "../../protocols/ResquestWithUserId.js";
import serviseVehicle from "../../services/ServiceVehicle.js";

class VehicleController {
  async getAll(req: Request, res: Response){
    const result = await serviseVehicle.getAllVehicle();
    return res.status(200).json(result);
  }

  async getVehicle(req: Request, res: Response) {
    const {plate} = req.params;   
    if(!plate || typeof plate !== 'string') throw new AppError("Placa do veículo informado não esta correto.");
    const result = await serviseVehicle.getVehicle(plate);
    return res.status(200).json(result);
  }

  async create(req: RequestWithUserId, res: Response) {
    const {body, id} = req;
    if(!id) throw new AppError("Problema na autenticação.")
    const result = await serviseVehicle.create(body, id);
    return res.status(201).json(result);
  }

  async update(req: Request, res: Response) {
    const vehicle = req.body;
    const result = await serviseVehicle.update(vehicle);
    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const {plate} = req.params;
    if(!plate || typeof plate !== 'string') throw new AppError("Placa do veículo informado não esta correto");
    const result = await serviseVehicle.delete(plate);
    return res.status(200).json(result);
  }
}

export default new VehicleController();