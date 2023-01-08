import { Router } from "express";
import userSchema from "../models/User.js";
import postSchema from "../models/Post.js";
import passport from "passport";
import multer from "multer";
import fs from "fs";
import mongoose from "mongoose";

const router = Router();
const auth = passport.authenticate("jwt", { session: false });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "posts");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// SEND POST
router.post(
  "/users/post/:id",
  auth,
  upload.single("postImage"),
  async (req, res) => {
    const _id = req.params.id;
    if (_id.length !== 24) {
      res.status(406).json({ message: `${_id} is invalid` });
      return;
    }
    const userExist = await userSchema.findOne({ _id: _id });
    if (!userExist || userExist === null) {
      res.status(403).json({ message: "User not found" });
      console.log(userExist);
      return;
    }
    const saveImage = await new postSchema({
      description: req.body.description,
      postedBy: userExist.username,
      postedByProfileImage: userExist.profileImage.imgUrl
        ? userExist.profileImage.imgUrl
        : "",
      contentType: "image/png",
      imgUrl: req.file.path,
    });
    saveImage
      .save()
      .then((result) => {
        console.log("Image Saved Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
    userExist.posts.push(saveImage);
    userExist
      .save()
      .then((result) => {
        console.log("Post added to Posts");
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(userExist, _id.length);
    res.json({ message: "Image Saved Successfully" });
    console.log(req.file.path);
  }
);

// GET POSTS // not much useful cause another route is doing the bigger work including this

// router.get("/users/post/:id",auth,async(req,res)=>{
//   const _id = req.params.id;
//   if (_id.length !== 24) {
//     res.status(406).json({ message: `${_id} is invalid` });
//     return;
//   }
//   const userExist = await userSchema.findOne({ _id: _id });
//   if (!userExist || userExist === null) {
//     res.status(403).json({ message: "User not found" });
//     console.log(userExist);
//     return;
//   }
//   res.json({posts:userExist?.posts});
// })

// GET POSTS FOR HOME PAGE

router.get("/allposts/:id", auth, async (req, res) => {
  const _id = req.params.id;
  if (_id.length !== 24) {
    res.status(406).json({ message: `${_id} is invalid` });
    return;
  }
  const allposts = await postSchema.find().sort({ postedAt: -1 });
  res.json({ allposts: allposts });
});

// LIKE AND UNLIKE A POST

router.post("/allposts/like/:username", auth, async (req, res) => {
  const username = req.params.username;
  const postId = req.body.postId;

  const thePost = await postSchema.findOne({ _id: postId });
  const postedBy = await thePost?.postedBy;
  if (thePost.likesArray.some((obj) => obj.username === username)) {
    await postSchema
      .findOneAndUpdate(
        { _id: postId },
        { $pull: { likesArray: { username: username } } }
      )
      .then((res) => console.log("unliked the post"))
      .catch((err) => console.log(err));
    await userSchema
      .findOneAndUpdate(
        { username: postedBy },
        {
          $pull: {
            "posts.$[post].likesArray": { username: { $eq: username } },
          },
        },
        { arrayFilters: [{ "post._id": postId }] }
      )
      .then((result) => {
        console.log("unliked post pushed");
      })
      .catch((err) => console.log(err));
    res.json({ message: "Post unliked" });
  } else {
    await thePost.likesArray.push({ username: username });
    await thePost.save();
    console.log("thePost is liked");
    await userSchema
      .findOneAndUpdate(
        { username: postedBy },
        { $addToSet: { "posts.$[post].likesArray": { username: username } } },
        { arrayFilters: [{ "post._id": postId }] }
      )
      .then((result) => {
        console.log("liked post pushed");
      })
      .catch((err) => console.log(err));
    res.status(200).json({ message: "Liked the post" });
  }
});

export default router;
