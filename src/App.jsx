import { useEffect, useState } from 'react'
import '../src/App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,RouterProvider, Outlet
} from "react-router-dom";
import RootLayout from './Layout/RootLayout';
import Homepage from './Pages/Homepage';
import PostPage from './Pages/PostPage';
import SignUp from './Pages/Auth/SignUp';
import SignIn from './Pages/Auth/SignIn';
import ItemDetails from './Pages/ItemDetails';
import UserProfile from './Pages/UserProfile';
import AllPost from './component/AllPost';
import DraftComponent from './component/DraftComponent';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      
        <Route element= {<RootLayout/>}>
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/signin' element={<SignIn/>} />
          <Route path='/allpost' element={<AllPost/>} />
          <Route path='/profile' element={<UserProfile/>} />
          <Route path='/' element={<Homepage/>}/>
          <Route path='/post' element={<PostPage/>}/>
          <Route path='/draft' element={<DraftComponent/>}/>
          <Route path='/itemDetails' element={<ItemDetails/>}/>
        </Route>
      </>
    )
  );



  return (
    <>
    
    <RouterProvider
      router={router}
    />

    </>
  )
}

export default App
