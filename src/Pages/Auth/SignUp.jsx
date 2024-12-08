import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import {
  getStorage,
  ref as sref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
  const emailRegx =
    "^[A-Za-z0-9](([a-zA-Z0-9,=.!-#|$%^&*+/?_`{}~]+)*)@(?:[0-9a-zA-Z-]+.)+[a-zA-Z]{2,9}$";
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      signupName: "",
      signUpMail: "",
      phoneNumber: "",
      signUpPassword: "",
      image: "",
    },
    validationSchema: Yup.object({
      signUpMail: Yup.string()
        .email("Invalid email address")
        .matches(emailRegx, "Enter Your Full mail")
        .required("Required"),

      signUpPassword: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(5, "minum 5 charecter")
        .required("Required"),
    }),

    onSubmit: (values, actions) => {
      const auth = getAuth();

      createUserWithEmailAndPassword(
        auth,
        values.signUpMail,
        values.signUpPassword
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          sendEmailVerification(auth.currentUser).then(() => {
            updateProfile(auth.currentUser, {
              displayName: values.signupName,
              telePhone: values.phoneNumber,
              photoURL: "https://example.com/user/profile.jpg",
            }).then(() => {
              console.log("Regestetion successfull");
              console.log(user);
              toast("Regestetion successfull");
              setTimeout(() => {
                navigate("/signin");
              }, 2000);
            });
          });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    },
  });

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full max-w-[1200px] mx-auto px-5 flex items-center justify-center">
        <div className="w-full max-w-[420px]">
          
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-5 w-full mb-5"
          >
            {/* ======================== */}
            {/* <div className="signupName bg-slate-100 flex flex-col gap-0 border border-1 border-slate-400 rounded">
              <label htmlFor="signupName">Username</label>
              <input
                type="text"
                id="signupName"
                name="signupName"
                onChange={formik.handleChange}
                value={formik.values.signupName}
                placeholder="Enter your userName"
                className="inputsFild"
              />
            </div> */}
            {/* ======================== */}
            <div className="signupName bg-slate-100 flex flex-col gap-0 border border-1 border-slate-400 rounded">
              <label htmlFor="signupName">Username</label>
              <input
                type="text"
                id="signupName"
                name="signupName"
                onChange={formik.handleChange}
                value={formik.values.signupName}
                placeholder="Enter your userName"
                className="p-2"
              />
            </div>

            <div className="email flex flex-col gap-2 border border-1 border-slate-400 rounded p-2">
              <label htmlFor="signUpMail">Enter your Email Address</label>
              <input
                type="email"
                id="signUpMail"
                name="signUpMail"
                onChange={formik.handleChange}
                value={formik.values.signUpMail}
                placeholder="Enter your email"
              />
              {formik.touched.signUpMail && formik.errors.signUpMail ? (
                <div>{formik.errors.signUpMail}</div>
              ) : null}
            </div>

            <div className="phoneNumber flex flex-col gap-2 border border-1 border-slate-400 rounded p-2">
              <label htmlFor="phoneNumber">Enter your phone number</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                placeholder="Enter your phoneNumber"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div>{formik.errors.phoneNumber}</div>
              ) : null}
            </div>

            <div className="password flex flex-col gap-2 border border-1 border-slate-400 rounded p-2">
              <label htmlFor="signUpPassword">password</label>
              <input
                type="password"
                id="signUpPassword"
                name="signUpPassword"
                onChange={formik.handleChange}
                value={formik.values.signUpPassword}
                placeholder="Enter your password"
              />
              {formik.touched.signUpPassword && formik.errors.signUpPassword ? (
                <div>{formik.errors.signUpPassword}</div>
              ) : null}
            </div>

            <button type="submit" className="w-full bg-slate-500">
              submit
            </button>
            <div>
              <a href="#">aldery have an account?</a>

              <span className="text-blue-500 ml-8">
                <Link to="/signin">Sign In</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
