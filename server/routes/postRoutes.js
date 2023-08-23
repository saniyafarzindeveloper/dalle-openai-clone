import express from "express";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

import Post from "../mongodb/models/post.js";

dotenv.config();

//creating a new instance of the router
const router = express.Router();

//cloudinary configurations
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//GET route to get all posts
router.route("/").get(async (req, res) => {
  try {
    const posts = await Post.find({});

    //fetch all posts
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

//create a post route --> upload on cloudinary before creating an instance of it
router.route("/").post(async (req, res) => {
  try {
    //destructuring props which are being sent from the frontend
    const { name, prompt, photo } = req.body;

    //upload the photo url to cloudinary
    const photoUrl = await cloudinary.uploader.upload(photo);

    //creating the post in DB
    const newPost = await Post.create({
      //passing an obj
      name,
      prompt,
      photo: photoUrl.url,
    });

    //the request has succeeded and has led to the creation of a resource.
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    //500 status code = internal server error
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
