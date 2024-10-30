import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue } from "firebase/database";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { itemInfo } from "../Features/ItemSlice.js";
import moment from 'moment';

const Decoration = () => {
    const db = getDatabase();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [DecorationPost, setDecorationPost] = useState([]);

  useEffect(() => {
    const DecorationRef = ref(db, "allpost/");
    onValue(DecorationRef, (snapshot) => {
      // ======get all post=======
      const data = snapshot.val();

      // =====convert alldata object into an array======
      let DecorationData = [];
      snapshot.forEach((item) => {
        if (item.val().PostType == "Decoration") {
            DecorationData.push({ ...item.val(), id: item.key });
        }
      });
      setDecorationPost(DecorationData);
    });
  }, []);

  const handleItem = (item) => {
    dispatch(itemInfo(item));
    navigate("/itemDetails");
  };

  return (
    <div>
      <div className="mt-10">
        <h2>Decoration Post are avialable here</h2>
        {/* ===========slidertest======== */}
        <Swiper
          slidesPerView={4}
          spaceBetween={2}
          pagination={{
            clickable: true,
          }}
          Autoplay={{
            delay: 1000,
            disableOnInteraction: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {DecorationPost.map((item, index) => (
            <SwiperSlide key={index}>
              <div key={index} onClick={() => handleItem(item)}>
                <PostCard
                src={item.picture}
                  title={item.userName}
                  catagory={item.PostType}
                  location={item.Location}
                  description={item.Decription}
                  Date={moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* ===========slidertest======== */}
      </div>
    </div>
  )
}

export default Decoration
