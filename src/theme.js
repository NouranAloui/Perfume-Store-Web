
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // default MUI blue
    },
    secondary: {
      main: '#dc004e', // example pink
    },
    background: {
      default: '#2EC4B6',
      paper: '#292F36',
    },
    text: {
      primary: '#fff',
      suger : '#F8F0EB'
    },
    
  },
});

export default theme;