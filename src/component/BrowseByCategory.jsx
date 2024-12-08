import React from 'react'
import { FaBusAlt } from 'react-icons/fa'
import { HiHomeModern } from 'react-icons/hi2'
import { IoBusinessSharp } from 'react-icons/io5'
import { MdOutlineDeck } from 'react-icons/md'
import { RiEBikeFill } from 'react-icons/ri'

const BrowseByCategory = () => {
  return (
    <div className='w-full py-12 bg-slate-400 flex'>
        {/* =====basavara===== */}
      <div className="w-36 h-36 bg-slate-200 flex flex-col items-center justify-center">
        {/* ----Icon--- */}
        <span className='text-5xl'><HiHomeModern /></span>
        <span>Basavara</span>
      </div>
      {/* =====garivara===== */}
      <div className="w-36 h-36 bg-slate-200 flex flex-col items-center justify-center">
        {/* ----Icon--- */}
        <span className='text-5xl'><RiEBikeFill  /></span>
        <span>Garivara</span>
      </div>
      {/* =====BusVara===== */}
      <div className="w-36 h-36 bg-slate-200 flex flex-col items-center justify-center">
        {/* ----Icon--- */}
        <span className='text-5xl'><FaBusAlt /> </span>
        <span>BusVara</span>
      </div>
      {/* =====business===== */}
      <div className="w-36 h-36 bg-slate-200 flex flex-col items-center justify-center">
        {/* ----Icon--- */}
        <span className='text-5xl'><IoBusinessSharp /> </span>
        <span>BusVara</span>
      </div>
      {/* =====Decoration===== */}
      <div className="w-36 h-36 bg-slate-200 flex flex-col items-center justify-center">
        {/* ----Icon--- */}
        <span className='text-5xl'><MdOutlineDeck /> </span>
        <span>Decoration</span>
      </div>
    </div>
  )
}

export default BrowseByCategory
