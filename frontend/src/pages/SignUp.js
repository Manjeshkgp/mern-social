import React from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
  const [revealPswd, setRevealPswd] = React.useState(false);
  const Initialform = {
    name:"",
    email:"",
    password:""
  }
  const [formdata,setFormdata] = React.useState(Initialform);
  const editForm = (e)=>{
    e.preventDefault();
    setFormdata({...formdata,[e.target.name]:e.target.value})
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/register",{
        method:"POST",
        body:JSON.stringify(formdata),
        headers:{
            "content-type":"application/json",
        }
    })
    if(res.ok){
        navigate("/login")
    }
  }

  return (
    <>
      <div className="flex justify-center items-center bg-blue-100 min-h-screen min-w-full">
        <div className="w-[85vw] bg-green-300 h-68 flex justify-center items-center mb-32">
          <form className="grid" onSubmit={(e)=>{formSubmit(e)}}>
            <div className="box">
              <label>Name</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
                id="name"
                value={formdata.name}
                onChange={(e)=>{editForm(e)}}
                placeholder="John Cena"
              />
            </div>
            <div className="box">
              <label>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formdata.email}
                onChange={(e)=>{editForm(e)}}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="box">
              <label>Password</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type={revealPswd ? "text" : "password"}
                name="password"
                id="password"
                value={formdata.password}
                onChange={(e)=>{editForm(e)}}
              />
              {revealPswd ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setRevealPswd(false);
                  }}
                >
                  Hide
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setRevealPswd(true);
                  }}
                >
                  Show
                </button>
              )}
            </div>
            <button className="button" htmlFor="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
