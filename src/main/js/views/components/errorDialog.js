import React from 'react';

import { makeStyles } from '@material-ui/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

const useStyles = makeStyles(theme => ({
    error: {
        color: theme.palette.error
    }
}));


function ErrorDialog(props) {
    const { errorTitle, errorDescription, open, onClose } = props;
    const classes = useStyles();

    if (errorTitle === null || errorTitle === undefined) {
        return null;
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
                    Fehler: {typeof errorTitle === 'object' ? 'Unbekannt' : errorTitle.toString()}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {errorDescription !== undefined && errorDescription !== null ? errorDescription.toString() : ''}
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

export default ErrorDialog;
