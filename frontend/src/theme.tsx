import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#121212',
    },
    secondary: {
      main: '#FFD700',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#121212',
    },
  },
});


  

export default theme;