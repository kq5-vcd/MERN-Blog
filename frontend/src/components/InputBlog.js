import { Box, Button, InputLabel, TextField, Typography, Checkbox, FormControlLabel } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStyles } from "./utils";

const labelStyles = { mb: 1, mt: 1, fontSize: "24px", fontWeight: "bold", color: '#79827b' };

const InputBlog = ({add}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const {id} = useParams()
  const [blog, setBlog] = useState({})

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    content: "",
    imageURL: "",
  });

  const [premium, setPremium] = useState(false)
  

  const handleChange = ({target}) => {
    setInputs((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleCheck = () => {
    setPremium(!premium)
  };

  const getBlog = async () => {
    const res = await axios
      .get(`http://localhost:2022/api/blog/${id}`)
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);

    return data;
  };

  const sendRequest = async () => {
    let res

    if(add) {
      res = await axios
      .post(`http://localhost:2022/api/blog/${userId}`, {
        title: inputs.title,
        description: inputs.description,
        content: inputs.content,
        premium,
        img: inputs.imageURL,
      })
      .catch((err) => console.log(err));
    } else {
      res = await axios
      .put(`http://localhost:2022/api/blog/${blog._id}`, {
        title: inputs.title,
        description: inputs.description,
        content: inputs.content,
        premium,
        img: inputs.imageURL,
      })
      .catch((err) => console.log(err));
    }
    

    const data = await res.data;
    console.log(data);

    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(inputs);

    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/myBlogs"));
  };

  useEffect(() => {
    if(!add) {
      getBlog()
      .then((data) => {
        console.log(data);
        setBlog(data.blog)
        console.log(blog);
      });
    }
  }, [])

  useEffect(() => {
    setInputs({
      title: blog.title,
      description: blog.description,
      content: blog.content,
      imageURL: blog.img,
    })
    setPremium(blog.premium)

    console.log(inputs)
  }, [blog])
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          width={"80%"}
        >
          <Typography
            className={classes.font}
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            {add ? "Post Your Blog" : "Edit Post"}
          </Typography>

          <InputLabel className={classes.font} sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            className={classes.font}
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="auto"
            variant="outlined"
          />

          <InputLabel className={classes.font} sx={labelStyles}>
            Description
          </InputLabel>
          <TextField
            className={classes.font}
            name="description"
            onChange={handleChange}
            value={inputs.description}
            margin="auto"
            variant="outlined"
          />

          <InputLabel className={classes.font} sx={labelStyles}>
            Content
          </InputLabel>
          <TextField
          className={classes.font}
          name="content"
          multiline
          rows={7}
          onChange={handleChange}
          value={inputs.content}
          margin="auto"
          variant="outlined"
        />
          <InputLabel className={classes.font} sx={labelStyles}>
            Image URL
          </InputLabel>
          <TextField
            className={classes.font}
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            margin="auto"
            variant="outlined"
          />

          <FormControlLabel
            control={
              <Checkbox onClick={handleCheck} checked={premium} />
            }
            
            label={<Typography 
              sx={labelStyles}>Premium</Typography>}
            
          />

          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default InputBlog;
