import React from "react";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import PostCard from "./PostCard";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { itemInfo } from "../Features/ItemSlice.js";

const AllPost = () => {
  const [allPosts, setAllPosts] = useState([]);
  const db = getDatabase();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleItem = (item) => {
    dispatch(itemInfo(item));
    navigate("/itemDetails");
  };

  return (
    <>
      <div className="w-full max-w-[1200px] mx-auto px-1 bg-slate-300 flex">
        <div className="filterMenu w-1/6">
          <h2 className="text-2xl font-bold">filterize your search</h2>
          <div>
            <h3 className="text-2xl mb-3 mt-2">location</h3>

            <div>
              <input type="checkbox" id="dhaka" name="dhaka" />
              <label htmlFor="dhaka">Dhaka</label>
            </div>

            <div>
              <input type="checkbox" id="khulna" name="khulna" />
              <label htmlFor="khulna">Khulna</label>
            </div>

            <div>
              <input type="checkbox" id="barishal" name="barishal" />
              <label htmlFor="barishal">Barishal</label>
            </div>

            <div>
              <input type="checkbox" id="jeshore" name="jeshore" />
              <label htmlFor="jeshore">Jeshore</label>
            </div>

            <div>
              <input type="checkbox" id="chitagong" name="chitagong" />
              <label htmlFor="chitagong">Chitagong</label>
            </div>
          </div>

          {/* =========type========= */}
          <div>
            <h3 className="text-2xl mb-3 mt-2">Post Type</h3>

            <div>
              <input type="checkbox" id="basavara" name="basavara" />
              <label htmlFor="basavara">basavara</label>
            </div>
            <div>
              <input type="checkbox" id="garivara" name="garivara" />
              <label htmlFor="garivara">garivara</label>
            </div>
            <div>
              <input type="checkbox" id="shopvara" name="shopvara" />
              <label htmlFor="shopvara">shopvara</label>
            </div>
            <div>
              <input type="checkbox" id="decoration" name="decoration" />
              <label htmlFor="decoration">decoration</label>
            </div>
            <div>
              <input type="checkbox" id="service" name="service" />
              <label htmlFor="service">service</label>
            </div>

          </div>

          <div>
            <button className="bg-slate-400 px-8 py-1 rounded-lg mt-3">Filter</button>
          </div>

        </div>

        <div className="allpost w-5/6">
          <h2 className="text-2xl font-bold mb-3">All the post are here</h2>
          <div className="w-full flex flex-wrap items-center justify-center gap-2">
            {allPosts.map((item, index) => (
              <div key={index} onClick={() => handleItem(item)}>
                <PostCard
                  title={item.username}
                  catagory={item.postType}
                  location={item.location}
                  description={item.decription}
                  Date={moment(item.date, "YYYYMMDD hh:mm").fromNow()}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPost;
