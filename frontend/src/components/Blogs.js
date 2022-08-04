import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const userId = localStorage.getItem("userId")

  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:2022/api/blog/${userId}/all`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);

  console.log(blogs);
  
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            //isUser={localStorage.getItem("userId") === blog.user}
            title={blog.title}
            content={blog.content}
            description={blog.description}
            imageURL={blog.img}
            userName={blog.user.name}
          />
        ))}
    </div>
  );
};

export default Blogs;
