import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tab,
  Tabs,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
const Header = () => {
  //Normal state
  const [value, setValue] = useState();
  //global state
  let islogin = useSelector((state) => state.islogin);
  islogin = islogin || localStorage.getItem("userId");
  console.log(islogin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      alert("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <AppBar sx={{ backgroundColor: "teal" }}>
        <Toolbar>
          <Typography variant="h4">My Blog App</Typography>

          {/* checking user is login or not  then it will show blog and my-blog button*/}
          {islogin && (
            <Box display={"flex"} marginLeft="auto" marginRight="auto">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  to="/create-blog"
                />
                <Tab label="My-Blogs" LinkComponent={Link} to="/my-blogs" />
              </Tabs>
            </Box>
          )}
          {/* if user is not login */}
          <Box display={"flex"} marginLeft="auto">
            {!islogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ color: "white", margin: 1 }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {/* if user is login  */}
            {islogin && (
              <Button onClick={handleLogout} sx={{ color: "white", margin: 1 }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      ;
    </>
  );
};

export default Header;
//6:00
