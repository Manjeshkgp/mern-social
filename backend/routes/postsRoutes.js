import { Router } from "express";
import userSchema from "../models/User.js"
import postSchema from "../models/Post.js";
import passport from "passport";
import multer from "multer";
import fs from "fs";

const router = Router();
const auth = passport.authenticate("jwt",{session:false});
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "posts");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

const upload = multer({storage:storage});

// SEND POST
router.post("/users/post/:id",auth,upload.single("postImage"),async (req, res) => {
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
  const saveImage = new postSchema({
        description:req.body.description,
        data: fs.readFileSync("posts/" + req.file.filename),
        contentType: "image/png",  
        imgUrl:req.file.path,    
      });
  saveImage.save().then((result)=>{console.log("Image Saved Successfully")}).catch((err)=>{console.log(err)});
  userExist.posts.push(saveImage)
  userExist.save().then((result)=>{console.log("Post added to Posts")}).catch((err)=>{console.log(err)})
  // console.log(userExist, _id.length);
  res.json({message:"Image Saved Successfully" });
  console.log(req.file.path)
})

// GET POSTS

router.get("/users/post/:id",auth,async(req,res)=>{
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
  res.json(userExist?.posts);
})

export default router;