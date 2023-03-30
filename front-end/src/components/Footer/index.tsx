import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: '#1976d2', pt: 4, pb: 2 }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom
        sx={{color: 'inherit'}}
        >
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Place here any additional information you would like to include.
        </Typography>
      </Container>
    </Box>
  );
};