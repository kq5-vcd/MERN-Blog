import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material'
import { purple, red } from '@mui/material/colors';
import React from 'react'
import { Link } from 'react-router-dom'

function Momo() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
  return (
    <div style = {{
        alignItems: 'center'
    }}>
            <Button variant="contained" disableElevation onClick={handleClickOpen}> Subscribe </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to Subscribe?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description" fontSize={20}>
                    5$ 
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}> Cancle </Button>
                <Button onClick={handleClose} autoFocus sx={{backgroundColor: purple.A400, color: red}}> Subscribe </Button>
                </DialogActions>
            </Dialog>
    </div>
  )
}

export default Momo