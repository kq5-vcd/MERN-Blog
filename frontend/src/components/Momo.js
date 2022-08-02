import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material'
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
        <Paper elevation ={10}
            alignItems= "center"
            sx={{
                width: 1/4,
                margin: "auto"
            }}>
            <Typography fontSize={30} 
                sx={{ 
                    mt: 2,
                }}> 
                Subscribe to 
                <Link to="google.com">
                    ming
                </Link> 
            </Typography>
            <Typography fontSize={15}>
                description description description description description description 
            </Typography>
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
                <DialogContentText id="alert-dialog-description">
                    by Accepting our term's of service, you agree to pay 
                    5$ to Subscribe to this person. You will be notified 
                    for every content this person uploads.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}> Disagree </Button>
                <Button onClick={handleClose} autoFocus> Subscribe </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    </div>
  )
}

export default Momo