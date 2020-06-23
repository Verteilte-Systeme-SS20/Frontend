import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Tisch } from '../../../../models';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { AccountCircle, Add } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    listPaper: {
        padding: theme.spacing(2)
    },
    divider: {
        margin: theme.spacing(2, 0, 2, 0),
    },
}));

function TischList() {
    const classes = useStyles();
    const [tische, setTische] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // For testing
        setTische([
            new Tisch('Tisch 1', [1, 2]),
            new Tisch('Tisch 2', [1]),
            new Tisch('Tisch 3', [1, 2, 3])
        ]);
        /*
        // Fetch data
        axios.get('http://' + window.location.host + '/api').then(res => {
            const parsedTische = res.data.map(d => new Tisch(d.name, d.seats));
            setTische(parsedTische);
            setLoading(false);
        }).catch(err => {
            setError(err);
            setLoading(false);
            console.error(err);
        });*/
    }, []);


    const cards = tische.map(tisch => {
        return <Grid item key={tisch.name}>
            <Card xs={2}>
                <CardHeader
                    title={tisch.name}
                />
                <CardContent>
                    <List>
                        {
                            tisch.positionen.map(position => <ListItem key={position}>
                                <ListItemAvatar>
                                    <Avatar>
                                        <AccountCircle />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete">
                                        <Add />
                                    </IconButton>
                                </ListItemSecondaryAction>

                            </ListItem>)
                        }
                    </List>
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