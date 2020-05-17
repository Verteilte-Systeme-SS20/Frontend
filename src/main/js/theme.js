import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ff5100'
        },
        secondary: {
            main: '#ff8c00'
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#f5f5f5',
        }
    }
});

export default theme;