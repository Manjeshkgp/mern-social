const ProfilePageSocket = (socket) => {
  socket.on("profile_Data", (ProfileDataPosts) => {
    socket.on("like_image", (likedPostData) => {
      const updatedArray = ProfileDataPosts.map((singlePost) => {
        if (singlePost._id === likedPostData.post_id) {
          singlePost?.likesArray.push({ username: likedPostData.userUsername });
          return {
            ...singlePost,
          };
        } else {
          return singlePost;
        }
      });
      socket.emit("newArrayForHome", updatedArray);
      ProfileDataPosts = updatedArray;
    });
    socket.on("unlike_image", (unlikedPostData) => {
      const updatedArray = ProfileDataPosts.map((singlePost) => {
        if (singlePost._id === unlikedPostData.post_id) {
          const newLikesArray = singlePost?.likesArray.filter(
            (obj) => obj.username !== unlikedPostData.userUsername
          );
          return {
            ...singlePost,
            likesArray: newLikesArray,
          };
        } else {
          return singlePost;
        }
      });
      socket.emit("newArrayForHome", updatedArray);
      ProfileDataPosts = updatedArray;
    });
  });
};

export default ProfilePageSocket;