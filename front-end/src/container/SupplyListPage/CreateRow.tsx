import * as React from 'react';
import { InfosDataSupplyList } from "@/protocols/InfosDataSupplyList";
import { IconButton, TableCell, TableRow } from '@mui/material';
import TableDetails from '@/components/TableDetails';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Link from 'next/link';

export default function CreateRow(props: {row: InfosDataSupplyList, cols: number}) {
    const { row, cols } = props;  
    const [open, setOpen] = React.useState(false);
    
    const handleHistorySupply = () => {
        // Buscar no banco de dados 
    }

    const deleteSupply = (id: number) => {
      const result = confirm(`Deseja deletar o abastecimento com id de n°: ${id}`);
      if(result) console.log('apagou');      
    }

    const mockDetails = [
        {cpf: '02956328107', plate: "sfs25e96", renavam: "01234567891", model: "fusca", brand: "volks", state: "novo"}
    ];

    const titleDetails: string[] = ["Cadastrado por(CPF) :", "Placa", "Renavam", "Modelo", "Marca", "Estado"];


    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
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
          <TableCell align="center">{row.created_at}</TableCell>
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
        <TableDetails  title='Informações gerais:' titleColumns={titleDetails} open={open} infos={mockDetails} cols={cols}/>
      </React.Fragment>
  );
}