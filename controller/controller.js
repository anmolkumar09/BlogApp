const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");

exports.registerController = async (req, resp) => {
  try {
    const { username, email, password } = req.body;
    //validation
    if (!username || !email || !password) {
      return resp.status(400).send({
        success: false,
        message: "Please enter all fields",
      });
    }
    //existing user
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return resp.status(401).send({
        success: false,
        message: "user already exists",
      });
    }

    //hashing password by using bcrypt
    const hashPassword = await bcrypt.hash(password, 10);

    //save new user
    const user = new userModel({ username, email, password: hashPassword });
    await user.save();
    return resp.status(201).send({
      success: true,
      message: "new User created",
      user,
    });
  } catch (err) {
    return resp.status(500).send({
      message: "Error in registration",
      success: false,
      err,
    });
  }
};

exports.getAllUsers = async (req, resp) => {
  try {
    let user = await userModel.find({});
    return resp.status(200).send({
      userCount: user.length,
      success: true,
      message: "All user data is fetched",
      user,
    });
  } catch (err) {
    return resp.status(500).send({
      success: false,
      message: "Error in get all user function",
      err,
    });
  }
};

exports.loginController = async (req, resp) => {
  try {
    const { email, password } = req.body;

    //validation.
    if (!email || !password) {
      return resp.status(401).send({
        success: false,
        message: "please enter valid fields",
      });
    }

    //check if user is already exist
    const user = await userModel.findOne({ email });

    if (!user) {
      return resp.status(200).send({
        success: false,
        message: "email is not registerd",
        user,
      });
    }

    //checking for password.
    const ispassword = await bcrypt.compare(password, user.password);
    if (!ispassword) {
      return resp.status(401).send({
        success: false,
        message: "invalid email or password",
      });
    }

    // when username and password is correct
    return resp.status(200).send({
      success: true,
      message: "Login is successfully",
      user, // later i will delete this is user because we will use token
    });
  } catch (err) {
    return resp.status(500).send({
      success: false,
      message: "login failed",
      err,
    });
  }
};

// delete user
exports.deleteController = async (req, resp) => {
  try {
    const { id } = req.params;
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return resp.status(400).send({
        success: false,
        message: "User not found",
      });
    }

    return resp.status(200).send({
      success: true,
      message: "User is Deleted",
      user,
    });
  } catch (err) {
    return resp.status(500).send({
      success: false,
      message: "something went wrong",
      err,
    });
  }
};
