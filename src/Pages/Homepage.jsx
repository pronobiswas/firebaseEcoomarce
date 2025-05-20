import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import PostCard from "../component/PostCard";
import { useSelector, useDispatch } from "react-redux";
import { itemInfo } from "../Features/ItemSlice.js";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../component/Banner.jsx";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { RiH1 } from "react-icons/ri";
import { HiArrowLongRight } from "react-icons/hi2";
import BasaVara from "../component/BasaVara.jsx";
import Decoration from "../component/Decoration.jsx";
import moment from "moment";
import { generateToken, messaging } from "../config/firebaseConfigaration.js";
import { onMessage } from "firebase/messaging";
import BrowseByCategory from "../component/BrowseByCategory.jsx";

const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logInUser = useSelector((state) => state.loggedInUserData.value);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
    });
  }, []);
  // ===get data from database=====
  const db = getDatabase();
  useEffect(() => {
    const allPostRef = ref(db, "allpost/");
    onValue(allPostRef, (snapshot) => {
      // ======get all post=======
      const data = snapshot.val();

      // =====convert alldata object into an array======
      let alldata = [];
      snapshot.forEach((item) => {
        alldata.push({ ...item.val(), id: item.key });
      });
      setAllPosts(alldata);
    });
  }, []);

  // =======hanf=dle items information========

  const handleItem = (item) => {
    dispatch(itemInfo(item));
    navigate("/itemDetails");
  };

  return (
    <>
      {/* first section */}
      <div className="w-full  h-full mx-auto flex">
        {/* =====firstColum and the filtermenu======== */}
        <div className="filterMenu hidden md:block md:w-1/6  lg:w-1/6  h-full min-h-screen  bg-slate-200 px-2">
          <h2 className="text-2xl">the filter</h2>
          <div className="flex flex-col gap-y-4">
            <details>
              <summary>basaVara</summary>
              <p>Bachelor</p>
              <p>Family</p>
            </details>
            <details>
              <summary>dokanVara</summary>
              <p>dokanVara</p>
            </details>
            <details>
              <summary>gariVara</summary>
              <p>bus</p>
              <p>truck</p>
              <p>picup</p>
              <p>hiex</p>
            </details>
            <details>
              <summary>gariVara</summary>
              <p>gariVara</p>
            </details>
          </div>
          <div>
            <details>
              <summary>By division</summary>
              <p>khulna</p>
              <p>khulna</p>
            </details>
          </div>
        </div>
        {/* ======content are here====== */}
        <div className="contentSection w-full md:w-5/6 lg:w-4/6 h-full">
          <Banner />
          <BrowseByCategory />
          {/* allpost====== */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h2>All post are avialable here</h2>
              <Link to={"/allpost"}>
                <button className="mr-5 flex items-center hover:text-blue-500">
                  <span>View More</span>
                  <span>
                    <HiArrowLongRight />
                  </span>
                </button>
              </Link>
            </div>

            <div className="allPostSlider w-full overflow-hidden">
              <Swiper
                slidesPerView={4}
                spaceBetween={2}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 1500,
                  disableOnInteraction: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                {allPosts.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div onClick={() => handleItem(item)}>
                      <PostCard
                        src={item.picture}
                        title={item.userName}
                        catagory={item.PostType}
                        location={item.location}
                        description={item.Decription}
                        Date={moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        {/* =======third colum or adversment section======= */}
        <div className="adversmentSection w-1/6 hidden lg:block h-full min-h-screen bg-slate-500 px-2">
          <h2>the addversment</h2>
        </div>
      </div>
      <div className="px-12">
        <BasaVara/>
        <Decoration/>
      </div>
    </>
  );
};

export default Homepage;
