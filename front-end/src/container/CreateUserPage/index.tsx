import React, { useState } from 'react';
import {Button, TextField, Typography} from '@mui/material';
import {StyledForm, StyledBoxInput} from '@/styles/stylesGlobal';
import { CREATE_USER } from '@/api';
import useFetch from '@/helper/useFetch';
import { useRouter } from 'next/router';
import Error from '@/components/Error';
import ButtonCustom from '@/components/ButtonCustom';

export default function LoginForm() {
  const router = useRouter();
  const { loading, error, request } = useFetch<{token: string}>();
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


  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    event.preventDefault();
    handlePassword();
    handleCpf();

    if (cpf.length && !passwordError.value) {
      const {url, options} = CREATE_USER({cpf, password})
      const {response} = await request(url, options);    
      if(response && response.ok) router.push("/users/login");
    }
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
          id="cpf"
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
          id="senha"
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
          id="rsenha"
          label="Repita a senha"
          placeholder="*********"
          type="password"
          onChange={(event) => setRepeatPassword(event.target.value)}
          onBlur={handlePassword}
          error={passwordError.value}
          helperText={passwordError.value && passwordError.text}
        />
        <ButtonCustom text='Criar usuário' loading={loading} callback={handleSubmit}/>
      </StyledBoxInput>
      {error.value && <Error message={error.message}/>}
    </StyledForm>
  );
};
