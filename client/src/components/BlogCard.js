import React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import ModeEditOutlineOutlined from "@mui/icons-material/ModeEditOutlineOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function BlogCard({
  title,
  time,
  description,
  image,
  id,
  isUser,
  username,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog is deleted");

        // The location.reload() method reloads the current URL, like the Refresh button.
        window.location.reload();
      }
    } catch (err) {
      console.log("error in handleDelete function", err);
    }
  };
  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        padding: "5px",
        borderRadius: "16px",
        boxShadow: "5px 5px 10px #ccc",
        mt: 10,
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
          transition: "ease-in-out",
        },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={title}
        subheader={time}
      />

      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          title: {title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Description: {description}
        </Typography>
      </CardContent>
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit}>
            <ModeEditOutlineOutlined color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
    </Card>
  );
}
