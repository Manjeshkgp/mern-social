import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { RightArrowIcon, LeftArrowIcon } from "../assets/Icons.js";
import Postsdiv from "../components/Postsdiv.js";
import dummyUserImage from "../assets/user.png";

const Home = ({ socket }) => {
  // const scrollRef = useRef(null);
  const [allPostsState, setAllPostsState] = useState([]);
  const [newlyJoinedUsers, setNewlyJoinedUsers] = useState([]);
  // const scrollLeft = () => {
  //   scrollRef.current.scrollLeft -= 200;
  // };
  // const scrollRight = () => {
  //   scrollRef.current.scrollLeft += 200;
  // };
  const pcSize = window.matchMedia("(min-width: 1023px)").matches;
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
    if (res.status === 200) {
      setAllPostsState(allposts);
      socket.emit("HomePagePosts", allposts);
    }
    // console.log(allPosts);
  };

  const fetchNewUsers = async () => {
    const res = await fetch("http://localhost:4000/allusers", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.status === 200) {
      setNewlyJoinedUsers(data.usersArray);
      console.log(newlyJoinedUsers)
    }
  };
  // Remember that MongoDB allows only 100-crud-operations/second, so loading of post's user image is a big deal
  useEffect(() => {
    if (pcSize === true) {
      fetchNewUsers();
    }
    fetchAllposts();
  }, []);

  return (
    <div className="flex flex-row mt-[45px] md:mt-4 justify-center md:ml-[72px] xl:ml-[220px] bg-[#121212]">
      <div className="bg-[#121212] w-[100vw] md:w-[470px] lg:mr-8">
        {/* <button onClick={e=>scrollLeft()} className="hidden h-[86px] w-4 bg-yellow-300 opacity-40 md:grid place-items-center absolute"><LeftArrowIcon/></button> */}
        {/* <button onClick={e=>scrollRight()} className="hidden h-[86px] w-4 bg-yellow-300 opacity-40 md:grid place-items-center absolute ml-[calc(470px-1rem)]"><RightArrowIcon/></button> */}
        {/* <div ref={scrollRef} className="statusesDiv bg-black rounded-lg border border-[#262626] h-[86px] flex flex-row items-center gap-2 overflow-x-scroll mx-1 md:overflow-hidden md:mx-3">
          <div className="h-20 w-16 bg-green-300 flex flex-col items-center">
            <div className="flex justify-center items-center h-[4rem] w-[4rem] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600"><img src="https://dummyimage.com/720x300" alt="" className="h-14 w-14 object-cover rounded-full outline-2"/></div>
            <p className="text-[11px] text-white font-normal max-w-[60px] text-center overflow-x-hidden text-ellipsis">
              Lorem_Ipsum
            </p>
          </div>
          <p className="text-white w-full text-center text-xl">Status Elements will be Added soon</p> 
        </div> */}
        <div className="postsDiv">
          <Postsdiv
            allPostsState={allPostsState}
            setAllPostsState={setAllPostsState}
            scrollTo={null}
            socket={socket}
          />
        </div>
      </div>
      <div className="bg-[#121212] hidden w-80 lg:flex lg:flex-col mt-4 items-center">
        <p className="text-white font-bold">Newly Joined on Imagegram</p>
        {newlyJoinedUsers.map((singleUser) => (
          <div key={singleUser._id} className="m-2 w-72 rounded-md flex bg-black">
            <div className="w-20 h-20 grid place-items-center">
              <img
                src={`http://localhost:4000/${singleUser?.profileImage?.imgUrl}`}
                onError={(e) => {
                  e.currentTarget.src = `${dummyUserImage}`;
                }}
                alt=""
                className="object-cover w-16 h-16 rounded-full border border-yellow-100"
              />
            </div>
            <div className="h-20 grid content-center mx-1">
              <p className="text-white font-bold">{singleUser.username}</p>
              <p className="text-white font-medium">{singleUser.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
