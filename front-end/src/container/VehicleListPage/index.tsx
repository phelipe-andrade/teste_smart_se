import * as React from 'react';
import { useRouter } from 'next/router';
import {Table, TableBody, TableContainer, Paper, Button, Typography } from '@mui/material';
import CreateRow from './CreateRow';
import { InfosDataVehicleList } from '@/protocols/InfosDataVehicleList';
import TableHeaderCustom from '@/components/TableHeaderCustom';


const rows: InfosDataVehicleList[] = [
  {plate: 'dfr05s65', renavam: '01234567891', color: 'braco', power: 120, model: 'fusca', brand: 'volks', year_launch: 1990, state: 'usado'},
  {plate: 'czr05s65', renavam: '01234567891', color: 'braco', power: 120, model: 'fusca', brand: 'volks', year_launch: 1990, state: 'usado'},
  {plate: 'err05s65', renavam: '01234567891', color: 'braco', power: 120, model: 'fusca', brand: 'volks', year_launch: 1990, state: 'usado'},
  {plate: 'hyr05s65', renavam: '01234567891', color: 'braco', power: 120, model: 'fusca', brand: 'volks', year_launch: 1990, state: 'usado'},
  {plate: 'qwr05s65', renavam: '01234567891', color: 'braco', power: 120, model: 'fusca', brand: 'volks', year_launch: 1990, state: 'usado'},
  {plate: 'vfr05s65', renavam: '01234567891', color: 'braco', power: 120, model: 'fusca', brand: 'volks', year_launch: 1990, state: 'usado'}
];

const titlesHead = [ "Placa", "Renavam", "Cor", "Potência", "Modelo", "Marca", "Ano", "Estado", "Editar", "Excluir"];

export default function VehicleList() {
  const router = useRouter();

  return (
    <>
      <Typography sx={{my: 3}} variant="h4" gutterBottom>
        Lista de Veículos
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHeaderCustom titlesHead={titlesHead}/>
          <TableBody>
            {rows.map((row, i) => (
              <CreateRow key={row.plate + i} row={row} cols={titlesHead.length + 2}/>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
     <Button
        sx={{my: 3}}
        variant="contained"
        color="primary"
        onClick={() => router.push('/vehicle/register')}
      >
        Cadastrar novo veículo
      </Button>
    </>
  );
}