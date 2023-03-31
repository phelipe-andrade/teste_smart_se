import SupplyEditPage from "@/container/SupplyEditPage";
import { useRouter } from "next/router";

export default function SupplyEdit() {
    const router = useRouter();
    return <>
        {router.query.id && Number(router.query.id) ? 
        <SupplyEditPage id={Number(router.query.id)}/> 
        :     
        <p>Id do abastecimento não informada</p>
        }
    </>
}