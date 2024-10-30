import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDatabase, ref, set, push } from "firebase/database";
import {
  getStorage,
  ref as sref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment/moment";

const PostPage = () => {
  const db = getDatabase();
  const storage = getStorage();
  const logInUser = useSelector((state) => state.loggedInUserData.value);
  const emailRegx ="^[A-Za-z0-9](([a-zA-Z0-9,=.!-#|$%^&*+/?_`{}~]+)*)@(?:[0-9a-zA-Z-]+.)+[a-zA-Z]{2,9}$";
  const navigate = useNavigate();

  const [image, setimage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [inputValues, setInputValues] = useState({
    username: "",
    userEmail: "",
    userPhoneNumber: "",
    postType: "",
    subCatagory: "",
    locaion: "",
    decription: "",
  });
  // ====handle Image======
  const handleImage = (e) => {
    if (e.target.files[0]) {
      setimage(e.target.files[0]);
    }
    console.log(image);
  };
  // ==handle Input======
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(inputValues);
  };
  // =====handle submit=====
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(image);
      console.log(inputValues);

      const imageStorageRef = sref(storage, "testimg/" + image.name);
      uploadBytes(imageStorageRef, image).then((snapshot) => {
        getDownloadURL(imageStorageRef).then((downloadURL) => {
          setImageUrl(downloadURL);
          set(push(ref(db, "allpost/")), {
            profile_picture: imageUrl,
            picture: downloadURL,
            userName: inputValues.username,
            Email: inputValues.userEmail,
            PhoneNumber: inputValues.userPhoneNumber,
            PostType: inputValues.postType,
            SubCatagory: inputValues.subCatagory,
            Locaion: inputValues.locaion,
            Decription: inputValues.decription,
            posterId: logInUser.uid,

            date: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
          }).then(() => {
            toast("post successfully");
            navigate("/");
          });
        });
      });
      console.log(imageUrl);
    },
    [inputValues,image]
  );
  return (
    <>
      <div className="w-full">
        <div className="formWarpper max-w-80 mx-auto">
          <form className="">
            <div className="flex flex-col gap-4">
              {/* =====userName====== */}
              <div className="username inputBox">
                <label htmlFor="username">Your Name</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleInput}
                  placeholder="Enter your full Name"
                />
              </div>
              {/* ====email===== */}
              <div className="userEmail inputBox">
                <label htmlFor="userEmail">Your email</label>
                <input
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  placeholder="Enter your Email"
                  onChange={handleInput}
                />
              </div>
              {/* ===phone number===== */}
              <div className="userPhonenumber inputBox">
                <label htmlFor="userPhoneNumber">Your Phone number</label>
                <input
                  type="text"
                  id="userPhoneNumber"
                  name="userPhoneNumber"
                  placeholder="Enter Your Phone number"
                  onChange={handleInput}
                />
              </div>
              {/* ====post Type===== */}
              <div className="postType inputBox flex flex-row justify-between gap-5">
                <select
                  className="w-full"
                  name="postType"
                  id="postType"
                  onChange={handleInput}
                  value={inputValues.postType}
                >
                  <option value="basaVara">basa vara</option>
                  <option value="gariVara">gari vara</option>
                  <option value="Shop">Shop vara</option>
                  <option value="Decoration">Decoration</option>
                  <option value="Services">Services</option>
                </select>

                {inputValues.postType == "basaVara" ? (
                  <select
                    name="subCatagory"
                    id="subCatagory"
                    onChange={handleInput}
                  >
                    <option value="Family">Family</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Sublet">Sublet</option>
                    <option value="FlatAndApertment">FlatAndApertment</option>
                  </select>
                ) : null}
                {/* =======subcatagory gariVara=========== */}
                {inputValues.postType == "gariVara" ? (
                  <select
                    name="subCatagory"
                    id="subCatagory"
                    onChange={handleInput}
                    value={inputValues.subCatagory}
                  >
                    <option value="BusAndTruck">BusAndTruck</option>
                    <option value="MotorCycle">MotorCycle</option>
                    <option value="ThreeWheler">ThreeWheler</option>
                  </select>
                ) : null}
                {/* =======subcatagory SHOP=========== */}
                {inputValues.postType == "Shop" ? (
                  <select
                    name="subCatagory"
                    id="subCatagory"
                    onChange={handleInput}
                    value={inputValues.subCatagory}
                  >
                    <option value="StoreAndShowroom">StoreAndShowroom</option>
                    <option value="GoDown">GoDown</option>
                    <option value="Market">Market</option>
                    <option value="Garage">Garage</option>
                  </select>
                ) : null}
                {/* =======subcatagory Decoration=========== */}
                {inputValues.postType == "Decoration" ? (
                  <select
                    name="subCatagory"
                    id="subCatagory"
                    onChange={handleInput}
                    value={inputValues.subCatagory}
                  >
                    <option value="InDoor">InDoor</option>
                    <option value="OutDoor">OutDoor</option>
                  </select>
                ) : null}
                {/* =======subcatagory Decoration=========== */}
                {inputValues.postType == "Services" ? (
                  <select
                    name="subCatagory"
                    id="subCatagory"
                    onChange={handleInput}
                    value={inputValues.subCatagory}
                  >
                    <option value="Daining">Daining</option>
                    <option value="Tiutor">Tiutor</option>
                    <option value="Nursing">Nursing</option>
                  </select>
                ) : null}
              </div>
              {/* =====Images====== */}
              <div className="image inputBox">
                <label htmlFor="image">Post image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleImage}
                />
              </div>
              {/* =====location====== */}
              <div className="locaion inputBox">
                <label htmlFor="locaion">Your location</label>
                <input
                  type="text"
                  id="locaion"
                  name="locaion"
                  placeholder="Enter your full Location"
                  onChange={handleInput}
                />
              </div>
              {/* ====description==== */}
              <div className="decription inputBox">
                <label htmlFor="decription">Post Description</label>
                <textarea
                  name="decription"
                  id="decription"
                  placeholder="Enter your full Location"
                  onChange={handleInput}
                ></textarea>
              </div>
            </div>
            <button
              className="bg-blue-300 mt-5 px-12 py-2 font-semibold text-xl rounded-xl hover:bg-blue-500 hover:text-white"
              onClick={handleSubmit}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostPage;
