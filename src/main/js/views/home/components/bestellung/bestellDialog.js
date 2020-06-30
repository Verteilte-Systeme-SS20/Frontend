import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    input: {
        marginBottom: theme.spacing(1)
    },
    inputError: {
        color: '#ff2222'
    }
}));

export default function BestellDialog(props) {
    const classes = useStyles();
    const { open, setOpen, tischNr, sitzplatzNr, submitBestellung, gerichte } = props;
    const { register, handleSubmit, watch, errors } = useForm();

    const handleClose = () => {
        setOpen(false);
    };

    function onSubmit(data) {
        console.log(gerichte);
        const gericht = gerichte.filter(g => g.name === data.gerichtsName)[0];
        submitBestellung(gericht);
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Bestellung aufnehmen</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Eine Bestellung für Platz {sitzplatzNr} an Tisch {tischNr} aufnehmen.
                </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Autocomplete
                        autoFocus
                        options={gerichte}
                        getOptionLabel={option => option.name}
                        renderInput={params => (
                            <TextField
                                {...params}
                                name="gerichtsName"
                                id="gerichtsName"
                                label="Gerichtsname"
                                inputRef={register({required: true})}
                            />
                        )}
                        className={classes.input}
                        fullWidth
                    />
                    {errors.gerichtsName && <span className={classes.inputError}>Pflichtfeld</span>}
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Abbrechen
                </Button>
                <Button onClick={handleSubmit(onSubmit)} color="primary">
                    Aufnehmen
                </Button>
            </DialogActions>
        </Dialog>
    );
}