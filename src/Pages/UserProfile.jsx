import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDatabase,
  ref,
  onValue,
  remove,
  set,
  push,
} from "firebase/database";
import { toast } from "react-toastify";
import UploadImage from "./Auth/UploadImage";
import {
  getStorage,
  ref as sref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const UserProfile = () => {
  const [userPost, setUserPost] = useState([]);
  const db = getDatabase();
  const logInUser = useSelector((state) => state.loggedInUserData.value);
  const [image, setimage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [myUser, setMyUser] = useState([]);

  const handleImage = (e) => {
    setimage(e.target.files[0]);
  };

  const handleImageUpload = useCallback(() => {
    const storage = getStorage();
    const db = getDatabase();
    const imageStorageRef = sref(storage, "imgages/" + `${image.name} `);
    uploadBytes(imageStorageRef, image).then((snapshot) => {
      getDownloadURL(imageStorageRef).then((downloadURL) => {
        setImageUrl(downloadURL);
        set(ref(db, "user/" + logInUser.uid), {
          profile_picture: downloadURL,
          profileID : logInUser.uid
        });
      });
    });
    console.log(imageUrl);
  }, [image]);

  // ========get all post data======
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
  // ========get all post data======

  useEffect(() => {
    const userRef = ref(db, "user/");
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      let usersData = [];
      console.log(data);
      

      snapshot.forEach((item) => {
        console.log(item.val());
        
        if (logInUser.uid == item.val().profileID) {
          usersData.push({ ...item.val(), id: item.key });
        }
      });
      setMyUser(usersData);
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
    console.log(logInUser.uid);
    console.log(myUser);
  };

  return (
    <>
      <div className="w-full max-w-[1200px] md:mx-auto bg-slate-300 min-h-[400px] px-5">
        {logInUser ? (
          <div className="w-full flex flex-col md:flex-row ">
            <div className="userDesc hidden md:block w-full md:w-2/6 ">
              <div className="profilePic w-40 h-40 bg-purple-700 rounded-full mb-2 overflow-hidden">
                {
                  myUser.length ?
                  <img src={myUser[0].profile_picture} alt="" className="w-full h-full object-cover"/>
                  :null
                }
              </div>
              <div className="UserPersolnalData">
                <h4 className="text-4xl font-bold">{logInUser.displayName}</h4>
                <p>{logInUser.email}</p>
              </div>
              <div className="image_file_wrapper">
                <input
                  type="file"
                  name="image"
                  onChange={handleImage}
                  accept="image/*"
                />
                <button onClick={handleImageUpload}>submit</button>
              </div>
            </div>

            <div className="userAcivity w-full  md:w-4/6">
              {userPost.map((item, index) => (
                <div
                  key={index}
                  className="postedItem p-2 border border-sky-500"
                >
                  <div className="flex gap-6">
                    <div className="postimage w-20 h-20 bg-slate-500">
                      <img src={item.picture} alt="pic" className="w-full h-full object-cover"/>
                    </div>
                    <div>
                      <p>{item.PostType}</p>
                      <p>{item.SubCatagory}</p>
                      <p>{item.Locaion}</p>
                    </div>
                  </div>
                  <p>{item.Decription}</p>
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
        ) : (
          toast("you must login")
        )}
      </div>
    </>
  );
};

export default UserProfile;
