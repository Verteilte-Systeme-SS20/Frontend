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

function TischList(props) {
    const { tische, gerichte, updateUI, setError, setLoading } = props;
    const classes = useStyles();

    const [currentTischNr, setCurrentTischNr] = useState(0);
    const [currentSitzplatzNr, setCurrentSitzplatzNr] = useState(0);
    const [openBestellDialog, setOpenBestellDialog] = useState(false);

    function handleGetAbrechnung(tischNr, sitzplatzNr) {
        setLoading(true);
        console.log("Abrechnung", tischNr, sitzplatzNr);

        axios.get(`/api/v1/bestellungen/abgrechnet/${tischNr}/${sitzplatzNr}`).then(res => {
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
        console.log("Bestellung", currentTischNr, currentSitzplatzNr, gericht);
        axios.post(`/api/v1/bestellungen/${currentTischNr}/${currentSitzplatzNr}/${gericht.id}`).then(res => {
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
        const sitzplatzItems = [];
        for (let sitzplatzNr = 0; sitzplatzNr < tisch.anzSitzplaetze; sitzplatzNr++) {
            const bestellungen = tisch.bestellungen.filter(b => b.sitzplatzNr === sitzplatzNr);
            sitzplatzItems.push(
                <Grid item key={sitzplatzNr} xs={6}>
                    <Typography variant="subtitle1">Platz {sitzplatzNr}</Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<Send />}
                        size="small"
                        onClick={() => handleGetAbrechnung(tisch.nr, sitzplatzNr)}
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
                        onClick={() => handleAddBestellung(tisch.nr, sitzplatzNr)}
                    >
                        Bestellung
                    </Button>
                    <List dense>
                        {
                            bestellungen.map(bestellung => <ListItem key={bestellung.gericht.id}>
                                <ListItemText
                                    primary={bestellung.gericht.name}
                                />
                            </ListItem>)
                        }
                    </List>
                    <Divider className={classes.divider}/>
                </Grid>
            );
        }
        return sitzplatzItems;
    };

    const mapTische = tische.map(tisch => {
        return <Grid item key={tisch.nr} xs={4}>
            <Card className={classes.tisch}>
                <CardHeader
                    title={'Tisch ' + tisch.nr}
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