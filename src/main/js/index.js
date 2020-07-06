import React from 'react';

import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import App from './views/app';
import theme from './theme';
import history from './state/history';

function Root() {
    return <Router history={history}>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </Router>
}

render(<Root/>, document.getElementById('react'));