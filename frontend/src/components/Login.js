import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const navigate = useNavigate();
  const dispath = useDispatch();
  
  const [inputs, setInputs] = useState({
    name: "",
    password: "",
  });

  const sendRequest = async (inputs) => {
    const res = await axios
      .post(`http://localhost:2022/api/user/login`, {
        name: inputs.name,
        password: inputs.password,
      })
      .catch((err) => {
        console.log(err)
        alert(err.response.data.message)
      });
  
    const data = await res.data;
    console.log(data);
  
    return data;
  };
  
  const oauth = async () => {
    window.open(
      `http://localhost:2022/api/oauth2/google`,
      "_self"
    )
  }
  
  const handleChange = ({ target }) => {
    setInputs((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));

    console.log(inputs);
  };

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(inputs);
    
    const data = await sendRequest(inputs)

    if(!data.user) {
      alert(data.message)
    } else {
      localStorage.setItem("userId", data.user._id)

      dispath(authActions.login())
      navigate("/blogs")
    }
  }
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
          backgroundColor="#FFFEFC"
        >
          <Typography variant="h2" padding={3} textAlign="center">
            Login
          </Typography>

          <TextField
            name="name"
            onChange={handleChange}
            value={inputs.email}
            type={"text"}
            placeholder="Email or Username"
            margin="normal"
          />

          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            backgroundColor="#E035FC"
          >
            Submit
          </Button>

          <Button
            onClick={() => oauth()}
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            backgroundColor="#E035FC"
          >
            <GoogleIcon />   
            <span style={{marginLeft: 10}}>Login with Google</span>
          </Button>

          <Button
            onClick={() => navigate('/register')}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            New user?
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Login
