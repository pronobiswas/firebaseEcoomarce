import React, { useState } from "react";
import { getDatabase, ref, set, push } from "firebase/database";
import {
    getStorage,
    ref as sref,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";
import { useCallback } from "react";

const DraftComponent = () => {
    const db = getDatabase();
    const storage = getStorage();

    const [image, setimage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [inputValues,setInputValues] = useState({
        username:"",
        userEmail:"",
        userPhoneNumber:"",
        postType:"",
        subCatagory:"",
        locaion:"",
        decription:""
    })
    // ====handle Image======
    const handleImage = e => {
        if (e.target.files[0]) {
          setimage(e.target.files[0]);
        }
      };
    // ==handle Input======
    const handleInput = (e)=>{
        const { name, value } = e.target;
        setInputValues(prevData =>({
            ...prevData,
            [name]: value
        }))
        console.log(inputValues);
        
        
    }
    // =====handle submit=====
    const handleSubmit = useCallback((e) => { 
        e.preventDefault();
        console.log(image);
        
        const imageStorageRef = sref(storage, "testimg/" + image.name);
        uploadBytes(imageStorageRef, image).then((snapshot) => {
          getDownloadURL(imageStorageRef).then((downloadURL) => {
            setImageUrl(downloadURL)
            set(push(ref(db, "newPost/")), {
                
                profile_picture: imageUrl,
                picture: downloadURL,
                posterId: "12345677898",
                userName:inputValues.username,
                Email:inputValues.userEmail,
                PhoneNumber:inputValues.userPhoneNumber,
                PostType:inputValues.postType,
                SubCatagory:inputValues.subCatagory,
                Locaion:inputValues.locaion,
                Decription:inputValues.decription,

                date: `${new Date().getFullYear()}-${
                  new Date().getMonth() + 1
                }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
              }).then(() => {
                console.log("datacreate successsfully");
                
              });
          });
        });
        console.log(imageUrl);
        
      },[])

  return (
    <div className="w-full">
      <div className="formWarpper max-w-80 mx-auto">
        <form className="">
          <div className="flex flex-col gap-4">

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
                type="number"
                id="userPhoneNumber"
                name="userPhoneNumber"
                placeholder="Enter Your Phone number"
                onChange={handleInput}
              />
            </div>
            {/* ====post Type===== */}
            <div className="postType inputBox flex flex-row justify-between gap-5">
              <select className="w-full" name="postType" id="postType" onChange={handleInput}>
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
                value={inputValues.locaion}
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
                value={inputValues.decription}
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
  );
};

export default DraftComponent;
