import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Bestellung, Tisch, Sitzplatz, Gericht } from '../../../../models';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { Add, Send } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import BestellDialog from '../bestellung/bestellDialog';

const useStyles = makeStyles(theme => ({
    listPaper: {
        padding: theme.spacing(2)
    },
    divider: {
        margin: theme.spacing(2, 0, 2, 0),
    },
    smallDivider: {
        border: 'none !important',
        margin: theme.spacing(1, 0, 1, 0),
    },
    tisch: {
        background: '#F5F5F5'
    }
}));

function TischList() {
    const classes = useStyles();

    const [tische, setTische] = useState([]);
    const [gerichte, setGerichte] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentTischNr, setCurrentTischNr] = useState(0);
    const [currentSitzplatzNr, setCurrentSitzplatzNr] = useState(0);
    const [openBestellDialog, setOpenBestellDialog] = useState(false);

    useEffect(() => {
        // Fetch tische
        axios.get('/api/v1/tische').then(res => {
            console.log("tische", res.data);
            const parsedTische = res.data.map(d => new Tisch(d.anzSitzplaetze, d.bestellungen ?? [], d.description, d.id, d.nr));
            setTische(parsedTische);
            setLoading(false);
        }).catch(err => {
            setError(err);
            setLoading(false);
            console.error(err);
        });

        // Fetch gerichte
        axios.get('/api/v1/gerichte').then(res => {
            const parsedGerichte = res.data.map(g => new Gericht(g.name, g.preis));
            setGerichte(parsedGerichte);
            setLoading(false);
        }).catch(err => {
            setError(err);
            setLoading(false);
            console.error(err);
        });
    }, []);

    function handleGetAbrechnung(tischNr, sitzplatzNr) {
        console.log("Abrechnung", tischNr, sitzplatzNr);

        axios.get(`/api/v1/bestellungen/abgrechnet/${tischNr}/${sitzplatzNr}`).then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        });
    }

    function handleAddSitzplatz(tischNr) {
        console.log("Add sitzplatz", tischNr);

        const tisch = tische.filter(t => t.nr === tischNr)[0];
        const newSitzplaetze = tisch.anzSitzplaetze + 1;
        console.log("newSitzplaetze", `/api/v1/tische/${tisch.nr}/${newSitzplaetze}`);

        axios.put(`/api/v1/tische/${tisch.nr}/${newSitzplaetze}`).then(res => {
            console.log('Neuer tisch', res.data);
            setError(null);
        }).catch(err => {
            console.error(err, err.response.data);
            setError(err.response.data);
        });
    }

    function handleAddBestellung(tischNr, sitzplatzNr) {
        setCurrentTischNr(tischNr);
        setCurrentSitzplatzNr(sitzplatzNr);
        setOpenBestellDialog(true);
    }

    function handleSubmitBestellung(gericht) {
        console.log("Bestellung", currentTischNr, currentSitzplatzNr, gericht);
        axios.post(`/api/v1/bestellungen/${currentTischNr}/${currentSitzplatzNr}/${gericht.id}`).then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        });
    }

    const cards = tische.map(tisch => {
        return <Grid item key={tisch.tischNr} xs={4}>
            <Card className={classes.tisch}>
                <CardHeader
                    title={'Tisch ' + tisch.nr + ' Sitzplätze: ' + tisch.anzSitzplaetze}
                />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<Add />}
                                onClick={() => handleAddSitzplatz(tisch.nr)}
                            >
                                Sitzplatz
                            </Button>
                        </Grid>
                        {
                            tisch.bestellungen.map(sitzplatz => <Grid item key={sitzplatz.sitzplatzNr} xs={6}>
                                <Typography variant="subtitle1">Platz {sitzplatz.sitzplatzNr}</Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<Send />}
                                    size="small"
                                    onClick={() => handleGetAbrechnung(tisch.nr, sitzplatz.sitzplatzNr)}
                                >
                                    Abrechnung
                                </Button>
                                <Divider className={classes.smallDivider}/>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<Add />}
                                    size="small"
                                    onClick={() => handleAddBestellung(tisch.nr, sitzplatz.sitzplatzNr)}
                                >
                                    Bestellung
                                </Button>
                                <List dense>
                                    {
                                        sitzplatz.bestellungen.map(bestellung => <ListItem key={bestellung.gericht.id}>
                                            <ListItemText
                                                primary={bestellung.gericht.name}
                                            />
                                        </ListItem>)
                                    }
                                </List>
                                <Divider className={classes.divider}/>
                            </Grid>)
                        }
                    </Grid>
                </CardContent>
            </Card>
        </Grid>;
    });

    return <Grid item xs={10}>
        <BestellDialog
            open={openBestellDialog}
            setOpen={setOpenBestellDialog}
            tischNr={currentTischNr}
            sitzplatzNr={currentSitzplatzNr}
            submitBestellung={handleSubmitBestellung}
            gerichte={gerichte}/>
        <Paper className={classes.listPaper}>
            <Typography variant="h4">Restaurant</Typography>
            <Divider className={classes.divider}/>
            <Grid container spacing={2}>
                {cards}
            </Grid>
        </Paper>
    </Grid>
}

export default TischList;