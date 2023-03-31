import RegisterVehiclePage from "@/container/VehicleRegisterPage";
import Authentication from "@/helper/Authentication";

export default function RegisterVehicle() {
    return <Authentication><RegisterVehiclePage/></Authentication>
}