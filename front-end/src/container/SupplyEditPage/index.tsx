import { UpdadeSupply } from "@/protocols/UpdateSupply";
import { StyledBoxInput, StyledForm } from "@/styles/stylesGlobal";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function SupplyEditPage(props: {id:number}) {
    const {id} = props;

    const [infos, setInfos] = useState<UpdadeSupply>({
        id: id,
        qtd: null,
        type_fuel: '',
        value: null,
        vehiclePlate: ''
    })

    useEffect(() => {
        // Pegar as informações do veiculo no db e setar o valor na variável;
        setInfos({
            id: id,
            qtd: 12,
            type_fuel: "GASOLINA",
            value: 125,
            vehiclePlate: "qwe12qw"
        })
    }, [])

    const handleSubmit = () => {
        // Quando atualizar o supply, tenho que verificar na api se
        // a placa enviada pelo formulário existe no db
    }
    return (
        <StyledForm
          component="form"
        >
          <Typography sx={{my: 2}} variant="h4" gutterBottom>
            Atualizar abastecimento
          </Typography>
          <StyledBoxInput
          component="div"
          >
            <TextField
              disabled
              sx={{my: 1, textAlign: 'center'}}
              id="outlined-error-helper-text"
              label="Id"
              placeholder="Ex: 100"
              type="text"
              value={infos.id}
            />

            <TextField
              sx={{my: 1, textAlign: 'center'}}
              id="outlined-error-helper-text"
              label="Quantidade"
              placeholder="Ex: 100"
              type="tel"
              inputProps={{ inputMode: 'numeric', maxLength: 6}}
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
              placeholder="Ex: 100.30"
              type="tel"
              inputProps={{ inputMode: 'numeric', maxLength: 6}}
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