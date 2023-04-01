import { GET_VEHICLE, UPDATE_VEHICLE } from "@/api";
import ButtonCustom from "@/components/ButtonCustom";
import Error from "@/components/Error";
import { getLocalStorage } from "@/helper/localStorage";
import useFetch from "@/helper/useFetch";
import { RegisterVehicle } from "@/protocols/RegisterVehicle";
import { StyledBoxInput, StyledForm } from "@/styles/stylesGlobal";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function VehicleEditPage(props: {plate: any}) {
  const router = useRouter();
  const {plate} = props;
  const [infos, setInfos] = useState<RegisterVehicle>({
      plate: '',
      renavam: '',
      model: '',
      brand: '',
      color: '',
      power: undefined,
      year_launch: undefined,
      state: ''
  })

  const {loading, request, error} = useFetch<RegisterVehicle>();

  useEffect(() => {
    async function getVehicle() {      
      const token = getLocalStorage('token') as string;
      const {url, options} = GET_VEHICLE(token, plate)
      const {response, json} = await request(url, options);    
      if(response && response.ok) setInfos(json);
    }

    getVehicle();
  }, [plate, request])

  const handleSubmit = async () => {    
    const token = getLocalStorage('token') as string;
    const {url, options} = UPDATE_VEHICLE(token, infos)
    const {response} = await request(url, options);    
    if(response && response.ok) router.push("/vehicle/list");
  }

  if(loading) return <p>Carregando...</p>
  return  (
    <StyledForm
      component="form"
    >
      <Typography sx={{my: 2}} variant="h4" gutterBottom>
        Atualizar veículo
      </Typography>
      <StyledBoxInput
      component="div"
      >
        <TextField
          disabled
          sx={{my: 1}}
          id="placa"
          label="Placa"
          placeholder="Ex: XXX00X00"
          type="text"
          inputProps={{ inputMode: 'text', maxLength: 8 }}
          value={plate}
        />
        <TextField
          sx={{my: 1}}
          id="Renavam"
          label="Renavam"
          placeholder="Ex: 00000000000"
          type="tel"
          inputProps={{ inputMode: 'numeric', maxLength: 11}}
          value={infos.renavam}
          onChange={(e) => setInfos({...infos, renavam: e.target.value.replace(/\D/g, '')})}
        />
        <TextField
          sx={{my: 1}}
          id="Modelo"
          label="Modelo"
          placeholder="Ex: Fusca"
          type="text"
          value={infos.model}
          onChange={(e) => setInfos({...infos, model: e.target.value})}
        />
        <TextField
          sx={{my: 1}}
          id="Marca"
          label="Marca"
          placeholder="Ex: Volksvagem"
          type="text"
          value={infos.brand}
          onChange={(e) => setInfos({...infos, brand: e.target.value})}
        />
        <TextField
          sx={{my: 1}}
          id="Cor"
          label="Cor"
          placeholder="Ex: Preta"
          type="text"
          value={infos.color}
          onChange={(e) => setInfos({...infos, color: e.target.value})}
        />
        <TextField
          sx={{my: 1}}
          id="power"
          label="Potência"
          placeholder="Ex: 120"
          type="tel"
          inputProps={{ inputMode: 'numeric', maxLength: 4 }}
          value={infos.power}
          onChange={(e) => setInfos({...infos, power: Number(e.target.value.replace(/\D/g, ''))})}
        />
        <TextField
          sx={{my: 1}}
          id="year"
          label="Ano de lançamento"
          placeholder="Ex: 1990"
          type="tel"
          inputProps={{ inputMode: 'numeric', maxLength: 4 }}
          value={infos.year_launch}
          onChange={(e) => setInfos({...infos, year_launch: Number(e.target.value.replace(/\D/g, ''))})}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Estado</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={infos.state}
            label="Estado"
            onChange={(e) => setInfos({...infos, state: e.target.value})}
          >
            <MenuItem value={"NOVO"}>Novo</MenuItem>
            <MenuItem value={"SEMINOVO"}>Seminovo</MenuItem>
            <MenuItem value={"USADO"}>Usado</MenuItem>
          </Select>
        </FormControl>
        <ButtonCustom text='CADASTRAR' loading={loading} callback={handleSubmit}/>
      </StyledBoxInput>
      {error.value && <Error message={error.message}/>}
    </StyledForm>
  );
}