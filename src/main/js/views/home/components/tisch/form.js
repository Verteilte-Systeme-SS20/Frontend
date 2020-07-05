import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { useForm } from "react-hook-form";

const useStyles = makeStyles(theme => ({
    formPaper: {
        padding: theme.spacing(2)
    },
    divider: {
        margin: theme.spacing(2, 0, 2, 0),
    },
    input: {
        marginBottom: theme.spacing(1)
    },
    inputError: {
        color: '#ff2222'
    }
}));

function TischForm(props) {
    const { setLoading, updateUI } = props;
    const classes = useStyles();
    const { register, handleSubmit, watch, errors } = useForm();
    const [error, setError] = useState(null);

    function onSubmit(data) {
        setLoading(true);
        axios.post(`/api/v1/tische/${data.nummer}/${data.positionen}`).then(res => {
            console.log(res);
            setError(null);
            setLoading(false);
            updateUI();
        }).catch(err => {
            setError(err.response.data);
            setLoading(false);
        });
    }

    return<Grid item xs={2}>
        <Paper className={classes.formPaper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4" color="textPrimary">
                    Tisch
                </Typography>
                <TextField
                    className={classes.input}
                    fullWidth
                    required
                    label="Tischnummer"
                    name="nummer"
                    type="number"
                    inputRef={register({required: true})}
                />
                {errors.nummer && <Typography variant="p" className={classes.inputError}>Pflichtfeld</Typography>}
                <TextField
                    className={classes.input}
                    fullWidth
                    required
                    label="Anzahl Plätze"
                    name="positionen"
                    type="number"
                    inputRef={register({ required: true, min: 0, max: 50 })}
                />
                {errors.positionen && <Typography variant="p" className={classes.inputError}>Muss zwischen 0 und 50 sein</Typography>}
                <Divider className={classes.divider} />
                <Button color="primary" type="submit">Erstellen</Button>
                <Typography variant="p" className={classes.inputError}>{error}</Typography>
            </form>
        </Paper>
    </Grid>
}

export default TischForm;