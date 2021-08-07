import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../helpers/axios";
import { CircularProgress } from "@material-ui/core";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    // const newPost = {
    //   userId: user._id,
    //   desc: desc.current.value,
    // };
    //console.log("newposttttt",newPost);
    //console.log("fileeeeee",file);

    setIsUploading(true);

    const data = new FormData();
    //data.append("name", fileName);
    data.append("userId", user._id);
    data.append("desc", desc.current.value);

    if (file) {
      //const fileName = Date.now() + file.name;
      data.append("file", file);
      //newPost.img = fileName;

      try {
        const res = await axios.post("/posts/upload", data);
        if (res) {
          setIsUploading(false);
        }
        window.location.reload();
      } catch (err) {}
    } else {
      try {
        const res = await axios.post("/posts", data);
        if (res) {
          setIsUploading(false);
        }
        window.location.reload();
      } catch (err) {}
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? user.profilePicture
                : "https://social-media--app.s3.ap-south-1.amazonaws.com/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={`What's in your mind ${user.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button
            className={`shareButton ${isUploading ? "isUploading" : ""}`}
            type="submit"
          >
            Share{" "}
            {isUploading ? (
              <CircularProgress color="white" size="12px" />
            ) : null}
          </button>
        </form>
      </div>
    </div>
  );
}
