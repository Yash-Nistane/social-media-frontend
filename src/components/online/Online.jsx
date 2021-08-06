import "./online.css";

export default function Online({ user }) {
  //console.log("Online",user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          src={
            user.profilePicture
              ? user.profilePicture
              : "https://social-media--app.s3.ap-south-1.amazonaws.com/noAvatar.png"
          }
          alt=""
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user?.username}</span>
    </li>
  );
}
