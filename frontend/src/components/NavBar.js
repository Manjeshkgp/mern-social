import React from "react";
import { Link } from "react-router-dom";
import {HomeIcon,SearchIcon,CreateIcon,MessageIcon} from "../assets/Icons.js";
import userProfileImage from "../assets/user.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black text-white h-10 w-full flex justify-around items-center absolute bottom-0 z-30 md:w-[72px] md:h-full md:left-0 md:flex-col md:justify-start gap-y-16 md:fixed">
      <div className="md:mt-12">
        <Link to="/"><HomeIcon/></Link>
      </div>
      <div>
        <Link to="/search"><SearchIcon/></Link>
      </div>
      <div>
        <Link to="/create"><CreateIcon/></Link>
      </div>
      <div>
        <Link to="/messages"><MessageIcon/></Link>
      </div>
      <div>
        <Link to="/profile"><img src={userProfileImage} alt="profile" className="h-8 w-8" /></Link>
      </div>
    </nav>
  );
};


export default Navbar;