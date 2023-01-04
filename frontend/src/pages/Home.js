import React, { useEffect,useRef } from "react";
import Cookies from "js-cookie";
import { RightArrowIcon,LeftArrowIcon } from "../assets/Icons.js";

const Home = () => {
  const scrollRef = useRef(null);
  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 200;
  };
  const scrollRight = () => {
    scrollRef.current.scrollLeft += 200;
  };
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
    console.log(allposts);
  };
  // Remember that MongoDB allows only 100-crud-operations/second, so loading of post's user image is a big deal
  useEffect(() => {
    console.log("fetching");
    fetchAllposts();
  }, []);

  return (
    <div className="flex flex-row mt-[45px] md:mt-4 justify-center md:ml-[72px] xl:ml-[220px]">
      <div className="bg-gray-500 w-[100vw] md:w-[470px] lg:mr-8">
        <button onClick={e=>scrollLeft()} className="hidden h-[86px] w-4 {/*bg-yellow-300*/} opacity-40 md:grid place-items-center absolute"><LeftArrowIcon/></button>
        <button onClick={e=>scrollRight()} className="hidden h-[86px] w-4 {/*bg-yellow-300*/} opacity-40 md:grid place-items-center absolute ml-[calc(470px-1rem)]"><RightArrowIcon/></button>
        <div ref={scrollRef} className="reelsDiv h-[86px] flex flex-row items-center gap-2 overflow-x-scroll mx-1 md:overflow-hidden md:mx-3">
          <div className="h-20 w-16 bg-green-300 flex flex-col items-center">
            <div className="flex justify-center items-center h-[4rem] w-[4rem] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600"><img src="https://dummyimage.com/720x300" alt="" className="h-14 w-14 object-cover rounded-full outline-2"/></div>
            <p className="text-[11px] text-white font-normal max-w-[60px] text-center overflow-x-hidden text-ellipsis">
              Lorem_Ipsum
            </p>
          </div>
        </div>
        <div className="postsDiv">
          
        </div>
      </div>
      <div className="bg-green-200 hidden lg:block w-80">b</div>
    </div>
  );
};

export default Home;
