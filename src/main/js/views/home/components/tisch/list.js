import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { Add, Send, Delete } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import BestellDialog from '../bestellung/bestellDialog';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

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

function TischList(props) {
    const { tische, gerichte, updateUI, setError, setLoading } = props;
    const classes = useStyles();

    const [currentTischNr, setCurrentTischNr] = useState(0);
    const [currentSitzplatzNr, setCurrentSitzplatzNr] = useState(0);
    const [openBestellDialog, setOpenBestellDialog] = useState(false);

    function handleGetAbrechnung(tischNr, sitzplatzNr) {
        setLoading(true);
        console.log("Abrechnung", tischNr, sitzplatzNr);

        axios.get(`/api/v1/bestellungen/abrechnung/${tischNr}/${sitzplatzNr}`).then(res => {
            console.log(res);
            setLoading(false);
            updateUI();
        }).catch(err => {
            setLoading(false);
            setError(`${err.response.status} - ${err.response.data }`);
            console.error(err);
        });
    }

    // TODO: handleRemoveSitzplatz
    function handleAddSitzplatz(tischNr) {
        setLoading(true);
        console.log("Add sitzplatz", tischNr);

        const tisch = tische.filter(t => t.nr === tischNr)[0];
        const newSitzplaetze = tisch.anzSitzplaetze + 1;

        axios.put(`/api/v1/tische/${tisch.nr}/${newSitzplaetze}`).then(res => {
            console.log('Neuer tisch', res.data);
            setLoading(false);
            updateUI();
        }).catch(err => {
            console.error(err, err.response.data);
            setLoading(false);
            setError(`${err.response.status} - ${err.response.data }`);
        });
    }

    function handleSubmitBestellung(gericht) {
        setLoading(true);
        console.log("Bestellung", `/api/v1/bestellungen/${currentTischNr}/${currentSitzplatzNr}/${gericht.name}`);
        axios.post(`/api/v1/bestellungen/${currentTischNr}/${currentSitzplatzNr}/${gericht.name}`).then(res => {
            console.log(res);
            setLoading(false);
            updateUI();
        }).catch(err => {
            console.error(err);
            setLoading(false);
            setError(`${err.response.status} - ${err.response.data }`);
        });
    }

    function handleDeleteTable(tischNr) {
        setLoading(true);
        console.log("Delete Tisch", tischNr);
        axios.delete(`/api/v1/tische/${tischNr}`).then(res => {
            console.log(res);
            setLoading(false);
            updateUI();
        }).catch(err => {
            console.error(err);
            setLoading(false);
            setError(`${err.response.status} - ${err.response.data }`);
        });
    }

    function handleAddBestellung(tischNr, sitzplatzNr) {
        setCurrentTischNr(tischNr);
        setCurrentSitzplatzNr(sitzplatzNr);
        setOpenBestellDialog(true);
    }

    const mapSitzplaetze = (tisch) => {
        return tisch.sitzplaetze.map(s => {
            const offeneBestellungen = s.bestellungen
                .filter(b => !b.abgerechnet);
            return  <Grid item key={s.sitzplatzNr} xs={6}>
                <Typography variant="subtitle1">Platz {s.sitzplatzNr}</Typography>
                <Button
                    variant="contained"
                    disabled={s.abrechnungProcessing || offeneBestellungen.length <= 0}
                    color="secondary"
                    className={classes.button}
                    startIcon={<Send />}
                    size="small"
                    onClick={() => handleGetAbrechnung(s.tischNr, s.sitzplatzNr)}
                >
                    Abrechnung
                </Button>
                {
                    s.abrechnungProcessing ? <CircularProgress  /> : null
                }
                <Divider className={classes.smallDivider}/>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<Add />}
                    size="small"
                    onClick={() => handleAddBestellung(s.tischNr, s.sitzplatzNr)}
                >
                    Bestellung
                </Button>
                <List dense>
                    {
                        offeneBestellungen
                            .map(bestellung => <ListItem key={bestellung.timestamp}>
                                <ListItemText
                                    primary={bestellung.gericht.name}
                                    secondary={bestellung.gericht.preis}
                                />
                            </ListItem>)
                    }
                </List>
                <Divider className={classes.divider}/>
            </Grid>;
        });
    };

    const mapTische = tische.map(tisch => {
        return <Grid item key={tisch.nr} xs={4}>
            <Card className={classes.tisch}>
                <CardHeader
                    title={'Tisch ' + tisch.nr}
                    action={
                        <IconButton
                            aria-label="Tisch löschen"
                            onClick={() => handleDeleteTable(tisch.nr)}
                        >
                            <Delete />
                        </IconButton>
                    }
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
                        {mapSitzplaetze(tisch)}
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
                {mapTische}
            </Grid>
        </Paper>
    </Grid>
}

export default TischList;