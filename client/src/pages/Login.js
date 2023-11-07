import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//this is used when we enter in login page i dont want to show login and regsiter button both useDispatch and authActions.
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
const Login = () => {
  //now to store entries name , email and password.
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      const { data } = await axios.post("api/v1/user/login", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (!data.success) {
        alert("please check your id and Password");
      }
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        // console.log(userdata);
        dispatch(authActions.login());
        alert("User Login Successfully");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
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
        height="60vh"
      >
        <Typography variant="h4" padding={3} textAlign={"center"}>
          Login
        </Typography>

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
          onClick={() => navigate("/register")}
        >
          Not a User | Please Register
        </Button>
      </Box>
    </form>
  );
};

export default Login;
