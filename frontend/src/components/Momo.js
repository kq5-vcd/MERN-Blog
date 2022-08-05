import { Button, Box, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material'
import React from 'react'
import axios from 'axios';

function Momo({authorId, authorName, amount}) {
    const [open, setOpen] = React.useState(false);
    const userId = localStorage.getItem("userId")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sendRequest = async (inputs) => {
        const res = await axios
          .post(`http://localhost:2022/api/momo`, {
            userId,
            authorId,
            authorName,
            amount
          })
          .catch((err) => {
            console.log(err)
            alert(err.response.data.message)
          });
      
        const data = await res.data;
        console.log(data);
      
        return data;
      };

    const handleSubscribe = () => {
        sendRequest().then(() => alert("You can close this window after payment."))
    }

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
            {`Are you sure you want to subscribe to ${authorName}?`}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" fontSize={40}>
                <br/>
                Total: {amount} VND
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}> Cancel </Button>
            <Button onClick={handleSubscribe} autoFocus sx={{backgroundColor: "red", color: "white", font:'bold'}}> Subscribe </Button>
            </DialogActions>
    </Box>
  )
}

export default Momo