import Header from "./components/Header";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Momo from "./components/Momo"
import OAuth from "./components/OAuth";

import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";

import "./App.css";

function App() {
  const dispath = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispath(authActions.login());
    }
  }, [dispath]);
  
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main style={{marginTop: 55, paddingTop: 10}}>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login/:id" element={<OAuth />} />
            </>
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs self={true}/>} />
              <Route path="/user/:id" element={<UserBlogs self={false}/>} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/momoTest" element={<Momo />} />
            </>
          )}

          <Route path="/" element={<Home className="home" isLoggedIn={isLoggedIn}/>} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
