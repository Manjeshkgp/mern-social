import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connect from "./database/mongodb.js";
import userRoute from "./routes/userRoute.js";
import postsRoute from "./routes/postsRoutes.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000", // this should be updated during production
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("disconnect", (reason) => {
    if (reason === "transport close") {
      // the disconnection was initiated by the client side via browser refreshing or closing browser
      console.log("disconnected");
    }
    // else the socket will automatically try to reconnect
  });
  socket.on("HomePagePosts", (HomePagePosts) => {
    // console.log(HomePagePosts)
    socket.on("liked_image", (likedPostData) => {
        console.log("liked")
      // console.log(alldata.post_id)
      // socket.emit("liked_response",{message:"image liked response got"})
      const updatedArray = HomePagePosts.map((singlePost) => {
        if (singlePost._id === likedPostData.post_id) {
            console.log(singlePost)
            singlePost?.likesArray.push({ username: "manjesh" })
          return {
            ...singlePost,
          };
        } else {
          return singlePost;
        }
      });
      socket.emit("newArrayForHome",updatedArray)
    });
  });
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/posts", express.static(path.join(__dirname, "posts")));
await connect();

app.get("/", (req, res) => {
  res.send("<h1>Home</h1>");
});

app.use("/", userRoute);
app.use("/", postsRoute);

app.use(passport.initialize());
passportConfig(passport);

httpServer.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
