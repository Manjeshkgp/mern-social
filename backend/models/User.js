import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    username:{type:String,required:true},
    profileImage:{contentType:String,imgUrl:String},
    posts:[Object],
    // followDetails:{},
})

export default new mongoose.model("User",userSchema);