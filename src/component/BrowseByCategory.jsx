import React from "react";
import Marquee from "react-fast-marquee";
import { FaBusAlt } from "react-icons/fa";
import { HiHomeModern } from "react-icons/hi2";
import { IoBusinessSharp } from "react-icons/io5";
import { MdOutlineDeck } from "react-icons/md";
import { RiEBikeFill } from "react-icons/ri";

const BrowseByCategory = () => {
  return (
    <div className="w-full py-2 flex">
      <Marquee autoFill={true}>
        {/* =====basavara===== */}
        <div className="w-36 h-36  flex flex-col items-center justify-center">
          {/* ----Icon--- */}
          <span className="text-5xl">
            <HiHomeModern />
          </span>
          <span>Basavara</span>
        </div>
        {/* =====garivara===== */}
        <div className="w-36 h-36  flex flex-col items-center justify-center">
          {/* ----Icon--- */}
          <span className="text-5xl">
            <RiEBikeFill />
          </span>
          <span>Garivara</span>
        </div>
        {/* =====BusVara===== */}
        <div className="w-36 h-36 flex flex-col items-center justify-center">
          {/* ----Icon--- */}
          <span className="text-5xl">
            <FaBusAlt />{" "}
          </span>
          <span>BusVara</span>
        </div>
        {/* =====business===== */}
        <div className="w-36 h-36  flex flex-col items-center justify-center">
          {/* ----Icon--- */}
          <span className="text-5xl">
            <IoBusinessSharp />{" "}
          </span>
          <span>BusVara</span>
        </div>
        {/* =====Decoration===== */}
        <div className="w-36 h-36  flex flex-col items-center justify-center">
          {/* ----Icon--- */}
          <span className="text-5xl">
            <MdOutlineDeck />{" "}
          </span>
          <span>Decoration</span>
        </div>
        <div className="w-36 h-36 flex flex-col items-center justify-center">
          {/* ----Icon--- */}
          <span className="text-5xl">
            <HiHomeModern />
          </span>
          <span>Basavara</span>
        </div>
      </Marquee>
    </div>
  );
};

export default BrowseByCategory;
