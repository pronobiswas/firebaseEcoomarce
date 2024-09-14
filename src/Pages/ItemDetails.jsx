import React from 'react'
import { useSelector, useDispatch } from "react-redux";


const ItemDetails = () => {
    const itemInfo = useSelector((state) => state.itemInfo.value);
    const check =()=>{
        console.log(itemInfo);
        console.log("hello");
        
        
    }
  return (
    <>
      <div className='w-full max-w-[1200px] mx-auto px-5  flex gap-8'>

        <div className='w-full max-w-80 h-80 flex flex-col items-center justify-center gap-4'>
            <div className="productImage w-full h-52 bg-slate-400 "></div>
            <div className="productImage w-full bg-slate-400 flex gap-2">
              <div className='w-20 h-20 bg-slate-500'></div>
              <div className='w-20 h-20 bg-slate-500'></div>
              <div className='w-20 h-20 bg-slate-500'></div>
              <div className='w-20 h-20 bg-slate-500'></div>
            </div>
        </div>

        <div className='w-full'>
            <h1 className='text-xl uppercase'>{itemInfo.username}</h1>
            <p className='font-bold mt-2'>Location</p>
            <p>{itemInfo.locaion}</p>
            <p className='font-bold mt-2'>Post Type</p>
            <p>{itemInfo.postType}</p>
            <p>{itemInfo.subCatagory}</p>
            <p className='font-bold mt-2'>Contact</p>
            <p className='text-blue-600'><a href={itemInfo.userEmail}>{itemInfo.userEmail}</a></p>
            <p>{itemInfo.userPhoneNumber}</p>
            <p>{itemInfo.decription}</p>
            {/* <p>{itemInfo.date}</p> */}
            <button className='bg-slate-600 text-white px-8 py-2'>add to wish list</button>
        </div>

      </div>
    </>
  )
}

export default ItemDetails
