import VehiclePage from "@/container/VehicleListPage";
import Authentication from "@/helper/Authentication";

export default function VehicleList() {
    return <Authentication> <VehiclePage/></Authentication>
}