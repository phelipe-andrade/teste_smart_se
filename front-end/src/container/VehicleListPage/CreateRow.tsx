import {Fragment, useState, Dispatch, SetStateAction} from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import TableDetails from '@/components/TableDetails';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { InfosDataVehicleList } from '@/protocols/InfosDataVehicleList';
import { IHistorySupply } from '@/protocols/HistorySupply';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Link from 'next/link';
import { getLocalStorage } from '@/helper/localStorage';
import { DELETE_VEHICLE, GET_VEHICLE_DETAILS } from '@/api';
import useFetch from '@/helper/useFetch';
import { VehicleWithDetails } from '@/protocols/VehicleWithDetails';

export default function CreateRow(props: { row: InfosDataVehicleList, cols: number, att: boolean, setAtt: Dispatch<SetStateAction<boolean>>}) {
    const { row, cols, att, setAtt } = props;  
    const [open, setOpen] = useState(false);
    const [vehicleDetails, setVehicleDetails] = useState<IHistorySupply[]>([]);
    const {loading, error, request, data} = useFetch<VehicleWithDetails>();
    const token = getLocalStorage('token') as string;

    const handleHistoryVehicle = async () => {
      setOpen(!open);

      if(data) return;     
      const {url, options} = GET_VEHICLE_DETAILS(token, row.plate)
      const {response, json} = await request(url, options);              
      if(response && response.ok) setVehicleDetails(json.supplies);
      setAtt(false)      
    }

    const deleteVehicle = async (plate: string) => {
      const result = confirm(`Deseja deletar o veículo com placa de n°: ${plate}`);
      if(!result) return;

      const {url, options} = DELETE_VEHICLE(token, row.plate)
      const {response} = await request(url, options); 
      if(response && response.ok) setAtt(true);
    }

    const titleDetails: string[] = ["Quantidade", "Combustível", "Valor (R$)", "Data"];

    return (
      <Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleHistoryVehicle}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.plate}
          </TableCell>
          <TableCell align="center">{row.renavam}</TableCell>
          <TableCell align="center">{row.color}</TableCell>
          <TableCell align="center">{row.power}</TableCell>
          <TableCell align="center">{row.model}</TableCell>
          <TableCell align="center">{row.brand}</TableCell>
          <TableCell align="center">{row.year_launch}</TableCell>
          <TableCell align="center">{row.state}</TableCell>
          <TableCell 
            align="center"
            sx={{cursor: 'pointer'}}
            >
            <Link href={`/vehicle/edit/${row.plate}`}>
              <BorderColorIcon sx={{fontSize: 20, color: "black"}}/>
            </Link>
          </TableCell>
          <TableCell 
            align="center"
            sx={{cursor: 'pointer'}}
            onClick={() => deleteVehicle(row.plate)}>
            <DeleteForeverIcon sx={{color: 'red'}}/>
          </TableCell>
        </TableRow>
        <TableDetails title='Abastecimentos' titleColumns={titleDetails} open={open} infos={vehicleDetails} cols={cols} loading={loading}/>
      </Fragment>
  );
}