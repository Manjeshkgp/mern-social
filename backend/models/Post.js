import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    description:String,
    contentType:String,
    postedBy:String,
    postedByProfileImage:String,
    imgUrl:String,
    likes:{type:Number,default:0},
    comments:[Object],
    postedAt:{ type: Date, default: Date.now }
})

export default new mongoose.model("Post",postSchema);