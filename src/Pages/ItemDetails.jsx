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
      <div className='w-full max-w-[1200px] mx-auto px-5 bg-slate-400 flex gap-8'>

        <div className='w-full max-w-80 h-80 bg-slate-200'>
            <button onClick={check}>check</button>
        </div>
        <div>
            <h1>{itemInfo.username}</h1>
            <p>{itemInfo.locaion}</p>
            <p>{itemInfo.userEmail}</p>
            <p>{itemInfo.userPhoneNumber}</p>
            <p>{itemInfo.postType}</p>
            <p>{itemInfo.subCatagory}</p>
            <p>{itemInfo.decription}</p>
            <p>{itemInfo.id}</p>
        </div>
      </div>
    </>
  )
}

export default ItemDetails
