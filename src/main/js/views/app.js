import React from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import routes from '../routes';
import Header from './components/header';
import Footer from './components/footer';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    content: {
        marginTop: theme.spacing(8),
        flex: 1
    }
}));

function App() {
    const classes = useStyles();

    return <div className={classes.root}>
        <CssBaseline/>
        <Header/>
        <main className={classes.content}>
            {
                routes.map(route => (
                    <Route key={route.path} {...route} />
                ))
            }
        </main>
        <Footer/>
    </div>
}

export default App;
