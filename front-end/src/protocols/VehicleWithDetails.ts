import { IHistorySupply } from "./HistorySupply";
import { InfosDataVehicleList } from "./InfosDataVehicleList";

export interface VehicleWithDetails extends InfosDataVehicleList {
  supplies: IHistorySupply[];
}