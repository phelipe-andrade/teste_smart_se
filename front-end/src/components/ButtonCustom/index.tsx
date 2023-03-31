import {Button} from '@mui/material';

interface IButton{
  text: string;
  loading: boolean;
  callback: any;
}
export default function ButtonCustom(props: IButton) {
  const {callback ,loading, text} = props;
  return <>
        {
          loading ?
          <Button
          sx={{my: 2}}
          variant="contained"
          color="primary"
          disabled
        >
          Carregando...
        </Button>
          :
          <Button
          sx={{my: 2}}
          variant="contained"
          color="primary"
          onClick={callback}
        >
          {text}
        </Button>
        }
        
  </>
}