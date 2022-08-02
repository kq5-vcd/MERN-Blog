import React, { useState } from "react";
import { AppBar, Typography, Toolbar, Box, Button, Tabs, Tab } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useStyles } from "./utils";

const Header = () => {
  const classes = useStyles();
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [value, setValue] = useState();
  const navigate = useNavigate()
  
  return (
    <AppBar
      sx={{
        background: "black",
        position: "fixed",
        top: 0,
      }}
    >
      <Toolbar>
        <Typography 
          className={classes.font} 
          sx={{ color: "white", cursor: "pointer", font: "Playfair Display" }} 
          variant="h4" 
          onClick={() => {
            setValue(null)
            navigate("/")
          }}
        >
          PremiumThoughts
        </Typography>

        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"} marginRight="auto">
            <Tabs
              textColor="black"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                className={classes.font}
                LinkComponent={Link}
                to="/blogs"
                label="New Feeds"
              />
              <Tab
                className={classes.font}
                LinkComponent={Link}
                to="/myBlogs"
                label="My Blogs"
              />
              <Tab
                className={classes.font}
                LinkComponent={Link}
                to="/blogs/add"
                label="Add Blog"
              />
            </Tabs>
          </Box>
        )}

        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              {" "}
              <Button
                LinkComponent={Link}
                to="/login"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10, background: "#4D3636" }}
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="/register"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10, background: "#4D3636" }}
              >
                Signup
              </Button>
            </>
          )}
          
          {isLoggedIn && (
            <Button
              onClick={() => dispath(authActions.logout())}
              LinkComponent={Link}
              to="/"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10, background: "#1D4D42" }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
