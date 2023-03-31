import { Supply, Vehicle } from "@prisma/client";
import { ReturnUserDTO } from "../../user/dto/UserDTO";
import { SupplyDTO } from "../../supply/dto/SupplyDTO";

export interface VehiclesWithSuppliesDTO extends Vehicle {
  supplies:{
    qtd: number;
    type_fuel: string;
    value: number;
    created_at: Date;
  }[];
}

export interface SupplyWithDetails {
  cpf: string;
  plate: string;
  renavam: string;
  model: string;
  brand: string;
  state: string;
}

export interface UserWithDetails extends ReturnUserDTO {
  supplies: Supply[];
  vehicles: Vehicle[];
}