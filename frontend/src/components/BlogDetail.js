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
  const classes = useStyles();
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
      <Box
          border={3}
          borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          bgcolor={"white"}
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"60%"}
        >
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
              flex: 1,
              marginLeft: "auto"
            }}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        
          
          <Typography
            className={classes.font}
            padding={3}
            variant="h2"
            textAlign={"left"}
            paddingLeft={15}
          >
            {blog.title}
          </Typography>

          <Typography
            className={classes.font}
            padding={3}
            variant="body1" 
            color="text.secondary"
            textAlign={"left"}
            paddingLeft={15}
            fontSize={20}
          >
            {blog.description}
          </Typography>

          

          <Typography
            className={classes.font}
            padding={3}
            variant="body1" 
            textAlign={"left"}
            paddingLeft={15}
            fontSize={24}
            sx={{
              cursor: "pointer"
            }}
            onClick={() => {
              navigate(`/user/${blog.user._id}`)
            }}
          >
            {'by ' + blog.user.name}
          </Typography>

          <img src={blog.img}  style={{ maxWidth: '40%', width: '1/2', margin: 'auto', boxShadow: '6px 9px 15px', paddingBottom: '20'}}/>

          <Typography
            className={classes.font}
            padding={3}
            variant="body1" 
            textAlign={"justify"}
            paddingTop={10}
            paddingLeft={10}
            paddingRight={10}
            fontSize={22}
          >
            {blog.content}
          </Typography>
        </Box>
  </div>
  );
};

export default BlogDetail;
