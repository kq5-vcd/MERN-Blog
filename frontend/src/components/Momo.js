import { Button, Box, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material'
import React from 'react'
import axios from 'axios';
import { red } from '@mui/material/colors';

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
                width:1/2,
                height:390,
                margin: 'auto',
                marginTop: 1,
                backgroundColor: 'White',
                boxShadow: 15,
                borderRadius: 3
            }}>
            <DialogTitle id="alert-dialog-title" 
                         textAlign='center'
                         fontSize={25}
            >
            {`Subscribe to ${authorName}`}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" 
                                fontSize={55}
                                textAlign='center'
                                color='black'
            >
                {amount} VND/month
            </DialogContentText>
            </DialogContent>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" 
                              fontSize={20}
                              textAlign='center'
                              fontFamily='Helvetica'
                              color='black'
                              fontWeight='bold'
            >
                  With this subcription, you will be entitled to:
            </DialogContentText>
            <DialogContentText id="alert-dialog-description" 
                                fontSize={20}
                                textAlign='center'
                               fontFamily='Helvetica'
            >
                  Exclusive blogs <br/>
                  Help blogger cover living expenses <br/>
                  Notification when have new blog
            </DialogContentText>
            </DialogContent>
            <Button onClick={handleSubscribe}  autoFocus  sx={{backgroundColor: "red", color: "white", font:'bold', '&:hover': {backgroundColor: '#ad221f'}}}> Subscribe </Button>
    </Box>
  )
}

export default Momo