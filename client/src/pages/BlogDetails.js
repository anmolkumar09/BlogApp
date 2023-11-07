import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const [inputs, setInputs] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();

  //get Blog Details
  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(`/api/v1/blog/get-blog/${id}`);
      if (data?.success) {
        setBlog(data?.blog);
        setInputs({
          title: data.blog.title,
          description: data.blog.description,
          image: data.blog.image,
        });
        // navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getBlogDetail();
  }, [id]);
  console.log(blog);

  //   input change
  const handleChange = (e) => {
    setInputs((prevstate) => ({
      ...prevstate,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputs);
    try {
      let { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        alert("Blog is Updated");
        navigate("/my-blogs");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          classname="container"
          backgroundUrl={""}
          width={"50%"}
          border={2}
          borderRadius={"10px"}
          boxShadow={"10px 10px 20px #ccc"}
          margin={"50px auto"}
          padding={3}
          display={"flex"}
          flexDirection={"column"}
        >
          <Typography variant="h5" textAlign={"center"} color={"gray"}>
            Update a Post
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            title
          </InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            description
          </InputLabel>
          <TextField
            name="description"
            onChange={handleChange}
            value={inputs.description}
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            image URL
          </InputLabel>
          <TextField
            name="image"
            onChange={handleChange}
            value={inputs.image}
            variant="outlined"
            required
          />
          <Button
            color="warning"
            type="sumit"
            variant="contained"
            sx={{ margin: "20px auto" }}
          >
            Update
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BlogDetails;

//9:25
