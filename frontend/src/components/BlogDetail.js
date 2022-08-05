import { Button, CardContent, CardMedia, IconButton, InputLabel, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useStyles } from "./utils";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const BlogDetail = () => {
  const {id} = useParams()
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate()

  const [blog, setBlog] = useState({
    title: "",
    description: "",
    content: "",
    img: "",
    user: {}
  })
  const [self, setSelf] = useState(false)

  console.log(id);

  const getBlog = async () => {
    const res = await axios
      .get(`http://localhost:2022/api/blog/${id}`)
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);

    return data;
  };

  const handleEdit = () => {
    navigate(`/blog/edit/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:2022/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };

  useEffect(() => {
    console.log(blog);

    getBlog()
    .then((data) => {
      setBlog(data.blog)
      console.log(blog);
    });
  }, [])

  useEffect(() => {
    setSelf(userId === blog.user._id)
  }, [blog])
  

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

      {self && (
          <Box display="flex"
          sx={{
            mr:2,
            flexDirection: "column",
          }}>
            <IconButton onClick={handleEdit} 
            sx={{ 
              marginLeft: "auto" ,
              flex: 1
            }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}
            sx={{
              flex: 1
            }}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}

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
        image={blog.img}
        alt="Some Image"
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 2}}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography gutterBottom component="div" variant="h5" fontSize={35}>
            {blog.title}
          </Typography>
          <br/><br/>
          <Typography variant="body1" color="text.secondary" component="div">
            {blog.description}
          </Typography>
          <Typography variant="body1" color="text.secondary" component="div">
            {blog.content}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, fontWeight : "Bold", fontSize : 20}}>
          {"by " + blog.user.name}
        </Box>
      </Box>
      
      
    </Paper>
  </div>
  );
};

export default BlogDetail;
