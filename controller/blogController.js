const blogModel = require("../models/blogModel");
const userModel = require("../models/userModels");
const mongoose = require("mongoose");
//get all blog
exports.getAllBlogsController = async (req, resp) => {
  try {
    //this comes in last part when i show data on fronted
    //i populate becasue fo user
    let blogs = await blogModel.find({}).populate("user");

    if (!blogs) {
      return resp.status(200).send({
        success: false,
        message: "No blogs Found",
      });
    }
    return resp.status(200).send({
      useCount: blogModel.length,
      success: true,
      message: "Blog Lists",
      blogs,
    });
  } catch (err) {
    return resp.status(500).send({
      success: false,
      message: "Error while getting Blogs",
      err,
    });
  }
};

//create blog
exports.createBlogController = async (req, resp) => {
  try {
    //this | user | destructuring is come in video 6
    const { title, description, image, user } = req.body;

    //validation
    if (!title || !description || !image || !user) {
      return (
        resp.status(400),
        send({
          success: false,
          message: "please provide all fields",
        })
      );
    }
    //checking if user is existing
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return resp.status(400).send({
        success: false,
        message: "Invalid User",
      });
    }
    //using mongoose session for updating blog by using array push method.

    const newBlog = new blogModel({ title, description, image, user });
    //-----------------------//

    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();

    //-----------------------//
    await newBlog.save();
    return resp.status(201).send({
      success: true,
      message: "Blog created",
      newBlog,
    });
  } catch (err) {
    return resp.status(400).send({
      success: false,
      message: "error in creating Blog",
      err,
    });
  }
};

//update blog
exports.updateBlogContorller = async (req, resp) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return resp.status(200).send({
      success: true,
      message: "blog updated",
      blog,
    });
  } catch (err) {
    return resp.status(500).send({
      success: false,
      message: "Error while updating",
      err,
    });
  }
};

//delete blog
exports.deleteBlogController = async (req, resp) => {
  try {
    const { id } = req.params;
    const deleteBlog = await blogModel.findByIdAndDelete(id).populate("user");
    //----------populate also come in video 6 ---//
    //pull method is used to delete from array.
    await deleteBlog.user.blogs.pull(deleteBlog);
    await deleteBlog.user.save();
    //---------- video 6 ---//
    return resp.status(200).send({
      success: true,
      message: "Blog is deleted",
      deleteBlog,
    });
  } catch (err) {
    return resp.status(400).send({
      success: false,
      message: "Something went wrong in deleteBlog",
      err,
    });
  }
};

//single blog
exports.getBLogController = async (req, resp) => {
  try {
    const { id } = req.params;

    const singleBlog = await blogModel.findById(id, { ...req.body });
    if (!singleBlog) {
      return resp.status(404).send({
        success: false,
        message: "blog not found with this id",
      });
    }
    return resp.status(200).send({
      success: true,
      message: "Single Blog fetched",
      singleBlog,
    });
  } catch (err) {
    return resp.status(400).send({
      success: false,
      message: "something went wrong",
      err,
    });
  }
};

// get user blog
exports.userBlogContorller = async (req, resp) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return resp.status(404).send({
        success: false,
        message: "blog not found with this id",
      });
    }
    return resp.status(200).send({
      success: true,
      message: "user Blogs",
      userBlog,
    });
  } catch (err) {
    return resp.status(400).send({
      success: false,
      message: "Something went wrong error in user blog",
      err,
    });
  }
};
