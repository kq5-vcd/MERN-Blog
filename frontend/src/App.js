import Header from "./components/Header";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Momo from "./components/Momo"

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
      <main style={{marginTop: 65}}>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            <>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />{" "}
            </>
          )}

          <Route path="/" element={<Home isLoggedIn={isLoggedIn}/>} />
          <Route path="/momoTest" element={<Momo />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
