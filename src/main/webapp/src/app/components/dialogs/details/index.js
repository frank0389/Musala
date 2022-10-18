import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

const DetailsDialog = (props) => {
    const {onClose,  details, title, open, closeButtonText, ...other } = props;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="details-dialog-title"
            aria-describedby="details-dialog-description"
        >
            <DialogTitle id="details-dialog-title">
                <Typography variant="body2"  align="center">
                  {title}
                </Typography>
            </DialogTitle>
            <DialogContent>
                {details}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{closeButtonText}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default DetailsDialog;