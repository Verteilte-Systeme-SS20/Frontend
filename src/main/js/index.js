import React from 'react';

import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { Provider as ReduxProvider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import App from './views/app';
import configureStore from './state/store';
import theme from './theme';
import history from './state/history';

const reduxStore = configureStore({});
const persistor = persistStore(reduxStore);

function Root() {
    return <ReduxProvider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
            <Router history={history}>
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
            </Router>
        </PersistGate>
    </ReduxProvider>;
}

render(<Root/>, document.getElementById('react'));