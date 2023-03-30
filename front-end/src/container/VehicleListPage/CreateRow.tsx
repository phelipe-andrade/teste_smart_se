import * as React from 'react';
import { IconButton, TableCell, TableRow } from '@mui/material';
import TableDetails from '@/components/TableDetails';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { InfosDataVehicleList } from '@/protocols/InfosDataVehicleList';
import { IHistorySupply } from '@/protocols/HistorySupply';


export default function CreateRow(props: { row: InfosDataVehicleList, cols: number}) {
    const { row, cols } = props;  
    const [open, setOpen] = React.useState(false);

    const handleHistorySupply = () => {
        // Buscar no banco de dados 
    }

    const mockSupplies: IHistorySupply[] = [
      {qtd: 12.30, type_fuel: "alcool", value: 150, created_at: "2023-03-30T11:52:51.118Z"},
      {qtd: 12.30, type_fuel: "gasolina", value: 200, created_at: "2023-03-31T11:52:51.118Z"},
      {qtd: 12.30, type_fuel: "gasolina", value: 300, created_at: "2023-03-20T11:52:51.118Z"},
      {qtd: 12.30, type_fuel: "alcool", value: 50.10, created_at: "2023-03-19T11:52:51.118Z"},
      {qtd: 12.30, type_fuel: "alcool", value: 20, created_at: "2023-03-07T11:52:51.118Z"},
      {qtd: 12.30, type_fuel: "gasolina", value: 156.23, created_at: "2023-03-09T11:52:51.118Z"},
      {qtd: 12.30, type_fuel: "alcool", value: 200, created_at: "2023-03-03T11:52:51.118Z"},
    ]

    const titleDetails: string[] = ["Quantidade", "Combustível", "Valor (R$)", "Data"];
  
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
            {row.plate}
          </TableCell>
          <TableCell align="center">{row.renavam}</TableCell>
          <TableCell align="center">{row.color}</TableCell>
          <TableCell align="center">{row.power}</TableCell>
          <TableCell align="center">{row.model}</TableCell>
          <TableCell align="center">{row.brand}</TableCell>
          <TableCell align="center">{row.year_launch}</TableCell>
          <TableCell align="center">{row.state}</TableCell>
        </TableRow>
        <TableDetails  title='Abastecimentos' titleColumns={titleDetails} open={open} infos={mockSupplies} cols={cols}/>
      </React.Fragment>
  );
}