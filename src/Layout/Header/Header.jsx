import React, { useState } from "react";
import logo from "../../../public/pic.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loggedInUser } from "../../Features/AuthSlice.js";
import { getAuth, signOut } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";

import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logInUser = useSelector((state) => state.loggedInUserData.value);
  const [toggleUserBox, setToggleUserBox] = useState(false);

  

  const handletoggleUserBox = () => {
    setToggleUserBox(!toggleUserBox);
  };

  const handlePostBtn = () => {
    logInUser ? navigate("/post") : toast("you must login first");
  };

  const handleSignIn = () => {
    navigate("/signin");
    setToggleUserBox(false);
  };

  const handleProfile = ()=>{
    navigate("/profile");
    setToggleUserBox(false);
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("loggedInUser");
        dispatch(loggedInUser(null));
        setToggleUserBox(false);
        toast("LogOut Successfully");
      })
      .catch((error) => {
        console.log("An error happened.");
      });
  };
  return (
    <>
      
      <header>
        <nav className="w-full px-1">
          <div className="w-full h-full max-w-[1200px] mx-auto flex flex-col md:flex-row  items-center gap-5 justify-between ">

            <div className="logo max-w-[120px] h-14 overflow-hidden">
              <Link to={"/"}>
                <img src={logo} alt="logo" />
              </Link>
            </div>

            <div className="navigationFrom w-full flex items-center justify-center gap-4">
              <select className="w-full">
                <option value="dhaka">Dhaka</option>
                <option value="dhaka">Khulna</option>
                <option value="dhaka">Chitagong</option>
                <option value="dhaka">Rajshi</option>
                <option value="dhaka">Rangpur</option>
                <option value="dhaka">Barishal</option>
              </select>
              <div className="searchInput w-full  flex items-center">
                <input type="text" placeholder="search here" className=" w-full" />
                <span className=" text-2xl">
                  <CiSearch />
                </span>
              </div>
            </div>

            {/* =========post here button======= */}
            <div className="adminPart min-w-40 flex items-center justify-end gap-4">
              <button
                onClick={handlePostBtn}
                className="bg-slate-300 px-5 py-2 rounded-l-sm rounded-r-3xl font-bold hover:bg-slate-400  hover:text-slate-100 "
              >
                post here
              </button>

              {/* ===========user icon======== */}
              <div
                onClick={handletoggleUserBox}
                className="bg-slate-300 p-2 rounded-full"
              >
                <FaRegUserCircle />
              </div>

            </div>

            {/* ========user Sign up/In ? signOut box======= */}
            {toggleUserBox ? (
              <div className="absolute top-14 right-2 rounded-2xl overflow-hidden shadow-md">
                <div className="userControlBox w-60 h-60 bg-slate-200">
                  <div className="userControlBoxHeader w-full h-14 bg-slate-300 pt-3">
                    <div className="avatar text-center">
                      <span>
                        {logInUser ? logInUser.displayName : "username"}
                      </span>

                      <div onClick={handleProfile} className="w-fit  rounded-full text-2xl mx-auto bg-slate-50 p-2 border-4 border-indigo-400 shadow-inner">
                        <FaRegUserCircle />
                      </div>
                    </div>
                  </div>

                  <div className="userControlBoxBody text-center pt-8">
                    <h3>{logInUser ? logInUser.displayName : "username"}</h3>
                    <p>{logInUser ? logInUser.email : "example@domain.mail"}</p>
                    <br></br>

                    {!logInUser ? (
                      <button
                        onClick={handleSignIn}
                        className="bg-green-700 px-6 py-1 text-white font-bold	 rounded-md "
                      >
                        Sign in
                      </button>
                    ) : (
                      <button
                        onClick={handleSignOut}
                        className="bg-red-700 px-6 py-1 text-white font-bold	 rounded-md "
                      >
                        Sign Out
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
            {/* ========user Sign up/In ? signOut box=======  */}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
