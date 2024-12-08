import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { loggedInUser } from "../../Features/AuthSlice.js";
import { MdEmail } from "react-icons/md";
import { FaUnlockAlt } from "react-icons/fa";

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

          if (user.emailVerified) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            dispatch(loggedInUser(user));
            toast("sign In Successfully");
            navigate("/");
          } else {
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
        

        <div className="flex items-center justify-center ">
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-5 w-full max-w-[420px] bg-[#cecece2b] py-8 px-5 rounded-md"
          >
            <div className="email flex flex-col gap-2 border border-1 border-slate-200 rounded p-2">
              <label htmlFor="signInMail">Enter your Email Address</label>
              <div className="flex items-center gap-2">
                <span>
                  <MdEmail />
                </span>
                <input
                  type="email"
                  id="signInMail"
                  name="signInMail"
                  onChange={formik.handleChange}
                  value={formik.values.signInMail}
                  placeholder="Enter your email"
                  className="w-full bg-transparent border-0 border-transparent outline-none py-1"
                />
              </div>
              {formik.touched.signInMail && formik.errors.signInMail ? (
                <div>{formik.errors.signInMail}</div>
              ) : null}
            </div>

            <div className="password username flex flex-col gap-2 border border-1 border-slate-200 rounded p-2">
              <label htmlFor="signInPassword">password</label>
              <div className="flex items-center gap-2">
                <span>
                  <FaUnlockAlt />
                </span>
                <input
                  type="text"
                  id="signInPassword"
                  name="signInPassword"
                  onChange={formik.handleChange}
                  value={formik.values.signInPassword}
                  placeholder="Enter your password"
                  className="w-full bg-transparent border-0 border-transparent outline-none py-1"
                />
              </div>
              {formik.touched.signInPassword && formik.errors.signInPassword ? (
                <div>{formik.errors.signInPassword}</div>
              ) : null}
            </div>
            <button type="submit" className="w-full bg-slate-500 py-1 text-white">
              Submit
            </button>
            <div>
              <a href="#">Don't have an account?</a>
              <Link to="/signup" className="text-blue-700 ml-5 bg-slate-300 py-1 px-4 rounded-md">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
