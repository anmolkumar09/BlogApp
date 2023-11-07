import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  //now to store entries name , email and password.
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  //  handleChange
  const handleChange = (e) => {
    setInputs((preValue) => ({
      ...preValue,
      [e.target.name]: e.target.value,
    }));
  };

  // form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputs);
    try {
      const { data } = await axios.post("api/v1/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        alert("User Register Successfully");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} style={{ marginTop: "150px" }}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          maxWidth={500}
          padding={5}
          margin="auto"
          boxShadow="10px 10px 20px #ccc"
        >
          <Typography variant="h4" padding={3} textAlign={"center"}>
            Register
          </Typography>
          <TextField
            placeholder="name"
            name="name"
            margin="normal"
            value={inputs.name}
            onChange={handleChange}
            required
          />
          <TextField
            placeholder="email"
            name="email"
            margin="normal "
            value={inputs.email}
            //onchange for typing in field
            onChange={handleChange}
            required
          />
          <TextField
            placeholder="password"
            name="password"
            margin="normal"
            value={inputs.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "5px", borderRadius: "15px" }}
          >
            Submit
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: "10px", borderRadius: "15px" }}
            onClick={() => navigate("/login")}
          >
            Already Register | Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
