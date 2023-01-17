import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GalleryIcon } from '../assets/Icons';
import dummyUserImage from "../assets/user.png";
import Messages from '../components/Messages';

const Chat = () => {
    const [messages,setMessages] = useState([]);
    const {anotherUserId} = useParams();
    const identification = Cookies.get("identification");
    const fetchChat = async () => {
        const res = await fetch(`http://localhost:4000/chat/find/${identification}/${anotherUserId}`,{
            headers:{
                "Content-Type":"application/json"
            }
        });
        const ChatObj = await res.json();
        if(res.status===200){
            const secondRes = await fetch(`http://localhost:4000/message/${ChatObj._id}`)
            const allMessages = await secondRes.json()
            if(secondRes.status===200){
                console.log(allMessages);
                setMessages(allMessages);
            }
        }
    }
    useEffect(()=>{fetchChat()},[])
  return (<>
  <div className="bg-yellow-300 w-screen h-[calc(100vh-2rem)] md:w-[calc(100vw-72px)] md:ml-[72px] xl:w-[calc(100vw-220px)] xl:ml-[220px]">
    <div className="fixed top-0 bg-orange-300 w-full h-12 flex justify-start items-center gap-2 md:w-[calc(100%-72px)] xl:w-[calc(100%-220px)]">
    <div className="h-12 w-12 ml-4 bg-blue-300">
    <img src={`${dummyUserImage}`} alt="" className='h-12 w-12 object-cover rounded-full' />
    </div>
    <div>
        <p>Full Name</p>
        <p>username</p>
    </div>
    </div>
    <div className='flex flex-col-reverse bg-pink-300 absolute top-12 h-[calc(100vh-6.5rem)] w-full md:w-[calc(100vw-72px)] xl:w-[calc(100vw-220px)] overflow-y-scroll'>
    {messages.map((singleMessage)=>(<Messages key={singleMessage._id} singleMessage={singleMessage}/>))}
    </div>
    <div className="h-12 w-full md:w-[calc(100%-74px)] xl:w-[calc(100%-220px)] bg-green-300 fixed bottom-0 z-50 grid place-items-center">
    <div className="bg-gray-700 h-full w-[calc(100%-2px)] rounded-full mb-1 flex justify-center gap-2 items-center">
        <div className="h-10 w-10 bg-orange-300 grid place-items-center rounded-full"><GalleryIcon/></div>
        <input type="text" placeholder='Message...' className='w-[calc(100%-7rem)] h-10 focus:outline-0'/>
        <div className="h-10 w-10 bg-orange-300 grid place-items-center"><p className='text-center font-bold text-violet-600'>Send</p></div>
    </div>
    </div>
  </div>
  </>)
}

export default Chat