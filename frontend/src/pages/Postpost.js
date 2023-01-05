import Cookies from "js-cookie";
import React from "react";
import { PhotosIcon, CloseIcon } from "../assets/Icons";
import userDummyImage from "../assets/user.png";

const Postpost = () => {
  const username = Cookies.get("username");
  const identification = Cookies.get("identification");
  const token = Cookies.get("token");
  const [file, setFile] = React.useState(null);
  const [testValue,setTextValue] = React.useState("");
  const textRef = React.useRef(null)
  const [previewImg, setPreviewImg] = React.useState("");

  async function handleImageChange(e) {
    setFile(e.target.files[0]);
  }
  
  const previewProcess = async () => {
    if (file != null) {
      //   const requiredBlob = await file.blob();
      const previewImgUrl = URL.createObjectURL(file);
      setPreviewImg(previewImgUrl);
      console.log(previewImgUrl);
    }
    return;
  };
  const sendPost = async () => {
    const formdata = new FormData();
    formdata.append("postImage",file);
    formdata.append("description",testValue);
    formdata.append("contentType","image/png")
    const res = await fetch(
      `http://localhost:4000/users/post/${identification}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          enctype: "multipart/form-data; boundary=???"
        },
        body: formdata,
      }
    );
    const data = await res.json();
    console.log(data);
  };
  const handlePost = () =>{
    setTextValue(textRef.current?.value);
    sendPost()
}
  React.useEffect(() => {
    previewProcess();
  }, [file]);
  return (
    <>
      <div className="absolute w-full h-screen bg-black-rgba z-40 flex flex-col justify-center items-center">
        <div
          onClick={() => {
            /*Close that element*/
          }}
          className="absolute top-2 cursor-pointer right-2"
        >
          <CloseIcon />
        </div>
        {file === null ? (
          <div className="w-full md:w-96 h-[calc(100vh-5rem)] md:h-[30rem] flex justify-start items-center flex-col bg-[#262626] rounded-md">
            <p className="text-lg font-semibold text-white border-b-[0.5px] border-white w-full text-center">
              Create New Post
            </p>
            <div className="h-[calc(100vh-10rem)] mt-4 md:h-[26rem] flex flex-col justify-center items-center">
              <p className="text-lg font-semibold text-white">
                Drag a Photo here
              </p>
              <PhotosIcon />
              <form className="mt-4" onSubmit={e=>e.preventDefault()}>
                <input
                  type="file"
                  name="upload"
                  id="upload"
                  onChange={(e) => handleImageChange(e)}
                  className="hidden"
                />
                <label
                  htmlFor="upload"
                  className="text-sm font-medium px-2 bg-[#0095f6] rounded-md cursor-pointer text-white"
                >
                  Select file
                </label>
              </form>
            </div>
          </div>
        ) : (
          <div className="w-full md:w-[600px] h-[calc(100vh-5rem)] md:h-[30rem] flex justify-start items-center flex-col bg-[#262626] rounded-md">
            <p className="text-lg font-semibold text-white border-b-[0.5px] border-white w-full text-center">
              Create New Post
            </p>
            <div className="h-36 w-full mt-4 flex flex-row justify-around content-center md:h-[480px] md:grid md:grid-flow-col md:grid-cols-5 md:grid-rows-6 md:mb-0">
              <div className="mb-[calc(90vh-14rem)] md:row-span-1 md:col-span-2 md:mb-0 md:w-full md:h-full md:flex md:justify-evenly md:items-center">
                <img
                  src={`${userDummyImage}`}
                  alt=""
                  className="h-16 w-16 object-cover"
                />
                <p className="hidden md:block text-center text-white text-lg font-medium">
                  {username}
                </p>
              </div>
              <div className="mb-[calc(90vh-18rem)] md:mb-0 md:col-span-2 md:row-span-5 md:h-full md:w-full md:flex md:justify-center md:items-center">
                <textarea
                onChange={()=>{setTextValue(textRef.current.value)}}
                  ref={textRef}
                  placeholder="Write a caption..."
                  className="focus:outline-0 w-52 h-32 text-start pt-0 pl-0 text-sm overflow-y-scroll resize-none caret-white text-gray-50 bg-black md:h-[calc(100%-1rem)] md:w-[calc(100%-1rem)] md:bg-[#262626]"
                />
              </div>
              <div className="mb-[calc(90vh-14rem)] md:mb-0 md:col-span-3 md:row-span-6 md:h-full md:w-full md:flex md:justify-center md:items-center">
                <img
                  src={`${previewImg}`}
                  alt=""
                  className="h-16 w-16 object-cover md:h-[calc(100%-1rem)] md:w-[calc(100%-1rem)]"
                />
              </div>
            </div>
            <div className="h-8 w-full grid place-items-center">
                <button onClick={()=>{handlePost()}} className="text-sm font-medium px-2 bg-[#0095f6] rounded-sm text-center cursor-pointer text-white">Post</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Postpost;
