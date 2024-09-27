import { getDatabase, onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loggedInUser } from "../Features/AuthSlice";
import { toast, ToastContainer } from "react-toastify";

const ItemDetails = () => {
  const db = getDatabase();
  const itemInfo = useSelector((state) => state.itemInfo.value);
  const logInUser = useSelector((state) => state.loggedInUserData.value);
  const [reviewInput, setReviewInput] = useState("");

  const [itemReview, setItemReview] = useState([]);

  useEffect(() => {
    const itemReviewRef = ref(db, "review/");
    onValue(itemReviewRef, (snapshot) => {
      // ======get all review=======
      const data = snapshot.val();

      // =====convert alldata object into an array======
      let reviewData = [];
      snapshot.forEach((item) => {
        if (item.val().itemId == itemInfo.id) {
          reviewData.push({ ...item.val(), id: item.key });
        }
      });
      setItemReview(reviewData);
    });
  }, []);

  const check = () => {
    console.log(itemInfo);
    console.log("hello");
  };

  const bookNow = () => {
    console.log("book now");
    console.log(itemReview);
  };

  const handleSubmitReview = () => {
    if (logInUser) {
      if (reviewInput.length > 10) {
        set(push(ref(db, "review")), {
          senderid: logInUser?.uid,
          sendername: logInUser?.displayName,
          senderemail: logInUser?.email,
          itemId: itemInfo?.id,
          message: reviewInput,
          date: "",
        }).then(() => {
          setReviewInput("");
          console.log("success");
        });
      } else {
        toast("must be fild at least 10 word");
      }
    } else {
      toast("you must login");
    }
  };

  return (
    <>
      <div className="w-full max-w-[1200px] mx-auto px-5  flex gap-8">
        <ToastContainer />
        <div className="w-full max-w-80 h-80 flex flex-col items-center justify-center gap-4">
          <div className="productImage w-full h-52 bg-slate-400 rounded-xl"></div>
          <div className="productImage w-full shadow-inner p-2 rounded-xl flex gap-2">
            <div className="w-20 h-20 bg-slate-500 rounded-xl"></div>
            <div className="w-20 h-20 bg-slate-500 rounded-xl"></div>
            <div className="w-20 h-20 bg-slate-500 rounded-xl"></div>
            <div className="w-20 h-20 bg-slate-500 rounded-xl"></div>
          </div>
        </div>

        <div className="w-full">
          <h1 className="text-xl uppercase">{itemInfo?.username}</h1>
          <p className="font-bold mt-2">Location</p>
          <p>{itemInfo?.locaion}</p>
          <p className="font-bold mt-2">Post Type</p>
          <p>{itemInfo?.postType}</p>
          <p>{itemInfo?.subCatagory}</p>
          <p className="font-bold mt-2">Contact</p>
          <p className="text-blue-600">
            <a href={itemInfo?.userEmail}>{itemInfo?.userEmail}</a>
          </p>
          <p>{itemInfo?.userPhoneNumber}</p>
          <p>{itemInfo?.decription}</p>
          {/* <p>{itemInfo.date}</p> */}
          <div className="flex gap-5">
            <button className="bg-slate-600 text-white px-8 py-2 rounded-xl">
              add to wish list
            </button>

            <button
              onClick={bookNow}
              className="bg-slate-600 text-white px-8 py-2 rounded-xl                               "
            >
              book now
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto px-5">
        <div className="comentSection ">
          <h3>User review</h3>
          <div className="w-full py-3 shadow-inner flex flex-col gap-4">
            {itemReview.map((item) => (
              <div className="flex gap-5">
                <div className="w-20 h-20 bg-slate-600 rounded-full"></div>
                <div>
                  <p>{item.sendername}</p>
                  <p>{item.senderemail}</p>
                  <p>{item.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-3xl mb-5">Leave a comment</h3>
          <div className="commentform flex flex-col">
            {/* <form> */}
            <label htmlFor="comment">Leave your Comment</label>
            <textarea
              name="comment"
              id="comment"
              rows={6}
              className="shadow-inner w-full"
              onChange={(e) => setReviewInput(e.target.value)}
              value={reviewInput}
            ></textarea>
            <button
              onClick={handleSubmitReview}
              className="bg-slate-600 text-white px-8 py-2"
            >
              Submit
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetails;
