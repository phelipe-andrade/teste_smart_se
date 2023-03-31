import React, { useState } from 'react';
import { StyledBoxInput, StyledForm } from "@/styles/stylesGlobal";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { RegisterVehicle } from '@/protocols/RegisterVehicle';

export default function RegisterVehiclePage() {
  const [infos, setInfos] = useState<RegisterVehicle>({
    plate: '',
    renavam: '',
    model: '',
    brand: '',
    color: '',
    power: '',
    year_launch: '',
    state: ''
  })

  const [infosError, setInfosError] = useState(false);

  const handleField = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {

    
  }

  const handleSubmit = () => {
    console.log(infos);
    
  }
  
    return (
    <StyledForm
      component="form"
    >
      <Typography sx={{my: 2}} variant="h4" gutterBottom>
        Cadastre um veículo
      </Typography>
      <StyledBoxInput
      component="div"
      >
        <TextField
          sx={{my: 1}}
          id="outlined-error-helper-text"
          label="Placa"
          placeholder="Ex: XXX00X00"
          type="text"
          inputProps={{ inputMode: 'text', maxLength: 8 }}
          error={infosError}
          helperText={infosError && "Placa passado está incorreto"}
          value={infos.plate}
          onChange={(e) => setInfos({...infos, plate: e.target.value})}
        />
        <TextField
          sx={{my: 1}}
          id="outlined-error-helper-text"
          label="Renavam"
          placeholder="Ex: 00000000000"
          type="tel"
          inputProps={{ inputMode: 'numeric', maxLength: 11}}
          error={infosError}
          helperText={infosError && "Informe um renavam"}
          value={infos.renavam}
          onChange={(e) => setInfos({...infos, renavam: e.target.value.replace(/\D/g, '')})}
        />
        <TextField
          sx={{my: 1}}
          id="outlined-error-helper-text"
          label="Modelo"
          placeholder="Ex: Fusca"
          type="text"
          error={infosError}
          helperText={infosError && "Informe um modelo"}
          value={infos.model}
          onChange={(e) => setInfos({...infos, model: e.target.value})}
        />
        <TextField
          sx={{my: 1}}
          id="outlined-error-helper-text"
          label="Marca"
          placeholder="Ex: Volksvagem"
          type="text"
          error={infosError}
          helperText={infosError && "Informe uma marca"}
          value={infos.brand}
          onChange={(e) => setInfos({...infos, brand: e.target.value})}
        />
        <TextField
          sx={{my: 1}}
          id="outlined-error-helper-text"
          label="Cor"
          placeholder="Ex: Preta"
          type="text"
          error={infosError}
          helperText={infosError && "Placa passado está incorreto"}
          value={infos.color}
          onChange={(e) => setInfos({...infos, color: e.target.value})}
        />
        <TextField
          sx={{my: 1}}
          id="outlined-error-helper-text"
          label="Potência"
          placeholder="Ex: 120"
          type="tel"
          inputProps={{ inputMode: 'numeric', maxLength: 4 }}
          error={infosError}
          helperText={infosError && "Placa passado está incorreto"}
          value={infos.power}
          onChange={(e) => setInfos({...infos, power: e.target.value.replace(/\D/g, '')})}
        />
        <TextField
          sx={{my: 1}}
          id="outlined-error-helper-text"
          label="Ano de lançamento"
          placeholder="Ex: 1990"
          type="tel"
          inputProps={{ inputMode: 'numeric', maxLength: 4 }}
          error={infosError}
          helperText={infosError && "Placa passado está incorreto"}
          value={infos.year_launch}
          onChange={(e) => setInfos({...infos, year_launch: e.target.value.replace(/\D/g, '')})}
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
        <Button
        sx={{my: 2}}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Cadastrar
        </Button>
      </StyledBoxInput>
  
    </StyledForm>
  );
}