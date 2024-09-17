import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [userPost, setUserPost] = useState([]);
  const db = getDatabase();
  const logInUser = useSelector((state) => state.loggedInUserData.value);

  useEffect(() => {
    const userPostRef = ref(db, "allpost/");
    onValue(userPostRef, (snapshot) => {
      // ======get user all post=======
      const data = snapshot.val();

      // =====convert alldata object into an array======
      let userpostdata = [];

      snapshot.forEach((item) => {
        if (item.val().posterId == logInUser.uid) {
          userpostdata.push({ ...item.val(), id: item.key });
        }
      });
      setUserPost(userpostdata);
    });
  }, []);

  const handleDelete = (item) => {
    console.log("handle delete");
    console.log(item);
    remove(ref(db, "/allpost/" + `${item.id}`));
  };

  const handleUpdate = (item) => {
    console.log("handle updatedata");
    console.log(item);
  };

  return (
    <>
      <div className="w-full max-w-[1200px] mx-auto bg-slate-300 min-h-[400px] px-5">
        {logInUser?

        <div className="w-full flex">
          <div className="userDesc w-2/6">
            <div className="profilePic w-40 h-40 bg-purple-700 rounded-full mb-8">
              <img src="" alt="" />
            </div>
            <div className="UserPersolnalData">
              <h4>{logInUser.displayName}</h4>
              <p>{logInUser.email}</p>
            </div>
          </div>

          <div className="userAcivity w-4/6">
            {userPost.map((item, index) => (
              <div key={index} className="postedItem p-2 border border-sky-500">
                <div className="flex gap-6">
                  <div className="postimage w-20 h-20 bg-slate-500">
                    <img src="#" alt="" />
                  </div>
                  <div>
                    <p>{item.postType}</p>
                    <p>{item.subCatagory}</p>
                    <p>{item.locaion}</p>
                  </div>
                </div>
                <p>{item.decription}</p>
                <div>
                  <button
                    onClick={() => handleDelete(item)}
                    className="bg-red-600 text-white px-8 py-2"
                  >
                    delete
                  </button>
                  <button
                    onClick={() => handleUpdate(item)}
                    className="bg-sky-600 text-white px-8 py-2"
                  >
                    eidit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        :
        toast("you must login")
        }
      </div>
    </>
  );
};

export default UserProfile;
