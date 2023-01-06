import React, { useEffect,useRef, useState } from "react";
import Cookies from "js-cookie";
import { RightArrowIcon,LeftArrowIcon,LikeIcon,CommentIcon,ShareIcon,SaveIcon } from "../assets/Icons.js";
import userProfileImage from "../assets/user.png"

const Home = () => {
  const scrollRef = useRef(null);
  const [allPosts,setAllPosts] = useState([]);
  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 200;
  };
  const scrollRight = () => {
    scrollRef.current.scrollLeft += 200;
  };
  const descControl = (e)=>{
    const classes = e.currentTarget.classList;
    if(classes.contains("customEllipsis")){
      classes.remove("customEllipsis");
    }
    else{
      classes.add("customEllipsis");
    }
  }
  const postComment = (commentString)=>{
    // create backend route, then add code here
    console.log(commentString)
  }
  const fetchAllposts = async () => {
    const token = Cookies.get("token");
    const identification = Cookies.get("identification");
    const res = await fetch(
      `http://localhost:4000/allposts/${identification}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      }
    );
    const { allposts } = await res.json();
    if(res.status===200){
      setAllPosts(allposts)
    }
    // console.log(allPosts);
  };
  // Remember that MongoDB allows only 100-crud-operations/second, so loading of post's user image is a big deal
  useEffect(() => {
    // console.log("fetching");
    fetchAllposts()
  }, []);

  return (
    <div className="flex flex-row mt-[45px] md:mt-4 justify-center md:ml-[72px] xl:ml-[220px] bg-[#121212]">
      <div className="bg-[#121212] w-[100vw] md:w-[470px] lg:mr-8">
        <button onClick={e=>scrollLeft()} className="hidden h-[86px] w-4 {/*bg-yellow-300*/} opacity-40 md:grid place-items-center absolute"><LeftArrowIcon/></button>
        <button onClick={e=>scrollRight()} className="hidden h-[86px] w-4 {/*bg-yellow-300*/} opacity-40 md:grid place-items-center absolute ml-[calc(470px-1rem)]"><RightArrowIcon/></button>
        <div ref={scrollRef} className="reelsDiv bg-black rounded-lg border border-[#262626] h-[86px] flex flex-row items-center gap-2 overflow-x-scroll mx-1 md:overflow-hidden md:mx-3">
          <div className="h-20 w-16 bg-green-300 flex flex-col items-center">
            <div className="flex justify-center items-center h-[4rem] w-[4rem] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600"><img src="https://dummyimage.com/720x300" alt="" className="h-14 w-14 object-cover rounded-full outline-2"/></div>
            <p className="text-[11px] text-white font-normal max-w-[60px] text-center overflow-x-hidden text-ellipsis">
              Lorem_Ipsum
            </p>
          </div>
        </div>
        <div className="postsDiv">
          {allPosts.map((singlePost)=>(<div key={singlePost._id} className='flex justify-center items-center my-4 border border-[#262626] rounded-lg'>
            <div className="bg-black flex flex-col rounded-lg">
              <div className="h-12 flex items-center justify-start">
                <img src={`http://localhost:4000/${singlePost.postedByProfileImage}`} alt="" onError={(e)=>e.currentTarget.src=userProfileImage} className="h-8 w-8 rounded-full object-cover ml-2"/>
                <p className="ml-2 font-medium text-white">{singlePost.postedBy}</p>
              </div>
              <img src={`http://localhost:4000/${singlePost.imgUrl}`} alt="Loading..." className="w-[100%] h-full max-h-[calc(100vh_-_12rem)] object-cover"/>
              <div className="flex items-center justify-around h-12 border-b border-[#262626]">
                <p className="font-medium text-white"><LikeIcon/></p>
                <p className="font-medium text-white"><CommentIcon/></p>
                <p className="font-medium text-white"><ShareIcon/></p>
                <p className="font-medium text-white"><SaveIcon/></p>
              </div>
              <div className="flex items-start flex-col justify-around mb-1">
                <div className="ml-2 mr-2 font-semibold text-white">{singlePost.likes} Likes</div>
                <div className="ml-2 mr-2"><p onClick={(e)=>{descControl(e)}} className="customEllipsis text-white">{singlePost.description}</p></div>
                <div className="ml-2 mr-2 text-gray-300 cursor-pointer">{singlePost.comments.length===0?"":`View all ${singlePost.comments.length} comments`}</div>
                <div className="ml-2 mr-2 text-sm text-gray-300">{singlePost.postedAt} 1 day ago</div>
              </div>
              <div className="flex justify-around items-center border-t border-[#262626]">
                <textarea className="resize-y focus:outline-none w-full ml-2 rounded-sm text-gray-200 bg-black" placeholder="Write a comment..." rows="1"></textarea>
                <button onClick={(e)=>{postComment(e.currentTarget.previousElementSibling.value)}} className="text-white p-2">Post</button>
              </div>
            </div>
          </div>))}
          
        </div>
      </div>
      <div className="bg-green-200 hidden lg:block w-80">suggestions from IG to make friends</div>
    </div>
  );
};

export default Home;
