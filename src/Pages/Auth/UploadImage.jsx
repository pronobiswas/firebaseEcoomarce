import React, { useCallback, useState } from "react";
import {
  getStorage,
  ref as sref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, push, ref, set } from "firebase/database";

const UploadImage = () => {
  const [image, setimage] = useState("");
  const handleImage = (e) => {
    setimage(e.target.files[0]);
  };
  const sendImage = useCallback(() => {
    console.log("hello");
    const db = getDatabase();
    const storage = getStorage();
    const imageStorageRef = sref(storage, "img/" + image.name);
    uploadBytes(imageStorageRef, image).then((snapshot) => {
      getDownloadURL(imageStorageRef).then((downloadURL) => {
        set(push(ref(db, "/Images")), {
          profile_picture: downloadURL,
          userName: "user",
        }).then(() => {
          console.log("datacreate successsfully");
        });
      });
    });
  });
  return (
    <div>
      <div>
        <input type="file" onChange={handleImage} accept="image/*" />
        <button onClick={sendImage}>UploadImage</button>
      </div>
    </div>
  );
};

export default UploadImage;
