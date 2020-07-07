import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import TischForm from './components/tisch/form';
import TischList from './components/tisch/list';
import axios from 'axios';
import { Gericht, Tisch } from '../../models';
import ErrorDialog from '../components/errorDialog';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2)
    }
}));

function Home() {
    const classes = useStyles();
    const [tische, setTische] = useState([]);
    const [gerichte, setGerichte] = useState([]);

    const [loading, setLoading] = useState(true);
    const [dialogError, setDialogError] = useState(null);
    const [dialogErrorDesc, setDialogErrorDesc] = useState(null);

    useEffect(() => {
        fetchDTOs();
    }, []);

    function fetchDTOs() {
        console.log("Fetching DTOs");
        setLoading(true);
        // Fetch tische
        axios.get('/api/v1/tische/all').then(res => {
            console.log("tische", res.data);
            const parsedTische = res.data
                .map(d => new Tisch(d.anzSitzplaetze, d.bestellungenToSitzplatz ?? [], d.description, d.id, d.nr));
            const sortedTische = parsedTische.sort((t1, t2) => t1.nr - t2.nr);
            setTische(sortedTische);
            setLoading(false);
        }).catch(err => {
            if (err.response.status !== 404) {
                setDialogError(err);
                setLoading(false);
            }
            console.error(err);
        });

        // Fetch gerichte
        axios.get('/api/v1/gerichte').then(res => {
            console.log("gerichte", res.data);
            const parsedGerichte = res.data.map(g => new Gericht(g.name, g.preis));
            setGerichte(parsedGerichte);
            setLoading(false);
        }).catch(err => {
            setDialogError(err);
            setLoading(false);
            console.error(err);
        });
    }

    return <div>
        <ErrorDialog open={dialogError !== null} onClose={() => setDialogError(null)} />
        <Grid className={classes.container} container spacing={2} visibility={loading ? 'hidden' : 'visible'}>
            <ErrorDialog
                errorTitle={dialogError}
                errorDescription={dialogErrorDesc}
                open={dialogError !== undefined && dialogError !== null}
                onClose={() => {
                    setDialogError(null);
                    setDialogErrorDesc(null);
                }}
            />
            <TischForm
                setLoading={setLoading}
                updateUI={fetchDTOs}
            />
            <TischList
                tische={tische}
                gerichte={gerichte}
                setError={setDialogError}
                setLoading={setLoading}
                updateUI={fetchDTOs}
            />
        </Grid>
    </div>;
}

export default Home;