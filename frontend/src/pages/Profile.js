import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import UserPosts from "../components/UserPosts";

const Profile = () => {
  const [height, setHeight] = useState("");
  const elementRef = useRef(null);

  useEffect(() => {
    setHeight(elementRef.current.clientHeight / 16);
  }, []);
  const [image, setImage] = useState("");
  const identification = Cookies.get("identification");
  const token = Cookies.get("token");
  const fetchProfile = async () => {
    const res = await fetch(`http://localhost:4000/users/${identification}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "image/png",
      },
    });
    const imageurl = await res.json();
    setImage(imageurl.image);
    console.log(imageurl);
  };
  useEffect(() => {
    // fetchProfile()
  }, []);
  // const base64String = image===[]?"":btoa(String.fromCharCode(...new Uint8Array(image)));
  // <img loading='lazy' src={`data:image/png;base64,${base64String}`} alt=""/>
  // everythin was fine just middleware loading causing some problem, see the browser console

  return (
    /*src={`http://localhost:4000/${image}`}*/
    <>
      <div
        style={{ height: `${height + 8.875}rem` }}
        className={`bg-red-200 mt-12 grid overflow-hidden`}
      >
        <div
          style={{ height: `${height + 8.875}rem` }}
          className={`grid grid-cols-6`}
        >
          <div className="ml-2 col-span-2 flex justify-center items-center h-20 mt-2 mx-2">
            <img
              src="https://dummyimage.com/721x401"
              alt="profile"
              className="object-cover rounded-full w-20 h-20"
            />
          </div>
          <div className="flex items-center justify-evenly col-span-4 h-20 mt-2 mx-2">
            <div>
              <p className="font-[650]">569</p>
              <p className="font-medium">Posts</p>
            </div>
            <div>
              <p className="font-[650]">71.2M</p>
              <p className="font-medium">Followers</p>
            </div>
            <div>
              <p className="font-[650]">2K</p>
              <p className="font-medium">Following</p>
            </div>
          </div>
          <div
            ref={elementRef}
            className="heightcheck sm:mt-2 flex flex-col justify-start col-span-6 mb-20"
          >
            <p className="text-lg font-bold ml-2 sm:ml-5">
              Manjesh Kumar Sharma
            </p>
            <p className="ml-2 sm:ml-5 text-sm">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit adipisci inventore amet dolores tenetur fuga magni, officiis quaerat quia quasi fugiat quo animi illo reiciendis mollitia qui eveniet enim veritatis exercitationem? Dolorum tempore exercitationem voluptatum libero repellat unde rerum, eligendi nostrum consequuntur alias, repudiandae corrupti id debitis quo quos tenetur.</p>
          </div>
        </div>
        <div className="h-8">
          <div
            style={{ marginTop: `-${height + 11.875}rem` }}
            className={`flex justify-evenly fixed bg-green-200 py-[0.75rem] w-[100vw] z-10 border-b border-black`}
          >
            <button className="sm:hidden">Back</button>
            <p>@manjeshkrsharma</p>
            <button className="sm:hidden">Bell</button>
            <button className="sm:hidden">:</button>
          </div>
          <div className="grid grid-cols-9 -translate-y-10">
            <button className="col-span-4 border border-transparent mx-1 rounded bg-gray-500 text-center font-medium">Follow</button>
            <button className="col-span-4 border border-transparent mx-1 rounded bg-gray-500 text-center font-medium">Message</button>
            <button className="col-span-1 border border-transparent mx-1 rounded bg-gray-500 text-center font-medium">🤝</button>
          </div>
        </div>
      </div>                                                                                                  {/*top-12,sticky & -weebkit-sticky helps to get position sticky after 3rem from the top of the screen like instagram*/}
      <div style={{ position:"-webkit-sticky"}} className="flex justify-around border-black border-b sticky h-8 top-12 bg-yellow-300">
        <button className="focus:border-b-2 focus:border-black focus:mb-0 w-full mb-[2px]">Posts</button>
        <button className="focus:border-b-2 focus:border-black focus:mb-0 w-full mb-[2px]">Reels</button>
        <button className="focus:border-b-2 focus:border-black focus:mb-0 w-full mb-[2px]">Tags</button>
      </div>
      <UserPosts height={height}/>
      <div className="flex justify-start items-center flex-row flex-wrap">
        <div
          
          className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src="https://dummyimage.com/721x401"
            alt=""
            className="object-cover w-[98%] h-[98%]"
          />
        </div>
        <div
          
          className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src="https://dummyimage.com/721x401"
            alt=""
            className="object-cover w-[98%] h-[98%]"
          />
        </div>
        <div
          
          className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src="https://dummyimage.com/721x401"
            alt=""
            className="object-cover w-[98%] h-[98%]"
          />
        </div>
        <div
          
          className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src="https://dummyimage.com/721x401"
            alt=""
            className="object-cover w-[98%] h-[98%]"
          />
        </div>
        <div
          
          className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src="https://dummyimage.com/721x401"
            alt=""
            className="object-cover w-[98%] h-[98%]"
          />
        </div>
        <div
          
          className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src="https://dummyimage.com/721x401"
            alt=""
            className="object-cover w-[98%] h-[98%]"
          />
        </div>
        <div
          
          className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src="https://dummyimage.com/721x401"
            alt=""
            className="object-cover w-[98%] h-[98%]"
          />
        </div>
        <div
          
          className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src="https://dummyimage.com/721x401"
            alt=""
            className="object-cover w-[98%] h-[98%]"
          />
        </div>
        <div
          
          className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src="https://dummyimage.com/721x401"
            alt=""
            className="object-cover w-[98%] h-[98%]"
          />
        </div>
        <div
          
          className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src="https://dummyimage.com/721x401"
            alt=""
            className="object-cover w-[98%] h-[98%]"
          />
        </div>
        <div
          
          className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src="https://dummyimage.com/721x401"
            alt=""
            className="object-cover w-[98%] h-[98%]"
          />
        </div>
        <div
          
          className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src="https://dummyimage.com/721x401"
            alt=""
            className="object-cover w-[98%] h-[98%]"
          />
        </div>
        <div
          
          className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src="https://dummyimage.com/721x401"
            alt=""
            className="object-cover w-[98%] h-[98%]"
          />
        </div>
        <div
          
          className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src="https://dummyimage.com/721x401"
            alt=""
            className="object-cover w-[98%] h-[98%]"
          />
        </div>
        <div
          
          className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src="https://dummyimage.com/721x401"
            alt=""
            className="object-cover w-[98%] h-[98%]"
          />
        </div>
        <div
          
          className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src="https://dummyimage.com/721x401"
            alt=""
            className="object-cover w-[98%] h-[98%]"
          />
        </div>
        <div
          
          className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center"
        >
          <img
            src="https://dummyimage.com/721x401"
            alt=""
            className="object-cover w-[98%] h-[98%]"
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
