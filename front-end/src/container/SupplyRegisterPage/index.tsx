import { useState } from "react"
import { RegisterSupply } from "@/protocols/RegisterSupply"
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { StyledBoxInput, StyledForm } from "@/styles/stylesGlobal";

export default function RegisterSupplyPage() {
    const [infos, setInfos] = useState<RegisterSupply>({
        qtd: null,
        type_fuel: '',
        value: null,
        vehiclePlate: ''
    })

    const [infosError, setInfosError] = useState(false);

    const handleSubmit = () => {
        console.log(infos);
        
    }
    
    return (
    <StyledForm
      component="form"
    >
      <Typography sx={{my: 2}} variant="h4" gutterBottom>
        Cadastre um abastecimento
      </Typography>
      <StyledBoxInput
      component="div"
      >
        <TextField
          sx={{my: 1}}
          id="outlined-error-helper-text"
          label="Quantidade"
          placeholder="Ex: 100"
          type="tel"
          inputProps={{ inputMode: 'numeric', maxLength: 11}}
          error={infosError}
          helperText={infosError && "Informe um renavam"}
          value={infos.qtd}
          onChange={(e) => setInfos({...infos, qtd: Number(e.target.value.replace(/\D/g, ''))})}
        />
       
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Combutível</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={infos.type_fuel}
            label="Combutível"
            onChange={(e) => setInfos({...infos, type_fuel: e.target.value})}
          >
            <MenuItem value={"GASOLINA"}>Gasolina</MenuItem>
            <MenuItem value={"ETANOL"}>Etanol</MenuItem>
            <MenuItem value={"DIESEL"}>Diesel</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{my: 1}}
          id="outlined-error-helper-text"
          label="Valor (R$)"
          placeholder="Ex: 100"
          type="tel"
          inputProps={{ inputMode: 'numeric', maxLength: 6}}
          error={infosError}
          helperText={infosError && "Informe um renavam"}
          value={infos.value}
          onChange={(e) => setInfos({...infos, value: Number(e.target.value.replace(/\D/g, ''))})}
        />

        <TextField
          sx={{my: 1}}
          id="outlined-error-helper-text"
          label="Placa"
          placeholder="Ex: XXX00X00"
          type="text"
          inputProps={{ inputMode: 'text', maxLength: 8 }}
          error={infosError}
          helperText={infosError && "Placa passado está incorreto"}
          value={infos.vehiclePlate}
          onChange={(e) => setInfos({...infos, vehiclePlate: e.target.value})}
        />

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