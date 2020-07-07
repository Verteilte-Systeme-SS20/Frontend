import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import TischForm from './components/tisch/form';
import TischList from './components/tisch/list';
import axios from 'axios';
import { Gericht, Tisch } from '../../models';
import ErrorDialog from '../components/errorDialog';
import SockJsClient from 'react-stomp';
import AbrechnungsMessage from '../../models/abrechnungsMessage';
import AbrechnungDialog from '../components/abrechnungDialog';

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
    const [client, setClient] = useState(null);

    const [loading, setLoading] = useState(true);
    const [dialogError, setDialogError] = useState(null);
    const [dialogErrorDesc, setDialogErrorDesc] = useState(null);

    const [currentAbrechnung, setCurrentAbrechnung] = useState(null);
    const [dialogAbrechnungOpen, setDialogAbrechnungOpen] = useState(false);

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

    function onSockJsMessage(msg, topic) {
        console.log("Got msg", msg, topic);
        const abrechnungsMessage = new AbrechnungsMessage(msg.successful, msg.error, msg.abrechnung);
        if (!abrechnungsMessage.successful) {
            setDialogError("Fehler bei Abrechnungsprozess");
            setDialogErrorDesc(abrechnungsMessage.error)
        } else {
            setCurrentAbrechnung(abrechnungsMessage.abrechnung);
            setDialogAbrechnungOpen(true);
        }
    }

    function onSockJsConnect(status) {
        console.log("connected", status);
    }

    return <div>
        <SockJsClient
            url={`${window.location.protocol}//${window.location.host}/handler`}
            topics={["/topic/abrechnung"]}
            onConnect={onSockJsConnect}
            onMessage={onSockJsMessage}
            ref={ (client) => { setClient(client) }}
        />
        <ErrorDialog open={dialogError !== null} onClose={() => setDialogError(null)} />
        <AbrechnungDialog
            open={dialogAbrechnungOpen}
            onClose={() => {
                setDialogAbrechnungOpen(false);
                setCurrentAbrechnung(null);
                fetchDTOs();
            }}
            abrechnung={currentAbrechnung} />
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