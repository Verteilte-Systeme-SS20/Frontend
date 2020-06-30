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
    const bspGerichte = [
        new Gericht(0, 'Schnitzel', 50.0),
        new Gericht(1, 'Pommes', 10.0),
        new Gericht(2, 'Cola', 5.0),
        new Gericht(3, 'Kartoffel', 4.0),
    ];
    const bspTische = [
        new Tisch('Tisch', 1, 1, [
            new Sitzplatz(1, 1, [
                new Bestellung(null, bspGerichte[0]),
                new Bestellung(null, bspGerichte[1])
            ]),
            new Sitzplatz(2, 1, [
                new Bestellung(null, bspGerichte[1]),
                new Bestellung(null, bspGerichte[2])
            ])
        ]),
        new Tisch('Tisch', 2,2, [
            new Sitzplatz(1, 2, [
                new Bestellung(null, bspGerichte[3])
            ])
        ]),
        new Tisch('Tisch', 3,3, [])
    ];

    const [tische, setTische] = useState(bspTische);
    const [gerichte, setGerichte] = useState(bspGerichte);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [currentTischNr, setCurrentTischNr] = useState(0);
    const [currentSitzplatzNr, setCurrentSitzplatzNr] = useState(0);
    const [openBestellDialog, setOpenBestellDialog] = useState(false);

    useEffect(() => {
        // Fetch tische
        axios.get('/api/v1/tische').then(res => {
            const parsedTische = res.data.map(d => new Tisch(d.name, d.seats));
            setTische(parsedTische);
            setLoading(false);
        }).catch(err => {
            setError(err);
            setLoading(false);
            console.error(err);
        });

        // Fetch gerichte
        axios.get('/api/v1/gerichte').then(res => {
            const parsedGerichte = res.data.map(g => new Gericht(g.id, g.name, g.preis));
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

        const tischDto = null;

        axios.put(`/api/v1/tische/${tischNr}/`, tischDto).then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
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
                    title={tisch.name + ' ' + tisch.tischNr}
                />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<Add />}
                                onClick={() => handleAddSitzplatz(tisch.tischNr)}
                            >
                                Sitzplatz
                            </Button>
                        </Grid>
                        {
                            tisch.sitzplaetze.map(sitzplatz => <Grid item key={sitzplatz.sitzplatzNr} xs={6}>
                                <Typography variant="subtitle1">Platz {sitzplatz.sitzplatzNr}</Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    startIcon={<Send />}
                                    size="small"
                                    onClick={() => handleGetAbrechnung(tisch.tischNr, sitzplatz.sitzplatzNr)}
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
                                    onClick={() => handleAddBestellung(tisch.tischNr, sitzplatz.sitzplatzNr)}
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