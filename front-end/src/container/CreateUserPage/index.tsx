import React, { useState } from 'react';
import {Button, TextField, Typography} from '@mui/material';
import {StyledForm, StyledBoxInput} from '@/styles/stylesGlobal';


export default function LoginForm() {

  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [cpfError, setCpfError] = useState(false);
  const [passwordError, setPasswordError] = useState({value: false, text: ''});

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cpfValue = event.target.value.replace(/\D/g, '');
    setCpf(cpfValue);    
    setCpfError(false);
  };

  const handleCpf = () => {
    if(cpf.length !== 11) setCpfError(true);
    else setCpfError(false);
  }

  const handlePassword = () => {
    
    if(!password.length || !repeatPassword.length) {
      setPasswordError({value: true, text: "A senha deve ser inserida."});
      return;
    }
    else setPasswordError({value: false, text: ''});
    
    if(password !== repeatPassword) setPasswordError({value: true, text: "As senhas devem ser iguais"});
    else setPasswordError({value: false, text: ''});
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    handlePassword();
    handleCpf();    
    if (cpf.length && !passwordError.value) console.log("Submit");
  };

  return (
    <StyledForm
      component="form"
    >
      <Typography sx={{my: 2}} variant="h4" gutterBottom>
        Cadastre-se
      </Typography>
      <StyledBoxInput
      component="div"
      
      >
        <TextField
          sx={{my: 1}}
          id="outlined-error-helper-text"
          label="CPF"
          placeholder="Ex: 00000000000"
          type="tel"
          inputProps={{ inputMode: 'numeric', maxLength: 11 }}
          value={cpf}
          onChange={handleCpfChange}
          error={cpfError}
          helperText={cpfError && "CPF passado esta incorreto"}
          onBlur={handleCpf}
        />
        <TextField
          sx={{my: 1}}
          id="outlined-error-helper-text"
          label="Senha"
          placeholder="*********"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          onBlur={handlePassword}
          error={passwordError.value}
          helperText={passwordError.value && passwordError.text}
        />
        <TextField
          sx={{my: 1}}
          id="outlined-error-helper-text"
          label="Repita a senha"
          placeholder="*********"
          type="password"
          onChange={(event) => setRepeatPassword(event.target.value)}
          onBlur={handlePassword}
          error={passwordError.value}
          helperText={passwordError.value && passwordError.text}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Criar usuário
        </Button>
      </StyledBoxInput>
      
    </StyledForm>
  );
};
