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
            if (err.response.status === 404) {
                setTische([]);
            } else {
                setDialogError(err);
            }
            setLoading(false);
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

    function handleAbrechnungProcessing(tischNr, sitzplatzNr) {
        const newTische = [...tische];
        const tischWithSitzplatz = newTische.filter(t => t.nr === tischNr)[0];
        const sitzplatzToSetProcessing = tischWithSitzplatz.sitzplaetze.filter(s => s.sitzplatzNr === sitzplatzNr)[0];
        sitzplatzToSetProcessing.abrechnungProcessing = true;
        setTische(newTische);
    }

    function onSockJsMessage(msg, topic) {
        console.log("Got msg", msg, topic);
        if (typeof msg.abrechnungDTO !== 'undefined') {
            const abrechnungsMessage = new AbrechnungsMessage(msg.successful, msg.error, msg.abrechnungDTO);
            if (!abrechnungsMessage.successful) {
                setDialogError("Fehler bei Abrechnungsprozess");
                setDialogErrorDesc(abrechnungsMessage.error)
            } else {
                setCurrentAbrechnung(abrechnungsMessage.abrechnung);
                setDialogAbrechnungOpen(true);
            }
            fetchDTOs();
        }
    }

    function onSockJsConnect() {
        console.log("WebSocket connected", client);
    }

    function handleGetAbrechnung(tischNr, sitzplatzNr) {
        const dto = {
            tischNr,
            sitzplatzNr
        };
        client.sendMessage("/app/abrechnung", JSON.stringify(dto));
        handleAbrechnungProcessing(tischNr, sitzplatzNr);
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
                getAbrechnung={handleGetAbrechnung}
                handleAbrechnungProcessing={handleAbrechnungProcessing}
            />
        </Grid>
    </div>;
}

export default Home;