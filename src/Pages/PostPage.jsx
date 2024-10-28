import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import firebaseConfig from "../config/firebaseConfigaration";
import { useSelector, useDispatch } from "react-redux";

import { getDatabase, ref, set, push } from "firebase/database";
import {
  getStorage,
  ref as sref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment/moment";

const PostPage = () => {
  const db = getDatabase();
  const navigate = useNavigate();
  const logInUser = useSelector((state) => state.loggedInUserData.value);

  const emailRegx =
    "^[A-Za-z0-9](([a-zA-Z0-9,=.!-#|$%^&*+/?_`{}~]+)*)@(?:[0-9a-zA-Z-]+.)+[a-zA-Z]{2,9}$";
  const formik = useFormik({
    initialValues: {
      image: "",
      username: "",
      userEmail: "",
      userPhoneNumber: "",
      subCatagory: "",
      postType: "",
      locaion: "",
      decription: "",
      posterId: "",
      allComments: [],
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .max(12, " username max 12 charecter")
        .required("Required"),

      userEmail: Yup.string()
        .email("Invalid email address")
        .matches(emailRegx, "Enter Your Full mail")
        .required("Required"),

      postType: Yup.string().required("Required"),

      locaion: Yup.string()
        .max(12, " you must enter your location")
        .required("Required"),

      decription: Yup.string()
        .max(220, " you must enter your decription")
        .required("Required"),
    }),

    onSubmit: (values, actions, e) => {
      console.log(values);

      set(push(ref(db, "allpost/")), {
        username: values.username,
        userEmail: values.userEmail,
        userPhoneNumber: values.userPhoneNumber,
        postType: values.postType,
        subCatagory: values.subCatagory,
        locaion: values.locaion,
        decription: values.decription,
        profile_picture: "imageUrl/img/img.png",
        posterId: logInUser.uid,
        date: `${new Date().getFullYear()}-${
          new Date().getMonth() + 1
        }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
      }).then(() => {
        console.log("datacreate successsfully");
        toast("post successfully");
        navigate("/");
      });
    },
  });
  return (
    <>
      <div className="w-full max-w-[1200px] mx-auto px-5 text-center">
        <h2 className="text-2xl mb-5">post your service with aquerecy</h2>
        <div className="bg-slate-200 w-full max-w-[480px] mx-auto px-5 py-8 rounded-2xl">
          <form className="" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="username inputBox">
                <label htmlFor="username">Your Name</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="Enter your full Name"
                />
                {formik.touched.username && formik.errors.username ? (
                  <div>{formik.errors.username}</div>
                ) : null}
              </div>

              <div className="userEmail inputBox">
                <label htmlFor="userEmail">Your email</label>
                <input
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  onChange={formik.handleChange}
                  value={formik.values.userEmail}
                  placeholder="Enter your Email"
                />
                {formik.touched.userEmail && formik.errors.userEmail ? (
                  <div>{formik.errors.userEmail}</div>
                ) : null}
              </div>

              <div className="userPhonenumber inputBox">
                <label htmlFor="userEmail">Your Phone number</label>
                <input
                  type="phone"
                  id="userPhoneNumber"
                  name="userPhoneNumber"
                  onChange={formik.handleChange}
                  value={formik.values.userPhoneNumber}
                  placeholder="Enter Your Phone number"
                />
              </div>

              <div className="postType inputBox flex flex-row justify-between gap-5">
                <select
                  className="w-full"
                  name="postType"
                  id="postType"
                  onChange={formik.handleChange}
                  value={formik.values.postType}
                >
                  <option value="basaVara">basa vara</option>
                  <option value="gariVara">gari vara</option>
                  <option value="Shop">Shop vara</option>
                  <option value="Decoration">Decoration</option>
                  <option value="Services">Services</option>
                </select>

                {formik.values.postType == "basaVara" ? (
                  <select
                    name="subCatagory"
                    id="subCatagory"
                    onChange={formik.handleChange}
                    value={formik.values.subCatagory}
                  >
                    <option value="Family">Family</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Sublet">Sublet</option>
                    <option value="FlatAndApertment">FlatAndApertment</option>
                  </select>
                ) : null}
                {/* =======subcatagory gariVara=========== */}
                {formik.values.postType == "gariVara" ? (
                  <select
                    name="subCatagory"
                    id="subCatagory"
                    onChange={formik.handleChange}
                    value={formik.values.subCatagory}
                  >
                    <option value="BusAndTruck">BusAndTruck</option>
                    <option value="MotorCycle">MotorCycle</option>
                    <option value="ThreeWheler">ThreeWheler</option>
                  </select>
                ) : null}
                {/* =======subcatagory SHOP=========== */}
                {formik.values.postType == "Shop" ? (
                  <select
                    name="subCatagory"
                    id="subCatagory"
                    onChange={formik.handleChange}
                    value={formik.values.subCatagory}
                  >
                    <option value="StoreAndShowroom">StoreAndShowroom</option>
                    <option value="GoDown">GoDown</option>
                    <option value="Market">Market</option>
                    <option value="Garage">Garage</option>
                  </select>
                ) : null}
                {/* =======subcatagory Decoration=========== */}
                {formik.values.postType == "Decoration" ? (
                  <select
                    name="subCatagory"
                    id="subCatagory"
                    onChange={formik.handleChange}
                    value={formik.values.subCatagory}
                  >
                    <option value="InDoor">InDoor</option>
                    <option value="OutDoor">OutDoor</option>
                  </select>
                ) : null}
                {/* =======subcatagory Decoration=========== */}
                {formik.values.postType == "Services" ? (
                  <select
                    name="subCatagory"
                    id="subCatagory"
                    onChange={formik.handleChange}
                    value={formik.values.subCatagory}
                  >
                    <option value="Daining">Daining</option>
                    <option value="Tiutor">Tiutor</option>
                    <option value="Nursing">Nursing</option>
                  </select>
                ) : null}
              </div>
              <div className="image inputBox">
                <label htmlFor="image">Post image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={formik.handleChange}
                  value={formik.values.image}
                  placeholder="Enter your full Location"
                />
              </div>
              <div className="locaion inputBox">
                <label htmlFor="locaion">Your location</label>
                <input
                  type="text"
                  id="locaion"
                  name="locaion"
                  onChange={formik.handleChange}
                  value={formik.values.locaion}
                  placeholder="Enter your full Location"
                />
              </div>
              <div className="decription inputBox">
                <label htmlFor="decription">Post Description</label>
                <textarea
                  name="decription"
                  id="decription"
                  onChange={formik.handleChange}
                  value={formik.values.decription}
                  placeholder="Enter your full Location"
                ></textarea>
              </div>
            </div>
            <button
              className="bg-blue-300 mt-5 px-12 py-2 font-semibold text-xl rounded-xl hover:bg-blue-500 hover:text-white"
              type="submit"
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
