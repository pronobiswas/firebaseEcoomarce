import React from 'react'
import { Formik, useFormik } from 'formik';
import * as Yup from 'yup';
import firebaseConfig from '../config/firebaseConfigaration'

import { getDatabase, ref, set , push } from "firebase/database";

const PostPage = () => {
  const db = getDatabase();

  const emailRegx = "^[A-Za-z0-9](([a-zA-Z0-9,=\.!\-#|\$%\^&\*\+/\?_`\{\}~]+)*)@(?:[0-9a-zA-Z-]+\.)+[a-zA-Z]{2,9}$"
  const formik = useFormik({
    initialValues: {
      username: '',
      userEmail: '',
      postType: '',
      locaion: '',
      decription: ''
    },

    // validationSchema: Yup.object({
    
    //   username: Yup.string()
    //   .max(12,' username max 12 charecter')
    //   .required('Required'),

    //   userEmail: Yup.string()
    //   .email('Invalid email address')
    //   .matches(emailRegx , "Enter Your Full mail")
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

      onSubmit: (values,actions,e) => {
        
        console.log(values);

        set(push(ref(db, 'allpost/')), {
          username: values.username,
          userEmail: values.userEmail,
          postType: values.postType,
          locaion: values.locaion,
          decription: values.decription,
          profile_picture : "imageUrl/img/img.png"
        }).then(()=>{
          console.log('datacreate successsfully');
          
        });
        
      },
    });
  return (
    <>
      <div className='w-full max-w-[1200px] mx-auto px-5 text-center'>
        <h2 className='text-2xl mb-5'>post your service with aquerecy</h2>
        <div className='bg-slate-200 w-full max-w-[480px] mx-auto px-5 py-8 rounded-2xl'>
          <form className='' onSubmit={formik.handleSubmit}>
            <div className='flex flex-col gap-4'>

              <div className="username inputBox">
                  <label htmlFor="username">Your Name</label>
                  <input 
                  type="text" 
                  id="username"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder='Enter your full Name' />
                  {formik.touched.username && formik.errors.username ? (<div>{formik.errors.username}</div>) : null}
              </div>
              <div className="userEmail inputBox">
                  <label htmlFor="userEmail">Your email</label>
                  <input 
                  type="email" 
                  id="userEmail"
                  name="userEmail"
                  onChange={formik.handleChange}
                  value={formik.values.userEmail}
                  placeholder='Enter your Email' />
              </div>
              <div className="postType inputBox">
                  <select name="postType" id="postType" onChange={formik.handleChange} value={formik.values.postType}>
                      <option value="basaVara">basa vara</option>
                      <option value="gariVara">gari vara</option>
                  </select>
              </div>
              <div className="locaion inputBox">
                  <label htmlFor="locaion">Your location</label>
                  <input 
                  type="text" 
                  id='locaion' 
                  name='locaion' 
                  onChange={formik.handleChange}
                  value={formik.values.locaion}
                  placeholder='Enter your full Location' />
              </div>
              <div className="decription inputBox">
                  <label htmlFor="decription">Post Description</label>
                  <textarea 
                  name="decription" 
                  id="decription"
                  onChange={formik.handleChange}
                  value={formik.values.decription}
                  placeholder='Enter your full Location'></textarea>
              </div>
            </div>
            <button className='bg-blue-300 mt-5 px-12 py-2 font-semibold text-xl rounded-xl hover:bg-blue-500 hover:text-white'
            type="submit">Post</button>

          </form>
        </div>
      </div>
    </>
  )
}

export default PostPage
