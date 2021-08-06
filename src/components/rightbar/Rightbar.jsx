import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../helpers/axios";
import { Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import EditTwoToneIcon from "@material-ui/icons/EditTwoTone";
import LocationOnTwoToneIcon from "@material-ui/icons/LocationOnTwoTone";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, OnlineUsers, dispatch } = useContext(AuthContext);

  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  //console.log("FRIENDS", friends);
  //console.log(OnlineUsers);
  //console.log("followingsssssssssss", currentUser.followings);
  //console.log("followed", followed);
  //console.log( "userrrrrr._id",user._id);
  useEffect(() => {
    if (user) {
      setFollowed(currentUser.followings.includes(user._id));
    }

    const getFriends = async () => {
      try {
        const friendList = user
          ? await axios.get("/users/friends/" + user._id)
          : await axios.get("/users/friends/" + currentUser._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });

        const res = await axios.get(
          `/conversations/find/${currentUser._id}/${user._id}`
        );

        if (!res.data) {
          await axios.post("/conversations", {
            senderId: currentUser._id,
            receiverId: user._id,
          });
        }
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  const renderOnlineUser = (u) => {
    //console.log("form renderr", friends);
    let f = friends.find((friend) => friend._id == u);
    //console.log("yash", f);
    return <Online key={f?._id} user={f} />;
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            className="birthdayImg"
            src={`https://social-media--app.s3.ap-south-1.amazonaws.com/gift.png`}
            alt=""
          />
          <span className="birthdayText">
            <b>Yash Nistane</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img
          className="rightbarAd"
          src={`https://social-media--app.s3.ap-south-1.amazonaws.com/ad.png`}
          alt=""
        />
        <h4 className="rightbarTitle">Online Friends</h4>
        <Link
          style={{ textDecoration: "none", color: "black" }}
          to="/messenger"
        >
          <ul className="rightbarFriendList">
            {OnlineUsers &&
              OnlineUsers.map((u) => {
                return renderOnlineUser(u);
              })}
          </ul>
        </Link>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <div
          className="aboutHeader
        "
        >
          <span className="rightbarTitle">About</span>
          <span className="editAbout">
            <EditTwoToneIcon style={{ fontSize: "20px" }} /> Edit
          </span>
        </div>

        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              <LocationOnTwoToneIcon />
            </span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          {/* <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div> */}
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">
              <FavoriteTwoToneIcon />
            </span>
            <span className="rightbarInfoValue">{user.relationship}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">{user.username}'s Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{
                textDecoration: "none",
                margin: "0 10px",
                color: "black",
              }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span
                  className="rightbarFollowingName"
                  style={{ fontSize: "14px", marginTop: "4px" }}
                >
                  {friend.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
