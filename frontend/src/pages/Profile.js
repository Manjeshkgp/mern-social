import React, { useState,useRef, useEffect } from "react";
import Cookies from "js-cookie";

const Profile = () => {
  const [height, setHeight] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    setHeight(elementRef.current.clientHeight);
  }, []);
  const [isHover, setIsHover] = useState(false);
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

  const hoverHappened = (e) => {
    setIsHover(true);
    console.log(e);
  };

  return (/*src={`http://localhost:4000/${image}`}*/
    <>
      <div className="bg-red-200 h-[18rem] mt-12 grid overflow-hidden">
  <div className="grid grid-cols-6 gap-2 h-72">
    <div className="ml-2 col-span-2 flex justify-center items-center h-28">
      <img src="https://dummyimage.com/721x401" alt="profile" className="object-cover rounded-full w-20 h-20" />
    </div>
    <div className="flex items-center justify-evenly col-span-4 h-28">
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
    <div ref={elementRef} className="heightcheck sm:mt-2 flex flex-col justify-start col-span-6 mb-12">
      <p className="text-lg font-bold ml-2 sm:ml-5">Manjesh Kumar Sharma</p>
      <p className="ml-2 sm:ml-5 text-sm">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia, nesciunt? Incidunt quaerat quam voluptates rerum necessitatibus ullam eum molestias numquam dolores delectus, distinctio quos quas at, accusantium ut sed culpa sunt veritatis natus animi.
      </p>
    </div>
  </div>
  <div className="h-8">
    <div className="flex justify-evenly fixed -mt-[21rem] bg-green-200 py-[0.75rem] w-[100vw] z-10"><button className="sm:hidden">Back</button><p>@manjeshkrsharma</p><button className="sm:hidden">Bell</button><button className="sm:hidden">:</button></div>
    <div className="flex justify-evenly items-center -translate-y-8"><button>Follow</button><button>Message</button></div>
  </div>
</div>
<div className="flex justify-around items-center flex-col flex-wrap my-[2vh]">
  <div onMouseEnter={(e)=>{hoverHappened(e)}} className="w-[30vw] h-[30vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center">
    <img src="https://dummyimage.com/721x401" alt="" className="object-cover w-[98%] h-[98%]" />
  </div>
  <div onMouseEnter={(e)=>{hoverHappened(e)}} className="w-[30vw] h-[30vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center">
    <img src="https://dummyimage.com/721x401" alt="" className="object-cover w-[98%] h-[98%]" />
  </div>
  <div onMouseEnter={(e)=>{hoverHappened(e)}} className="w-[30vw] h-[30vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center">
    <img src="https://dummyimage.com/721x401" alt="" className="object-cover w-[98%] h-[98%]" />
  </div>
  <div onMouseEnter={(e)=>{hoverHappened(e)}} className="w-[30vw] h-[30vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center">
    <img src="https://dummyimage.com/721x401" alt="" className="object-cover w-[98%] h-[98%]" />
  </div>
  <div onMouseEnter={(e)=>{hoverHappened(e)}} className="w-[30vw] h-[30vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center">
    <img src="https://dummyimage.com/721x401" alt="" className="object-cover w-[98%] h-[98%]" />
  </div>
</div>
    </>
  );
};

export default Profile;
