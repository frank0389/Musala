import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from "@mui/material/Alert";

const ErrorDialog = (props) => {
    const {onAccept,  description, title, open, acceptButtonText, ...other } = props;

    const handleAccept = () => {
        onAccept();
    };

    return (
        <Dialog
            open={open}
            onClose={handleAccept}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Alert color="error" severity="error"
                           sx={{ mb: 2, backgroundColor:"transparent" }}
                    >
                        {description}
                    </Alert>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAccept}>{acceptButtonText}</Button>
            </DialogActions>
        </Dialog>
    );
}


export default ErrorDialog;