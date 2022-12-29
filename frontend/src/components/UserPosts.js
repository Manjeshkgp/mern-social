import { useState,useRef } from "react";

export default function UserPosts({height}) {
  const [isLongPress, setIsLongPress] = useState(false);
  const timeoutId = useRef(null);

  const handleTouchStart = () => {
    console.log("touch start")
    timeoutId.current = setTimeout(() => {
      setIsLongPress(true);
    }, 500); // Adjust this value to change the long press threshold
  };

  const handleTouchEnd = () => {
    clearTimeout(timeoutId.current);
    setIsLongPress(false);
  };

  return (
    <>
      {isLongPress ? (
        <div>
          <div style={{transform:`translateY(-${height+11.25}rem)`}} className={`fixed h-[100vh] w-[100vw] bg-blue-500`}>a</div>
        </div>
      ) : (
        ""
      )}
      <button onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onClick={()=>console.log("click")}>Long Press Me</button>
      <div className="w-[33.33vw] h-[33.33vw] sm:w-[24vw] sm:h-[24vw] bg-blue-300 flex flex-col justify-center items-center">
        <img
          src="https://dummyimage.com/721x401"
          alt=""
          className="object-cover w-[98%] h-[98%]"
        />
      </div>
    </>
  );
}
