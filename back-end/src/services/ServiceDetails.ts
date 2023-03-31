import { Supply } from "@prisma/client";
import { AppError } from "../errors/AppError.js";
import { prisma } from "../prisma/client.js";
import { CreateSupplyDTO, UpdateSupplyDTO } from "../controllers/supply/dto/SupplyDTO.js";
import { ResultResponseMessage } from "../protocols/ResultResponseMessage.js";
import checkPlate from "../helper/checkPlate.js";
import { SupplyWithDetails, UserWithDetails, VehiclesWithSuppliesDTO } from "../controllers/details/dto/DetailsDTO.js";



class ServiceDetails {

  async vehicleWithDetails(plate: string): Promise<VehiclesWithSuppliesDTO> {
    checkPlate(plate);

    const vehicleWithSupplies = await prisma.vehicle.findUnique({
      where: {plate} , 
      include: {
        supplies: { 
          select: {
            qtd: true, 
            type_fuel: true, 
            value: true, 
            created_at: true
          }
        }
      }
    })

    if(!vehicleWithSupplies) throw new AppError(`Não existe nenhum veículo cadastrado com a placa de n°: ${plate}`);    
    return vehicleWithSupplies;
  }

  async supplyWithDetails(id: number): Promise<SupplyWithDetails> {
    const supplyWithDetails = await prisma.supply.findUnique({
      where: {id},
      include: {
        user: {
          select: { cpf: true}
        },
        vehicle: {
          select: { plate: true, renavam: true, model: true, brand: true, state: true}
        }
      }
    });
    if(!supplyWithDetails) throw new AppError(`Não existe nenhum abastecimento cadastrado com o id de n°: ${id}`); 
    return { ...supplyWithDetails.user, ...supplyWithDetails.vehicle};
  }

  async userWithDetails(id: number): Promise<UserWithDetails> {
    const userWithDetails = await prisma.user.findUnique({
      where: {id}, 
      select:{
        id: true,
        cpf: true,      
        supplies: true, 
        vehicles: true
      }
    })
    if(!userWithDetails) throw new AppError(`Não existe nenhum usuário cadastrado com CPF n°: ${id}`);    
    return userWithDetails;
  }
 
}

export default new ServiceDetails();