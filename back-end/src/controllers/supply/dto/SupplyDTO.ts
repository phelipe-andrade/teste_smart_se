export interface SupplyDTO {
  qtd: number;
  type_fuel: string;
  value: number;
  vehiclePlate: string;
}


export interface CreateSupplyDTO extends SupplyDTO {}

export interface UpdateSupplyDTO extends SupplyDTO {
  id: number;
}