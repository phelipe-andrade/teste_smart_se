import { Vehicle } from "@prisma/client";
import { AppError } from "../errors/AppError.js";
import { prisma } from "../prisma/client.js";
import { CreateVehicleDTO, UpdateVehicleDTO } from "../controllers/vehicle/dto/VehicleDTO.js";
import { ResultResponseMessage } from "../protocols/ResultResponseMessage.js";
import checkPlate from "../helper/checkPlate.js";


class ServiceVehicle {

  async getAllVehicle(): Promise<Vehicle[]> {
    const allVehicle = await prisma.vehicle.findMany();
    return allVehicle;
  }

  async getVehicle(plate: string): Promise<Vehicle> {
    checkPlate(plate);
    const vehicleExists = await prisma.vehicle.findUnique({where: {plate}});
    
    if(!vehicleExists) throw new AppError(`Não existe nenhum veículo cadastrado com a placa de n°: ${plate.toLocaleUpperCase()}`);
    return vehicleExists;
  }

  async create(vehicle: CreateVehicleDTO, id: number): Promise<ResultResponseMessage> {    
    const {plate} = vehicle
    checkPlate(plate);

    const userAlreadyExists = await prisma.user.findUnique({where: {id}});   
    if(!userAlreadyExists) throw new AppError("Usuário não cadastrado.");
    
    const vehicleAlreadyExists = await prisma.vehicle.findFirst({ where: {plate: {equals: plate, mode:'insensitive'}} });      
    if(vehicleAlreadyExists) throw new AppError(`Veículo com n° da placa: ${plate.toLocaleUpperCase()} já cadastrado.`);
    
    return await prisma.vehicle.create({ data: {...vehicle, registered_by: id} })
    .then(() => ({status: "success", message:"Veículo cadastrado com sucesso."}))        
    .catch(() => {throw new AppError("Error ao cadastrar veículo.")});
  }

  async update(vehicle: UpdateVehicleDTO): Promise<ResultResponseMessage> {
    const {plate} = vehicle
    checkPlate(plate);  

    const vehicleExists = await prisma.vehicle.findFirst({ where: {plate: {equals: plate, mode:'insensitive'}} });      
    if(!vehicleExists) throw new AppError(`Veículo com n° da placa: ${plate.toLocaleUpperCase()} não encontrado.`);
    
    return await prisma.vehicle.update({
      where: { plate: vehicle.plate },
      data: vehicle 
    })
    .then(() => ({status: "success", message:"Veículo atualizado com sucesso."}))        
    .catch(() => {throw new AppError("Error ao atualizar veículo.")});
  }

  async delete(plate: string): Promise<ResultResponseMessage> {
    const vehicleExists = await prisma.vehicle.findUnique({where: {plate}});
    if(!vehicleExists) throw new AppError(`Não existe nenhum veículo cadastrado com a placa de n°: ${plate.toLocaleUpperCase()}`)

    await prisma.supply.deleteMany({where: {vehiclePlate: plate}});

    return await prisma.vehicle.delete({where: {plate}})
    .then(() => ({status: "success", message:"Veículo deletado com sucesso."}))        
    .catch((error) =>{throw new AppError("Error ao deletar veículo.")});
  }
}

export default new ServiceVehicle();