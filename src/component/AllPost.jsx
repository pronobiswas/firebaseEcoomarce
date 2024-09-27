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
          <h2>filterize your search</h2>
          <h3>location</h3>
          <h3>type</h3>
        </div>


        <div className="allpost w-5/6">
          <h2>All the post are here</h2>
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
