import express from "express";
import userSchema from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

// REGISTER

router.post("/register", async (req, res) => {
  const { name, email, password, username } = await req.body;
  //check if user exists with same email
  const userExist = await userSchema.findOne({ email });
  const usernameExist = await userSchema.findOne({username:username.toLowerCase()});
  if (userExist) {
    res.status(406).json({ message: "User Already Existed" });
    return;
  }
  if(usernameExist){
    res.status(406).json({message:"Username Alrady Taken"});
    return;
  }

  //hash the password
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  // store user
  const registerUser = new userSchema({
    name: name,
    email: email,
    username:username.toLowerCase(),
    password: hashedPassword,
  });

  const saveUser = await registerUser.save();
  console.log(saveUser);
  res.status(200).json({ message: "User is Created" });
});

// LOGIN

router.post("/login", async (req, res) => {
  const { email, password } = await req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    res.status(406).json({ message: "User not found" });
    return;
  }
  const matched = await bcrypt.compareSync(password, user.password);
  if (!matched) {
    res.status(401).json({ message: "Password Incorrect" });
    return;
  }

  // When user email & password is correct, create jwt token

  const payload = {
    email: email,
    _id: user?._id,
    password,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.json({ message: "successfully logged in", token, user });
});

// passport.authenticate("jwt", { session: false }) // by using this just after any data api like user's posts api, the api will become user protected

// // SEND PROFILE IMAGE
router.post(
  "/users/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("userImage"),
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
    const saveImage = await userSchema.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          profileImage: {
            contentType: "image/png",
            imgUrl:req.file.path,
          },
        },
      }
    );
    saveImage.save().then((result)=>{console.log("Image Saved Successfully")}).catch((err)=>{console.log(err)})
    // console.log(userExist, _id.length);
    res.json({message:"Image Saved Successfully" });
  }
);

// GET PROFILE IMAGE

router.get("/users/:id",passport.authenticate("jwt",{session:false}),async(req,res)=>{
  const _id = req.params.id;
  const {profileImage,posts,username,name} = await userSchema.findOne({_id:_id})
  const image = profileImage.imgUrl
  res.json({image,posts,username,name});
})

// TESTING AUTHENTICATION

router.post(
  "/authentication",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userData = req.user;
    res.status(200).json({ data: userData });
  }
);

export default router;
