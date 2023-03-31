import SupplyListPage from "@/container/SupplyListPage";
import Authentication from "@/helper/Authentication";

export default function SupplyList() {
    return <Authentication> <SupplyListPage/> </Authentication>
}