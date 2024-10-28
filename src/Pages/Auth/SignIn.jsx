import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux';
import { loggedInUser } from '../../Features/AuthSlice.js';


const SignIn = () => {
  const emailRegx =
    "^[A-Za-z0-9](([a-zA-Z0-9,=.!-#|$%^&*+/?_`{}~]+)*)@(?:[0-9a-zA-Z-]+.)+[a-zA-Z]{2,9}$";
    const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      signInMail: "",
      signInPassword: "",
    },

    validationSchema: Yup.object({
      signInMail: Yup.string()
        .email("Invalid email address")
        .matches(emailRegx, "Enter Your Full mail")
        .required("Required"),

      signInPassword: Yup.string()
        .max(15, "Must be 15 characters or less")
        .min(5, "minum 5 charecter")
        .required("Required"),
    }),

    onSubmit: (values, actions) => {
      console.log(values);
      signInWithEmailAndPassword(auth, values.signInMail, values.signInPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          
          if(user.emailVerified
          ){
            localStorage.setItem("loggedInUser" , JSON.stringify(user));
            dispatch(loggedInUser(user))
            toast("sign In Successfully");
            navigate('/')
            
          }else{
            toast("verify your mail");
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          
          toast("Creadential Error");
        });
    },
  });

  return (
    <>
      <div>
        <h1>this is sign in page</h1>

        <div className="flex items-center justify-center">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-5 w-full max-w-[420px]"
          >
            <div className="email flex flex-col gap-2 border border-1 border-slate-400 rounded p-2">
              <label htmlFor="signInMail">Enter your Email Address</label>
              <input
                type="email"
                id="signInMail"
                name="signInMail"
                onChange={formik.handleChange}
                value={formik.values.signInMail}
                placeholder="Enter your email"
              />
              {formik.touched.signInMail && formik.errors.signInMail ? (
                <div>{formik.errors.signInMail}</div>
              ) : null}
            </div>

            <div className="password username flex flex-col gap-2 border border-1 border-slate-400 rounded p-2">
              <label htmlFor="signInPassword">password</label>
              <input
                type="text"
                id="signInPassword"
                name="signInPassword"
                onChange={formik.handleChange}
                value={formik.values.signInPassword}
                placeholder="Enter your password"
              />
              {formik.touched.signInPassword && formik.errors.signInPassword ? (
                <div>{formik.errors.signInPassword}</div>
              ) : null}
            </div>
            <button type="submit" className="w-full bg-slate-500">
              submit
            </button>
            <div>
              <a href="#">Don't have an account?</a><Link to="/signup">Sign Up</Link>
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
