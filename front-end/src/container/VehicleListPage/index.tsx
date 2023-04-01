import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import {Table, TableBody, TableContainer, Paper, Button, Typography } from '@mui/material';
import CreateRow from './CreateRow';
import { InfosDataVehicleList } from '@/protocols/InfosDataVehicleList';
import TableHeaderCustom from '@/components/TableHeaderCustom';
import useFetch from '@/helper/useFetch';
import { GET_VEHICLE_LIST } from '@/api';
import { getLocalStorage } from '@/helper/localStorage';
import Error from '@/components/Error';

const titlesHead = [ "Placa", "Renavam", "Cor", "Potência", "Modelo", "Marca", "Ano", "Estado", "Editar", "Excluir"];

export default function VehicleList() {
  const router = useRouter();
  const [vehicleList, setVehicleList] = useState<InfosDataVehicleList[]>();
  const {loading, error, request} = useFetch<InfosDataVehicleList[]>();
  const [att, setAtt] = useState(false);

  useEffect(()=> {
    async function getVehicles() { 
      const token = getLocalStorage('token') as string;
      const {url, options} = GET_VEHICLE_LIST(token)
      const {response, json} = await request(url, options);    
      if(response && response.ok) setVehicleList(json);
    }

    getVehicles();
  },[request, att])

  if(loading) return <div>carregando...</div>;

  return (
    <>
      <Typography sx={{my: 3}} variant="h4" gutterBottom>
        Lista de Veículos
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHeaderCustom titlesHead={titlesHead}/>
          <TableBody>
            {vehicleList?.map((row, i) => (
              <CreateRow key={row.plate + i} row={row} cols={titlesHead.length + 2} att={att} setAtt={setAtt}/>
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
      {error.value && <Error message={error.message}/>}
    </>
  );
}