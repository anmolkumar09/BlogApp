const express = require("express");
const {
  getAllUsers,
  registerController,
  loginController,
  deleteController,
} = require("../controller/controller");

//router obj

const router = express.Router();

router.get("/all-users", getAllUsers);

router.post("/register", registerController);

router.post("/login", loginController);

router.delete("/user-delete/:id", deleteController);
module.exports = router;

// user 1 (login)
// "username": "xyz09",
// "email": "xyz123@gmail.com",
// "password":"12345" (hashPassword)

// new user
// "username":"Jhonny",
//     "email":"Jhonny@gmail.com",
//     "password":"Jhonny123",

// new user
// {
//   "username":"manish",
//   "email":"manish!123gmail.com",
//   "password":"manish123",
//   "blogs":[]
// }
