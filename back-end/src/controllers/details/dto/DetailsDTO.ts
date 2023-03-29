import { Supply, User, Vehicle } from "@prisma/client";
import { ReturnUserDTO } from "../../user/dto/UserDTO";

export interface VehiclesWithSuppliesDTO extends Vehicle {
  supplies: Supply[];
}

export interface SupplyWithDetails extends Supply {
  user: ReturnUserDTO;
  vehicle: Vehicle;
}

export interface UserWithDetails extends ReturnUserDTO {
  supplies: Supply[];
  vehicles: Vehicle[];
}