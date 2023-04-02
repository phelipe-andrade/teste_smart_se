import { useState , Fragment, Dispatch, SetStateAction} from 'react';
import { InfosDataSupplyList } from "@/protocols/InfosDataSupplyList";
import { IconButton, TableCell, TableRow } from '@mui/material';
import TableDetails from '@/components/TableDetails';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Link from 'next/link';
import useFetch from '@/helper/useFetch';
import { getLocalStorage } from '@/helper/localStorage';
import { DELETE_SUPPLY, GET_SUPPLY_DETAILS } from '@/api';
import { SupplyWithDetails } from '@/protocols/SupplyWithDetails';
import formatDate from '@/helper/formatDate';

export default function CreateRow(props: { row: InfosDataSupplyList, cols: number, setAtt: Dispatch<SetStateAction<boolean>>}) {
    const { row, cols, setAtt } = props;  
    const [open, setOpen] = useState(false);
    
    const [supplyDetails, setsupplyDetails] = useState<SupplyWithDetails>({
      cpf: '',
      plate: '',
      renavam: '',
      model: '',
      brand: '',
      state: ''
    });

    const {loading, data, error, request} = useFetch<SupplyWithDetails>();
    const token = getLocalStorage('token') as string;

    
    const handleHistorySupply = async () => {
      setOpen(!open);

      if(data) return;     
      const {url, options} = GET_SUPPLY_DETAILS(token, Number(row.id))
      const {response, json} = await request(url, options);              
      if(response && response.ok) setsupplyDetails(json);
      setAtt(false);
    }

    const deleteSupply = async (id: number) => {
      const result = confirm(`Deseja deletar o abastecimento com id de n°: ${id}`);
      if(!result) return;

      const {url, options} = DELETE_SUPPLY(token, id);
      const {response} = await request(url, options); 
      if(response && response.ok) setAtt(true);
    }

    const titleDetails: string[] = ["Cadastrado por(CPF) :", "Placa", "Renavam", "Modelo", "Marca", "Estado"];


    return (
      <Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleHistorySupply}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.id}
          </TableCell>
          <TableCell align="center">{row.qtd}</TableCell>
          <TableCell align="center">{row.type_fuel}</TableCell>
          <TableCell align="center">{row.value}</TableCell>
          <TableCell align="center">{formatDate(row.created_at)}</TableCell>
          <TableCell 
            align="center"
            sx={{cursor: 'pointer'}}
            >
            <Link href={`/supply/edit/${row.id}`}>
              <BorderColorIcon sx={{fontSize: 20, color: "black"}}/>
            </Link>
          </TableCell>
          <TableCell 
            align="center"
            sx={{cursor: 'pointer'}}
            onClick={() => deleteSupply(Number(row.id))}>
            <DeleteForeverIcon sx={{color: 'red'}}/>
          </TableCell>
        </TableRow>
        <TableDetails  title='Informações gerais:' titleColumns={titleDetails} open={open} infos={[supplyDetails]} cols={cols} loading={loading}/>
      </Fragment>
  );
}