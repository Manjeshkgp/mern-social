import mongoose from "mongoose";

mongoose.set('strictQuery', false);
const connect = async () => {
  await mongoose.connect(process.env.MongoDBURI);
};

export default connect;