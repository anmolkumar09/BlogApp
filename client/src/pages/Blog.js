import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  //get Blogs.
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");

      if (data && data.success) {
        setBlogs(data.blogs); //here i get my blogs and this blogs part come from bogController (function getAllBlogController)
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllBlogs();
  });
  return (
    <div>
      {blogs &&
        blogs.map((blog) => (
          <BlogCard
            id={blog?._id} //with the help of this we can access delete functionality.
            // with the help of this isUser we delete particular blog of particular user we get id ehich is avialable in localStorage
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.username}
            time={blog?.createdAt} //this createdAt property help to show date
          />
        ))}
    </div>
  );
};

export default Blog;

//11:00
