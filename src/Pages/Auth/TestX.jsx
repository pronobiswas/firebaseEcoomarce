import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import firebaseConfig from "../config/firebaseConfigaration";
import { useSelector, useDispatch } from "react-redux";

import { getDatabase, ref, set, push } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment/moment";
import { useState } from "react";
import { useCallback } from "react";

import {
  getStorage,
  ref as sref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const TestX = () => {
  const db = getDatabase();
  const navigate = useNavigate();
  const logInUser = useSelector(state => state.loggedInUserData.value);
  const [image, setimage] = useState("");
  const [sendImage, setsendImage] = useState(false);

  const handleImage = e => {
    if (e.target.files[0]) {
      setimage(e.target.files[0]);
      setsendImage(true);
    }
  };

  const handleImageUpload = useCallback(() => {
    const storage = getStorage();
    const db = getDatabase();
    if (!image) return;
    const imageStorageRef = sref(storage, "imgages/" + ${image.name});
    uploadBytes(imageStorageRef, image).then(snapshot => {
      getDownloadURL(imageStorageRef).then(downloadURL => {
        set(push(ref(db, "allpost/")), {
          profile_picture: downloadURL,
          imageUrl: downloadURL,
          posterId: logInUser.uid,
          date: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMilliseconds()}`,
        }).then(() => {
          console.log("datacreate successsfully");
          toast("post successfully");
          navigate("/");
        });
      });
    });
  }, [image, logInUser,navigate]);

  // console.log(image);

  const emailRegx =
    "^[A-Za-z0-9](([a-zA-Z0-9,=.!-#|$%^&*+/?_`{}~]+)*)@(?:[0-9a-zA-Z-]+.)+[a-zA-Z]{2,9}$";
  const formik = useFormik({
    initialValues: {
      username: "",
      userEmail: "",
      userPhoneNumber: "",
      subCatagory: "",
      postType: "",
      locaion: "",
      decription: "",
      posterId: "",
      allComments: [],
      image: "",
    },

    // validationSchema: Yup.object({

    //   username: Yup.string()
    //   .max(12,' username max 12 charecter')
    //   .required('Required'),

    //   userEmail: Yup.string()
    //   .email('Invalid email address')
    //   .matches(emailRegx , "Enter Your Full mail")
    //   .required('Required'),

    // userPhoneNumber: Yup.string()
    //   .userPhoneNumber('Invalid userPhoneNumber')
    //   .required('Required'),

    //   postType: Yup.string()
    //   .required('Required'),

    //   locaion: Yup.string()
    //   .max(12,' you must enter your location')
    //   .required('Required'),

    //   decription: Yup.string()
    //   .max(220,' you must enter your decription')
    //   .required('Required'),

    // }),

    onSubmit: (values, actions) => {
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
        // console.log("datacreate successsfully");
        // toast("post successfully");
        // navigate("/");
        // actions.resetForm({});
      });
    },
  });
  return (
    <>
      <div className="w-full max-w-[1200px] mx-auto px-5 text-center">
        <h2 className="mb-5 text-2xl">post your service with aquerecy</h2>
        <div className="bg-slate-200 w-full max-w-[480px] mx-auto px-5 py-8 rounded-2xl">
          <form className="" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-4">
              

              
              
              <div className="image_file_wrapper">
                <input
                  type="file"
                  name="image"
                  onChange={handleImage}
                  accept="image/*"
                />
              </div>

              
            </div>
            <button
              className="px-12 py-2 mt-5 text-xl font-semibold bg-blue-300 rounded-xl hover:bg-blue-500 hover:text-white"
              type="submit"
              onClick={handleImageUpload}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default TestX;