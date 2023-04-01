import { UserValidLogin } from '@/protocols/UserLogin';
import { Button, Typography, Box} from '@mui/material';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function HomePage() {
  const {login} = useSelector((state: UserValidLogin) => state.user);
  const router = useRouter();
  return (
    <Box
      component="div"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5px"
      }}
    >
      <Typography sx={{my: 2}} variant="h4" component="h1" gutterBottom>
        Bem-vindo
      </Typography>
      {
      login ? 
        <>
          <Button
            sx={{my: 1}}
            variant="contained"
            color="primary"
            onClick={() => router.push('/vehicle/list')}
          >
            Lista de veículo
          </Button>
          <Button
            sx={{my: 1}}
            variant="contained"
            color="primary"
            onClick={() => router.push('/supply/list')}
          >
          Lista de Abastecimentos
          </Button>
        </>
        :
        <>
        <Button
          sx={{my: 1}}
          variant="contained"
          color="primary"
          onClick={() => router.push('/users/login')}
        >
          Login
        </Button>
        <Button
          sx={{my: 1}}
          variant="contained"
          color="primary"
          onClick={() => router.push('/users/register')}
        >
          Cadastre-se
        </Button>
        </>
      }
    </Box>
    
  )
}
