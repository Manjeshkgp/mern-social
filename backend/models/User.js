import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profileImage:{data:Buffer,contentType:String,imgUrl:String},
    // posts:{},
    // followDetails:{},
})

export default new mongoose.model("User",userSchema);