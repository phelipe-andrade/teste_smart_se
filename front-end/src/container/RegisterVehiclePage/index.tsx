import React, { useState } from 'react';
import { StyledBoxInput, StyledForm } from "@/styles/stylesGlobal";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { RegisterVehicle } from '@/protocols/RegisterVehicle';

export default function RegisterVehiclePage() {
  const [infosForm, setinfosForm] = useState<RegisterVehicle>({
    plate: '',
    renavam: '',
    color: '',
    power: null,
    model: '',
    brand: '',
    year_launch: null,
    state: '',
  });

  const [password, setPassword] = useState('');
  const [infosError, setInfosError] = useState(false);
  const [passwordError, setPasswordError] = useState({value: false, text: ''});

  const handleSubmit = () => {

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
              value={infosForm.plate}
              error={infosError}
              helperText={infosError && "Placa passado está incorreto"}
            />
            <TextField
              sx={{my: 1}}
              id="outlined-error-helper-text"
              label="Renavam"
              placeholder="Ex: 00000000000"
              type="tel"
              inputProps={{ inputMode: 'numeric', maxLength: 11 }}
              value={infosForm.renavam}
              error={infosError}
              helperText={infosError && "Informe um renavam"}
            />
            <TextField
              sx={{my: 1}}
              id="outlined-error-helper-text"
              label="Modelo"
              placeholder="Ex: Fusca"
              type="text"
              value={infosForm.model}
              error={infosError}
              helperText={infosError && "Informe um modelo"}
            />
            <TextField
              sx={{my: 1}}
              id="outlined-error-helper-text"
              label="Marca"
              placeholder="Ex: Volksvagem"
              type="text"
              value={infosForm.brand}
              error={infosError}
              helperText={infosError && "Informe uma marca"}
            />
            <TextField
              sx={{my: 1}}
              id="outlined-error-helper-text"
              label="Cor"
              placeholder="Ex: Preta"
              type="text"
              value={infosForm.color}
              error={infosError}
              helperText={infosError && "Placa passado está incorreto"}
            />
            <TextField
              sx={{my: 1}}
              id="outlined-error-helper-text"
              label="Potência"
              placeholder="Ex: 120"
              type="tel"
              inputProps={{ inputMode: 'numeric', maxLength: 11 }}
              value={infosForm.power}
              error={infosError}
              helperText={infosError && "Placa passado está incorreto"}
            />
            <TextField
              sx={{my: 1}}
              id="outlined-error-helper-text"
              label="Ano de lançamento"
              placeholder="Ex: 1990"
              type="tel"
              inputProps={{ inputMode: 'numeric', maxLength: 4 }}
              value={infosForm.year_launch}
              error={infosError}
              helperText={infosError && "Placa passado está incorreto"}
            />
            <TextField
              sx={{my: 1}}
              id="outlined-error-helper-text"
              label="Estado do veículo"
              placeholder="Ex: Novo"
              type="text"
              value={infosForm.state}
              error={infosError}
              helperText={infosError && "Placa passado está incorreto"}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Estado</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Age"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <Button
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