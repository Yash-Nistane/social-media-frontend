import axios from "../../helpers/axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

     const getUser = async () => {
       try {
         const res = await axios("/users?userId=" + friendId);
         setUser(res.data);
       } catch (err) {
         console.log(err);
       }
     };
     getUser();
   }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? user.profilePicture
            : "https://social-media--app.s3.ap-south-1.amazonaws.com/noAvatar.png"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
