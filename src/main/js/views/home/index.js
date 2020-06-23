import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import TischForm from './components/tisch/form';
import TischList from './components/tisch/list';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2)
    }
}));

function Home() {
    const classes = useStyles();

    return <Grid className={classes.container} container spacing={2}>
        <TischForm />
        <TischList />
    </Grid>;
}

export default Home;