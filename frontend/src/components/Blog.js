import {
  Box,
  Paper,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Blog = ({ title, description, imageURL, user, id }) => {
  const navigate = useNavigate();

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
          <Typography 
            gutterBottom component="div" 
            variant="h5" 
            fontSize={35}
            sx={{cursor: "pointer"}}
            onClick={() => {
              navigate(`/blog/${id}`)
            }}
          >
            {title}
          </Typography>
          <br/><br/>
          <Typography variant="body1" color="text.secondary" component="div">
            {description}
          </Typography>
        </CardContent>
        <Box 
          sx={{ display: 'flex', 
                alignItems: 'center', 
                pl: 1, 
                pb: 1, 
                fontWeight : "Bold", 
                fontSize : 20,
                cursor: "pointer"
              }}
          onClick={() => {
            navigate(`/user/${user._id}`)
          }}
        >
          {"by " + user.name}
        </Box>
      </Box>
      
      
    </Paper>
  </div>
  
  );
};

export default Blog;
