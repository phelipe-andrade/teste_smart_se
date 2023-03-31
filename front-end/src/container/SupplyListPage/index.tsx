import {useEffect, useState} from 'react';
import {Table, TableBody, TableContainer, Paper, Button, Typography } from '@mui/material';
import CreateRow from './CreateRow';
import TableHeaderCustom from '@/components/TableHeaderCustom';
import { InfosDataSupplyList } from '@/protocols/InfosDataSupplyList';
import { useRouter } from 'next/router';
import { getLocalStorage } from '@/helper/localStorage';
import { GET_SUPPLY_LIST } from '@/api';
import useFetch from '@/helper/useFetch';
import Error from '@/components/Error';

const titlesHead = ["Id", "Quantidade", "Combustível", "Valor (R$)", "Data", "Editar", "Excluir"];

export default function SupplyListPage() {
  const router = useRouter();
  const [supplyList, setSupplyList] = useState<InfosDataSupplyList[]>([]);
  const {loading, error, request} = useFetch<InfosDataSupplyList[]>();
  const [att, setAtt] = useState(false);

  useEffect(()=> {
    async function getVehicles() { 
      const token = getLocalStorage('token') as string;
      const {url, options} = GET_SUPPLY_LIST(token)
      const {response, json} = await request(url, options);    
      if(response && response.ok) setSupplyList(json);      
    }
    
    getVehicles();
  },[request, att])

  if (loading) return <p>Carregando...</p>
  
  return (
    <>
      <Typography sx={{my: 3}} variant="h4" gutterBottom>
        Lista de Abastecimentos
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHeaderCustom titlesHead={titlesHead}/>
          <TableBody>
            {supplyList.map((row, i) => (
              <CreateRow key={i} row={row} cols={titlesHead.length + 2} att={att} setAtt={setAtt}/>
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
      {error.value && <Error message={error.message}/>}
    </>
  );
}


