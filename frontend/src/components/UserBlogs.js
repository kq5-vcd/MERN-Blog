import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { useParams } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import Momo from "./Momo";

const UserBlogs = ({self}) => {
  const [user, setUser] = useState();
  const params = useParams()
  const userId = localStorage.getItem("userId");

  let url 
  if(self) {
    url = `http://localhost:2022/api/blog/${userId}/user/${userId}`
  } else {
    const id = params.id

    url = `http://localhost:2022/api/blog/${userId}/user/${id}`
  }

  const sendRequest = async () => {
    const res = await axios
      .get(url)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  console.log(user);
  
  return (
    <div>
      {user ? "" : 
      <Paper sx={{
        backgroundColor: "white",
        display: 'flex',
        width: "50%",
        margin: "auto",
        borderRadius: 6,
        mt: 2,
        padding: 2,
        boxShadow: 9,
        alignContent: "center"
        
      }}>
        <Typography fontSize= {30}
          sx={{
            width: 1/2,
            margin: "auto"
        }}>
          This user doesn't exist
        </Typography>
      </Paper>}
      {user && (user.blogs.length == 0) && 
        <Paper sx={{
          backgroundColor: "white",
          display: 'flex',
          width: "50%",
          margin: "auto",
          borderRadius: 6,
          mt: 2,
          padding: 2,
          boxShadow: 9,
          alignContent: "center"
          
        }}>
          <Typography fontSize= {30}
            sx={{
              width: 1/2,
              margin: "auto"
          }}>
            This user has no post.
          </Typography>
        </Paper>
      }
      
      {user &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={self}
            title={blog.title}
            description={blog.description}
            imageURL={blog.img}
            user={user}
          />
        ))
      }

      {!self &&  <Momo />}
    </div>
  );
};

export default UserBlogs;
