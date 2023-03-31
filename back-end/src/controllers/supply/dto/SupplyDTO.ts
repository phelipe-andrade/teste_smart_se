export interface SupplyDTO {
  qtd: number;
  type_fuel: string;
  value: number;
}

export interface GetSupplyDTO extends SupplyDTO {
  created_at: Date;
}


export interface CreateSupplyDTO extends SupplyDTO {
  vehiclePlate: string;
}

export interface UpdateSupplyDTO extends SupplyDTO {
  id: number;
}