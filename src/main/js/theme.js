import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ff5100'
        },
        secondary: {
            main: '#ffd65a'
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#f5f5f5',
        }
    },
    typography: {
        subtitle1: {
            fontWeight: 600
        }
    }
});

export default theme;