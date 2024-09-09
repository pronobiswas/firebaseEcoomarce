import React, { useState } from "react";
import logo from "../../../public/pic.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loggedInUser } from "../../Features/AuthSlice.js";
import { getAuth, signOut } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";

import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const logInUser = useSelector((state) => state.loggedInUserData.value);
  const [toggleUserBox, setToggleUserBox] = useState(false);
  const handletoggleUserBox = () => {
    setToggleUserBox(!toggleUserBox);
    console.log(logInUser);
  };
  const handleSignOut= ()=>{
    signOut(auth).then(() => {
      localStorage.removeItem("loggedInUser")
      dispatch(loggedInUser(null))
      setToggleUserBox(false);
      toast("LogOut Successfully");
      navigate('/')
    }).catch((error) => {
      console.log("An error happened.");
      
    });
    
  }
  return (
    <>
      <header>
        <nav className="w-full  px-5">
          <div className="w-full h-full max-w-[1200px]  mx-auto flex items-center gap-5">
            <div className="logo max-w-[120px] h-14 overflow-hidden">
              <Link to={"/"}>
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="navigationFrom w-1/2 flex gap-4">
              <select className="w-[200px]">
                <option value="dhaka">dhaka</option>
                <option value="dhaka">dhaka</option>
                <option value="dhaka">dhaka</option>
                <option value="dhaka">dhaka</option>
              </select>
              <div className="searchInput flex items-center">
                <input type="text" placeholder="search here" />
                <span className="bg-white text-2xl">
                  <CiSearch />
                </span>
              </div>
            </div>
            <div className="adminPart w-full flex items-center justify-end gap-4">
              <Link to={"/post"}>
                <span>post here</span>
              </Link>

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
                      {console.log(logInUser)}
                      <span>
                        {logInUser ? logInUser.displayName : "username"}
                      </span>

                      <div className="w-fit  rounded-full text-2xl mx-auto bg-slate-50 p-2 border-4 border-indigo-400 shadow-inner">
                        <FaRegUserCircle />
                      </div>
                    </div>
                  </div>

                  <div className="userControlBoxBody text-center pt-8">
                    <h3>{logInUser ? logInUser.displayName : "username"}</h3>
                    <p>{logInUser ? logInUser.email : "example@domain.mail"}</p>
                    <br></br>

                    {!logInUser ? (
                      <Link to={"/signin"}>
                        <button className="bg-green-700 px-6 py-1 text-white font-bold	 rounded-md ">
                          Sign in
                        </button>
                      </Link>
                    ) : (
                      <button onClick={handleSignOut} className="bg-red-700 px-6 py-1 text-white font-bold	 rounded-md ">
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
