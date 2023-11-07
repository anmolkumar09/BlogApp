import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
const MyBlog = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");

      //network request id should be dynamic
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs); // (?) means if we get data then do some stuff
      }
    } catch (err) {
      console.log("error in getting the blog", err);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  console.log(blogs);
  return (
    <div style={{ margin: "50px 0 0 0" }}>
      {blogs && blogs.length > 0 ? (
        BlogCard(
          blogs.map((blog) => (
            <BlogCard
              id={blog._id}
              isUser={true}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              username={blog.username}
              time={blog.createdAt} //this createdAt property help to show date
            />
          ))
        )
      ) : (
        <h1>Haven't created Blog</h1>
      )}
    </div>
  );
};

export default MyBlog;
