import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Bestellung, Tisch, Sitzplatz } from '../../../../models';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { Add, Send } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

const useStyles = makeStyles(theme => ({
    listPaper: {
        padding: theme.spacing(2)
    },
    divider: {
        margin: theme.spacing(2, 0, 2, 0),
    },
    tisch: {
        background: '#F5F5F5'
    }
}));

function TischList() {
    const classes = useStyles();
    const [tische, setTische] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // For testing
        setTische([
            new Tisch('Tisch', 1, 1, [
                new Sitzplatz(1, 1, [
                    new Bestellung(1, "Schnitzel"),
                    new Bestellung(2, "Cola")
                ]),
                new Sitzplatz(2, 1, [
                    new Bestellung(1, "Schnitzel"),
                    new Bestellung(2, "Cola")
                ])
            ]),
            new Tisch('Tisch', 2,2, [
                new Sitzplatz(1, 2, [
                    new Bestellung(3, "Pommes")
                ])
            ]),
            new Tisch('Tisch', 3,3, [])
        ]);
        // Fetch data
        axios.get('/api/v1/tische').then(res => {
            const parsedTische = res.data.map(d => new Tisch(d.name, d.seats));
            setTische(parsedTische);
            setLoading(false);
        }).catch(err => {
            setError(err);
            setLoading(false);
            console.error(err);
        });
    }, []);

    function handleGetAbrechnung(tischNr, sitzplatzNr) {
        console.log("Abrechnung", tischNr);

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

    function handleAddBestellung(tischNr, sitzplatzNr, gerichtId) {
        console.log("Add", tischNr, sitzplatzNr, gerichtId);

        axios.post(`/api/v1/bestellungen/${tischNr}/${sitzplatzNr}/${gerichtId}`).then(res => {
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
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                startIcon={<Send />}
                                onClick={() => handleGetAbrechnung(tisch.tischNr)}
                            >
                                Abrechnung
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
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
                                    startIcon={<Add />}
                                    size="small"
                                    onClick={() => handleAddBestellung(tisch.tischNr, sitzplatz.sitzplatzNr, 0)}
                                >
                                    Bestellung
                                </Button>
                                <List dense>
                                    {
                                        sitzplatz.bestellungen.map(bestellung => <ListItem key={bestellung.gerichtsName}>
                                            <ListItemText
                                                primary={bestellung.gerichtsName}
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