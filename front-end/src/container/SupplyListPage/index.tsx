import * as React from 'react';
import {Table, TableBody, TableContainer, Paper, Button } from '@mui/material';
import CreateRow from './CreateRow';
import TableHeaderCustom from '@/components/TableHeaderCustom';
import { InfosDataSupplyList } from '@/protocols/InfosDataSupplyList';
import { useRouter } from 'next/router';

const rows: InfosDataSupplyList[] = [
  {id: 1, qtd: 12.30, type_fuel: "alcool", value: 150, created_at: "2023-03-30T11:52:51.118Z"},
  {id: 2, qtd: 12.30, type_fuel: "gasolina", value: 200, created_at: "2023-03-31T11:52:51.118Z"},
  {id: 3, qtd: 12.30, type_fuel: "gasolina", value: 300, created_at: "2023-03-20T11:52:51.118Z"},
  {id: 4, qtd: 12.30, type_fuel: "alcool", value: 50.10, created_at: "2023-03-19T11:52:51.118Z"},
  {id: 5, qtd: 12.30, type_fuel: "alcool", value: 20, created_at: "2023-03-07T11:52:51.118Z"},
  {id: 6, qtd: 12.30, type_fuel: "gasolina", value: 156.23, created_at: "2023-03-09T11:52:51.118Z"},
  {id: 7, qtd: 12.30, type_fuel: "alcool", value: 200, created_at: "2023-03-03T11:52:51.118Z"},
   
];

const titlesHead = ["Id", "Quantidade", "Combustível", "Valor (R$)", "Data"];

export default function SupplyListPage() {
  const router = useRouter();

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHeaderCustom titlesHead={titlesHead}/>
          <TableBody>
            {rows.map((row, i) => (
              <CreateRow key={row.id + i} row={row} cols={titlesHead.length + 1}/>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        sx={{my: 3}}
        variant="contained"
        color="primary"
        onClick={() => router.push('/supply/register')}
      >
        Cadastrar novo abastecimento
      </Button>
    </>
  );
}


