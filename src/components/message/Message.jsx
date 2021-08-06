import "./message.css";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import axios from "../../helpers/axios";

export default function Message({ message, own, userPhoto, friendPhoto }) {
  //console.log("msggg",message);

  const { user } = useContext(AuthContext);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            own
              ? userPhoto
                ? userPhoto
                : "https://social-media--app.s3.ap-south-1.amazonaws.com/noAvatar.png"
              : friendPhoto
              ? friendPhoto
              : "https://social-media--app.s3.ap-south-1.amazonaws.com/noAvatar.png"
          }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
