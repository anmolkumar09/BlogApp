const express = require("express");

const {
  getAllBlogsController,
  getBLogController,
  createBlogController,
  updateBlogContorller,
  deleteBlogController,
  userBlogContorller,
} = require("../controller/blogController");
//router object
const router = express.Router();

//routes

//getting all blogs
router.get("/all-blog", getAllBlogsController);

//create blog.
router.post("/create-blog", createBlogController);

//update blog
router.put("/update-blog/:id", updateBlogContorller);

//delete blog
router.delete("/delete-blog/:id", deleteBlogController);

//getting single blog
router.get("/get-blog/:id", getBLogController);

//get user blog
router.get("/user-blog/:id", userBlogContorller);
module.exports = router;
