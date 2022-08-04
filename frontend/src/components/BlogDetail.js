import { Button, CardContent, CardMedia, IconButton, InputLabel, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useStyles } from "./utils";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const BlogDetail = ({ title, description, content, imageURL, premium, userName, isUser, id }) => {
  return (
    <div>
      
      <Paper sx={{ 
        display: 'flex',
        width: "50%",
        margin: "auto",
        borderRadius: 6,
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        }
      }}>

      <CardMedia
        component="img"
        sx={{
          display: 'flex',
          flex: 1,
          boxShadow: 9,
          borderRadius: 3,
          marginRight:5,
          width: 1/2,
          height: 350
        }}
        image={imageURL}
        alt="Some Image"
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 2}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography gutterBottom component="div" variant="h5" fontSize={35}>
            <a href="http://localhost:3000/blog/:id" >{title}</a>
          </Typography>
          <br/><br/>
          <Typography variant="body1" color="text.secondary" component="div">
            {description}
          </Typography>
          <Typography variant="body1" color="text.secondary" component="div">
            {content}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, fontWeight : "Bold", fontSize : 20}}>
          {"by " + userName}
        </Box>
      </Box>
      
      
    </Paper>
  </div>
  );
};

export default BlogDetail;
