export interface VehicleDTO {
  plate: string;
  renavam: string;
  color: string;
  power: number;
  model: string;
  brand: string;
  year_launch: number;
  state: string;
}

export interface CreateVehicleDTO extends VehicleDTO {
  
}

export interface UpdateVehicleDTO extends VehicleDTO {}
