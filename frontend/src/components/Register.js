import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import GoogleIcon from '@mui/icons-material/Google';

function Register() {
  const navigate = useNavigate();
  const dispath = useDispatch();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const [nameCheck, setNameCheck] = useState(true)
  const [passCheck, setPassCheck] = useState(true)
  const [confirmCheck, setConfirmCheck] = useState(true)

  const firstMountName = useRef(true)
  const firstMountPass = useRef(true)
  const firstMountConfirm = useRef(true)

  useEffect(() => {
    if(firstMountName.current) {
      firstMountName.current = false
    } else {
      if(name.length < 3) setNameCheck(false)
      else setNameCheck(true)
    }
  }, [name])

  useEffect(() => {
    if(firstMountPass.current) {
      firstMountPass.current = false
    } else {
      if(password.length < 6) setPassCheck(false)
      else setPassCheck(true)
    }
  }, [password])

  useEffect(() => {
    if(firstMountConfirm.current) {
      firstMountConfirm.current = false
    } else {
      if(password !== confirm) setConfirmCheck(false)
      else setConfirmCheck(true)
    }
  }, [confirm])

  const sendRequest = async (inputs) => {
    const res = await axios
      .post(`http://localhost:2022/api/user/signup`, {
        name: inputs.name,
        email: inputs.email,
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

  const handleName = ({ target }) => {
    setName(target.value)
    console.log(name);
  }

  const handleEmail = ({ target }) => {
    setEmail(target.value)
    console.log(email);
  }

  const handlePassword = ({ target }) => {
    setPassword(target.value)
    console.log(password);
  }

  const handleConfirm = ({ target }) => {
    setConfirm(target.value)
    console.log(confirm);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let inputs = {
      name,
      email,
      password
    }

    console.log(inputs);

    if(nameCheck && passCheck && confirmCheck) {
      sendRequest(inputs)
        .then((data) => localStorage.setItem("userId", data.user._id))
        
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blogs"));
    }
  };

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
            Register
          </Typography>

          <TextField
            required={true}
            name="name"
            onChange={handleName}
            value={name}
            placeholder="Name"
            margin="normal"
            error={!nameCheck}
            helperText={nameCheck ? "" : "Username requires at least 3 characters"}
          />

          <TextField
            required={true}
            name="email"
            onChange={handleEmail}
            value={email}
            type={"email"}
            placeholder="Email"
            margin="normal"
          />

          <TextField
            required={true}
            name="password"
            onChange={handlePassword}
            value={password}
            type={"password"}
            placeholder="Password"
            margin="normal"
            error={!passCheck}
            helperText={passCheck ? "" : "Password requires at least 6 characters"}
          />

          <TextField
            required={true}
            name="confirm"
            onChange={handleConfirm}
            value={confirm}
            type={"password"}
            placeholder="Confirm password"
            margin="normal"
            error={!confirmCheck}
            helperText={confirmCheck ? "" : "Password doesn't match"}
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
            onClick={() => navigate('/login')}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Already have an account?
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Register