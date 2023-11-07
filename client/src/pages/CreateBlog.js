import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./createblog.css";
import styled from "@emotion/styled";
const CreateBlog = () => {
  const id = localStorage.getItem("userId");

  const navigate = useNavigate(); // iski help se redirect karlenge.
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
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
      let { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        alert("Blog is created");
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
            Create a Post
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
          <Button type="sumit" variant="contained" sx={{ margin: "20px auto" }}>
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
