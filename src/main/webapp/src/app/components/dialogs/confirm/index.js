import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const ConfirmDialog = (props) => {
    const {onClose, onAccept, description, title, open, cancelButtonText, acceptButtonText, ...other } = props;

    const handleClose = () => {
        onClose();
    };

    const handleAccept = () => {
        onAccept();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>{cancelButtonText}</Button>
                <Button onClick={handleAccept} >
                {acceptButtonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}


export default ConfirmDialog;