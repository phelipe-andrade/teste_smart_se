import React, { useState, useMemo } from 'react';
import {Button, TextField, Typography} from '@mui/material';
import {StyledForm, StyledBoxInput} from '@/styles/stylesGlobal';
import { useDispatch, useSelector } from 'react-redux';
import validateCPF from '@/helper/validateCPF';
import useFetch from '@/helper/useFetch';
import { GET_TOKEN } from '@/api';
import { loginUser } from '@/store/user';
import Error from '@/components/Error';
import ButtonCustom from '@/components/ButtonCustom';
import { setLocalStorage } from '@/helper/localStorage';
import { useRouter } from 'next/router';
import { UserValidLogin } from '@/protocols/UserLogin';

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { login } = useSelector((state: UserValidLogin) => state.user);  

  const { loading, error, request, data } = useFetch<{token: string}>();
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [cpfError, setCpfError] = useState(false);
  const [passwordError, setPasswordError] = useState({value: false, text: ''});

  useMemo(() => {
    if (login) router.push("/vehicle/list")
  }, [login, router])

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cpfValue = event.target.value.replace(/\D/g, '');
    setCpf(cpfValue);    
    setCpfError(false);
  };

  const handleCpf = () => {
    const {valid, value} = validateCPF(cpf);
    if(!valid) setCpfError(true);
    else {
      setCpfError(false);
      setCpf(value);
    };
  }

  const handlePassword = () => {
    if(!password.length) setPasswordError({value: true, text: 'A senha deve ser inserida.'})
    else setPasswordError({value: false, text: ''});
  };

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    event.preventDefault();
    handlePassword();
    handleCpf();

    if (cpf.length && !passwordError.value) {
      const {url, options} = GET_TOKEN({cpf, password})
      const {response, json} = await request(url, options);    
      if(response && response.ok){
        dispatch(loginUser({login: true}));
        setLocalStorage('token', json.token);        
      }
    }
  };

  return (
    <StyledForm
      component="form"
    >
      <Typography sx={{my: 2}} variant="h4" gutterBottom>
        Login
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
          helperText={cpfError && "CPF passado está incorreto"}
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
          error={passwordError.value}
          helperText={passwordError.value && passwordError.text}
        />
        <ButtonCustom text='LOGIN' loading={loading} callback={handleSubmit}/>
      </StyledBoxInput>
      {error.value && <Error message={error.message}/>}
    </StyledForm>
  );
};
