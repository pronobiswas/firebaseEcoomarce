import React from "react";
import { useSelector, useDispatch } from "react-redux";

const UserProfile = () => {
  const logInUser = useSelector((state) => state.loggedInUserData.value);
  return (
    <div className="w-full max-w-[1200px] mx-auto bg-slate-300 min-h-[400px]">
      <div className="w-full flex">
        <div className="userDesc">
          <div className="profilePic w-60 h-60 bg-purple-700">
            <img src="" alt="" />
            {console.log(logInUser)}
          </div>
          <div className="UserPersolnalData">
            <h4>{logInUser.displayName}</h4>
            <p>{logInUser.email}</p>
          </div>
        </div>
        <div className="userAcivity"></div>
      </div>
    </div>
  );
};

export default UserProfile;
