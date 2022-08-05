import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { useParams } from "react-router-dom";

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
      {user ? "" : "This user doesn't exist"}
      {user && (user.blogs.length == 0) && "This user has no post."}
      
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
        ))}
    </div>
  );
};

export default UserBlogs;
