import React, { useState } from "react";
import { AppBar, Typography, Toolbar, Box, Button, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useStyles } from "./utils";

const Header = () => {
  const classes = useStyles();
  const dispath = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [value, setValue] = useState();
  return (
    <AppBar
      sx={{
        background:
          "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(46,171,219,1) 30%, rgba(28,252,185,1) 64%)",
        position: "fixed",
        top: 0,
      }}
    >
      <Toolbar>
        <Typography className={classes.font} sx={{ color: "#B0840B" }} variant="h4">
          PremiumThoughts
        </Typography>

        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"} marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                className={classes.font}
                LinkComponent={Link}
                to="/blogs"
                label="All Blogs"
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
                sx={{ margin: 1, borderRadius: 10, background: "#E035FC" }}
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="/register"
                variant="contained"
                sx={{ margin: 1, borderRadius: 10, background: "#E035FC" }}
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
              sx={{ margin: 1, borderRadius: 10, background: "#E035FC" }}
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
