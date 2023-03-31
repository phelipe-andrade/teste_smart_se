import RegisterSupplyPage from "@/container/SupplyRegisterPage";
import Authentication from "@/helper/Authentication";

export default function RegisterSupply() {
    return <Authentication> <RegisterSupplyPage/> </Authentication>
}