import { Button, Box, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material'
import { purple, red } from '@mui/material/colors';
import React from 'react'
import { Link } from 'react-router-dom'
import Blog from "./Blog";

function Momo({userName}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
  return (
    <Box sx={{  display: 'flex', 
                flexDirection: 'column',
                boxShadow: 10,
                width:1/4,
                height:450,
                margin: 'auto',
                marginTop: 10,
                backgroundColor: 'White',
            }}>
            <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to Subscribe?"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" fontSize={20}>
                Service: momo
                <br/>
                Recipient: userId
            </DialogContentText>
            <DialogContentText id="alert-dialog-description" fontSize={40}>
                <br/> <br/> <br/>
                Total: 50000 VND
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}> Cancel </Button>
            <Button onClick={handleClose} autoFocus sx={{backgroundColor: "red", color: "white", font:'bold'}}> Subscribe </Button>
            </DialogActions>
    </Box>
  )
}

export default Momo