import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#1976d2', pt: 4, pb: 2, color: "#fff" }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom
        sx={{color: 'inherit'}}
        >
          | CAR |
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p" sx={{color: "#fff"}}>
          CAR | Todos os direitos reservados.
        </Typography>
      </Container>
    </Box>
  );
};