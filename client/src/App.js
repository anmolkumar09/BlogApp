import React from "react";
import Header from "./components/Header";
import Blog from "./pages/Blog";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBlog from "./pages/MyBlog";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/my-blogs" element={<MyBlog />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
