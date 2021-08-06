import "./closeFriend.css";
import { Link } from "react-router-dom";

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebarFriend">
      <Link className="closeFriendLink" to={`/profile/${user.username}`}>
        <img
          className="sidebarFriendImg"
          src={user.profilePicture ? user.profilePicture :"https://social-media--app.s3.ap-south-1.amazonaws.com/noAvatar.png"}
          alt=""
        />
        <span className="sidebarFriendName">{user.username}</span>
      </Link>
    </li>
  );
}
