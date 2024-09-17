import React from "react";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import PostCard from "./PostCard";
import moment from "moment";

const AllPost = () => {
  const [allPosts, setAllPosts] = useState([]);
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
  return (
    <>
      <div className="w-full max-w-[1200px] mx-auto px-5 bg-slate-300">
        <h2>All the post are here</h2>
        <div className="grid gap-4 grid-cols-6 grid-rows-auto">
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
    </>
  );
};

export default AllPost;
