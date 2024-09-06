import { useState } from 'react'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,RouterProvider, Outlet
} from "react-router-dom";
import RootLayout from './Layout/RootLayout';
import Homepage from './Pages/Homepage';
import PostPage from './Pages/PostPage';

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      
        <Route element= {<RootLayout/>}>
          <Route path='/' element={<Homepage/>} />
          <Route path='/post' element={<PostPage/>} />
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
