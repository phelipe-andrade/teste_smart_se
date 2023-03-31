import VehicleEditPage from "@/container/VehicleEditPage"
import { useRouter } from "next/router"

export default function VehicleEdit() {
    const router = useRouter();
    return <>
        {router.query.plate ? 
        <VehicleEditPage plate={router.query.plate}/> 
        :     
        <p>Placa não informada</p>
        }
    </>
}
