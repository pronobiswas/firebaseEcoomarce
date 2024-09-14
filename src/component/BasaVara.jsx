import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PostCard from "./PostCard";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { itemInfo } from "../Features/ItemSlice.js";
import moment from "moment";

const BasaVara = () => {
  const db = getDatabase();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [basavarPost, setBasavarPost] = useState([]);

  useEffect(() => {
    const basaVaraRef = ref(db, "allpost/");
    onValue(basaVaraRef, (snapshot) => {
      // ======get all post=======
      const data = snapshot.val();

      // =====convert alldata object into an array======
      let BasaData = [];
      snapshot.forEach((item) => {
        if (item.val().postType == "basaVara") {
          BasaData.push({ ...item.val(), id: item.key });
        }
      });
      setBasavarPost(BasaData);
    });
  }, []);

  const handleItem = (item) => {
    dispatch(itemInfo(item));
    navigate("/itemDetails");
  };

  return (
    <div>
      <div className="mt-10">
        <h2>BasaVra post are avialable here</h2>
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
          {basavarPost.map((item, index) => (
            <SwiperSlide key={index}>
              <div  onClick={() => handleItem(item)}>
                <PostCard
                  title={item.username}
                  catagory={item.postType}
                  location={item.location}
                  description={item.decription}
                  Date={moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* ===========slidertest======== */}
      </div>
    </div>
  );
};

export default BasaVara;
