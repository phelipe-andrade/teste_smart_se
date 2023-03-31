import VehicleEditPage from "@/container/VehicleEditPage"
import Authentication from "@/helper/Authentication";
import { useRouter } from "next/router"

export default function VehicleEdit() {
    const router = useRouter();
    return (
        <Authentication>
            <>
                {router.query.plate ? 
                <VehicleEditPage plate={router.query.plate}/> 
                :     
                <p>Placa não informada</p>
                }
            </>
        </Authentication>  
    )
}
