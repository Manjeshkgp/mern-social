import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { giveAccess } from "../slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [revealPswd, setRevealPswd] = React.useState(false);
  const Initialform = {
    email: "",
    password: "",
  };
  const [formdata, setFormdata] = React.useState(Initialform);
  const editForm = (e) => {
    e.preventDefault();
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      const { token, user } = await res.json();
      Cookies.set("token", token);
      Cookies.set("identification",user._id)
      dispatch(giveAccess(user));
      navigate("/");
      console.log(user);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center bg-blue-100 min-h-screen min-w-full">
        <div className="w-[85vw] bg-green-300 h-68 flex justify-center items-center mb-32">
          <form
            className="grid"
            onSubmit={(e) => {
              formSubmit(e);
            }}
          >
            <div className="box">
              <label>Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formdata.email}
                onChange={(e) => {
                  editForm(e);
                }}
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
                onChange={(e) => {
                  editForm(e);
                }}
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
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
