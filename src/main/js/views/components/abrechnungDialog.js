import React from 'react';

import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({

}));


function AbrechnungDialog(props) {
    const { abrechnung, open, onClose } = props;
    const classes = useStyles();

    if (abrechnung === null  || abrechnung === undefined) {
        return null;
    }

    function formatPrice(price) {
        let result;
        // If number is not float, add ".0"
        if (price % 1 === 0) {
            result = `${price}.0`;
        } else {
            result = price;
        }
        return `${result} €`
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className={classes.error}>
                    Abrechnung Nr. {abrechnung.nr}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {abrechnung.positionen.map(p => <Typography>{p}</Typography>)}
                        <Typography variant="body1">Summe: {formatPrice(abrechnung.sum)}</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary" autoFocus>
                        Okay
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AbrechnungDialog;
