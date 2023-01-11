import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import UserPosts from "../components/UserPosts";
import userProfileImage from "../assets/user.png";
import Postsdiv from "../components/Postsdiv";
import { LeftArrowIcon } from "../assets/Icons";

const Profile = () => {
  const [height, setHeight] = useState(0);
  const [scrollTo,setScrollTo] = useState(null)
  const [showPostsdiv, setShowPostsdiv] = useState(false);
  const elementRef = useRef(null);
  const tabSize = window.matchMedia("(min-width: 767px)").matches;
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [profileName, setProfileName] = useState("");
  const identification = Cookies.get("identification");
  const token = Cookies.get("token");
  const fetchProfile = async () => {
    const res = await fetch(`http://localhost:4000/users/${identification}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "image/png",
      },
    });
    const profileData = await res.json();
    setImage(profileData.image);
    setPosts(profileData.posts);
    setUsername(profileData.username);
    setProfileName(profileData.name);
    console.log(profileData.posts);
  };
  useEffect(() => {
    fetchProfile();
    setHeight(elementRef.current.clientHeight / 16);
  }, []);
  const profileImage = `http://localhost:4000/${image}`;
  // const base64String = image===[]?"":btoa(String.fromCharCode(...new Uint8Array(image)));
  // <img loading='lazy' src={`data:image/png;base64,${base64String}`} alt=""/>
  // everythin was fine just middleware loading causing some problem, see the browser console
  return (
    <div className="md:flex md:justify-center md:ml-[72px] xl:ml-[220px] bg-[#121212]">
      <div className="md:mx-5 md:max-w-[935px]">
        {!showPostsdiv ? (
          <>
            <div
              style={
                tabSize
                  ? { height: `${height + 8.875}rem` }
                  : { height: `${height + 9.875}rem` }
              }
              className={`bg-red-200 mt-12 grid overflow-hidden`}
            >
              <div
                style={
                  tabSize
                    ? { height: `${height + 8.875}rem` }
                    : { height: `${height + 8.875}rem` }
                }
                className={`grid grid-cols-6 md:content-center`}
              >
                {/* height:`${height+5}rem` */}
                <div
                  style={tabSize ? {} : {}}
                  className="ml-2 col-span-2 md:row-span-2 flex justify-center items-center h-20 mt-2 mx-2 md:h-full"
                >
                  <img
                    onError={(e) => (e.currentTarget.src = userProfileImage)}
                    src={`http://localhost:4000/${image}`}
                    alt="profile"
                    className="object-cover rounded-full w-20 h-20 md:w-44 md:h-44"
                  />
                </div>
                <div className="flex items-center justify-evenly col-span-4 md:row-span-1 h-20 mt-2 ml-1 md:h-8 md:justify-start md:max-w-[613px] md:ml-[28.8vw] md:mt-5 md:pt-[68px] md:absolute md:flex-row lg:ml-[19rem] xl:ml-[19.5rem]">
                  <div className="md:flex md:flex-row mr-3">
                    <p className="font-[650] md:mr-1">{posts.length}</p>
                    <p className="font-medium">Posts</p>
                  </div>
                  <div className="md:flex mr-3">
                    <p className="font-[650] md:mr-1">71.2M</p>
                    <p className="font-medium">Followers</p>
                  </div>
                  <div className="md:flex mr-3">
                    <p className="font-[650] md:mr-1">2K</p>
                    <p className="font-medium">Following</p>
                  </div>
                </div>
                <div
                  ref={elementRef}
                  className="flex flex-col justify-start col-span-6 md:col-span-4 md:row-span-1 mb-20 md:h-auto md:max-w-[613px] md:ml-0 md:mb-0 md:mt-20"
                >
                  <p className="text-lg font-bold">{profileName}</p>
                  <p className="text-md">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Sit adipisci inventore amet dolores tenetur fuga magni,
                    officiis quaerat quia quasi fugiat quo animi illo reiciendis
                    mollitia qui eveniet enim veritatis exercitationem? Dolorum
                    tempore exercitationem voluptatum libero repellat unde
                    rerum, eligendi nostrum consequuntur alias, repudiandae
                    corrupti id debitis quo quos tenetur.
                  </p>
                </div>
              </div>
              <div className="h-8 md:flex md:justify-start items-center md:h-12 md:absolute md:font-semibold md:text-lg md:mt-4 md:max-w-[613px]">
                <div
                  style={
                    tabSize
                      ? { marginTop: `${0}rem` }
                      : { marginTop: `-${height + 11.875}rem` }
                  }
                  className="flex justify-evenly fixed bg-green-200 py-[0.75rem] w-[100vw] z-10 border-b border-black md:block md:py-0 md:z-0 md:w-auto md:static md:items-center md:flex-row md:justify-start md:max-w-[613px] md:ml-[28.8vw] lg:ml-[19rem] xl:ml-[19.5rem]"
                  // className="flex justify-evenly bg-green-200 py-[0.75rem] w-[100vw] z-10 border-b border-black absolute top-0" try this for mobile devices
                >
                  <button className="md:hidden">Back</button>
                  <p className="md:text-2xl">{username}</p>{" "}
                  {/* not more than 17 characters design problems might occur */}
                  <button className="md:hidden">Bell</button>
                  <button className="md:hidden">:</button>
                </div>
                <div className="grid grid-cols-9 -translate-y-4 md:translate-y-0 md:flex md:justify-end">
                  <button className="col-span-4 border border-transparent mx-1 rounded bg-gray-500 text-center md:ml-4 font-medium">
                    Follow
                  </button>
                  <button className="col-span-4 border border-transparent mx-1 rounded bg-gray-500 text-center md:ml-4 font-medium">
                    Message
                  </button>
                  <button className="col-span-1 border border-transparent mx-1 rounded bg-gray-500 text-center font-medium md:hidden">
                    🤝
                  </button>
                </div>
              </div>
            </div>
            {/*top-12,sticky & -weebkit-sticky helps to get position sticky after 3rem from the top of the screen like instagram*/}
            <div
              style={{ position: "-webkit-sticky" }}
              className="flex justify-around md:px-44 border-black border-b sticky h-8 top-12 bg-yellow-300 md:border-t md:border-b-0 md:static"
            >
              <button className="focus:border-b-2 focus:border-black focus:mb-0 w-full mb-[2px] md:focus:border-t-2 md:focus:border-b-0">
                Posts
              </button>
              <button className="focus:border-b-2 focus:border-black focus:mb-0 w-full mb-[2px] md:focus:border-t-2 md:focus:border-b-0">
                Reels
              </button>
              <button className="focus:border-b-2 focus:border-black focus:mb-0 w-full mb-[2px] md:focus:border-t-2 md:focus:border-b-0">
                Tags
              </button>
            </div>
            <div className="flex justify-start items-center flex-row flex-wrap md:justify-around md:gap-4 md:mt-4 margin-break:mx-2 mb-12">
              <UserPosts
                height={height}
                profileImage={profileImage}
                posts={posts}
                setShowPostsdiv={setShowPostsdiv}
                setScrollTo={setScrollTo}
              />
            </div>
          </>
        ) : (<div>
          <div className="sticky top-0 h-12 w-full text-white text-xl font-semibold flex flex-row justify-between items-center bg-[#252525] rounded-b-md border-b border-x border-[#555555]"><p onClick={()=>{setShowPostsdiv(false)}} className="ml-2 cursor-pointer"><LeftArrowIcon/></p><p className="mr-2">Posts</p></div>
          <div className="sticky bottom-0 top-[calc(100vh-5rem)] w-full text-white text-xl font-semibold flex justify-end items-center"><div onClick={()=>{setShowPostsdiv(false)}} className="rounded-full bg-[#67d7ff52] h-8 w-8 grid place-items-center mr-2 mb-2 cursor-pointer"><LeftArrowIcon/></div></div>
          <Postsdiv allPostsState={posts} setAllPostsState={setPosts} scrollTo={scrollTo} />
        </div>)}
      </div>
    </div>
  );
};

export default Profile;
