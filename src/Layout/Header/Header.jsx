import React from 'react'
import logo from '../../../public/pic.png'
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <header>
        <nav className='w-full  px-5'>
          <div className='w-full h-full max-w-[1200px]  mx-auto flex items-center gap-5'>

            <div className="logo max-w-[120px] h-14 overflow-hidden">
              <img src={logo} alt=""/>
            </div>

            <div className="navigationFrom w-1/2 flex gap-4">
              <select className='w-[200px]'>
                <option value="dhaka">dhaka</option>
                <option value="dhaka">dhaka</option>
                <option value="dhaka">dhaka</option>
                <option value="dhaka">dhaka</option>
              </select>
              <div className="searchInput flex items-center">
                  <input type="text" placeholder='search here'/>
                  <span className='bg-white text-2xl'><CiSearch /></span>
              </div>
            </div>

            <div className="adminPart w-full flex items-center justify-end gap-4">
              <button>post here</button>
              <span><FaRegUserCircle /></span>
            </div>

          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
