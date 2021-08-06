import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useEffect, useState } from "react";
import axios from "../../helpers/axios";
import { useParams } from "react-router";
import EditIcon from "@material-ui/icons/Edit";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [profilePic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [coverEdit, setCoverEdit] = useState(false);
  const [profileEdit, setProfileEdit] = useState(false);

  const username = useParams().username; //app.js routes

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const editProfilePic = async () => {
    setProfileEdit(false);
    if (profilePic) {
      const form = new FormData();

      form.append("profilePic", profilePic);
      try {
        const res = await axios.post(
          `users/editProfile/${currentUser._id}`,
          form
        );

        if (res.status == 200) {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
          alert("Profile photo uploaded succesfully !");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editCoverPic = async () => {
    setCoverEdit(false);
    if (coverPic) {
      const form = new FormData();

      form.append("coverPic", coverPic);
      try {
        const res = await axios.post(
          `users/editCover/${currentUser._id}`,
          form
        );
        if (res.status == 200) {
          alert("Cover photo uploaded succesfully !");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              {coverPic ? (
                <img
                  className="profileCoverImg"
                  src={
                    URL.createObjectURL(coverPic)
                    // user.coverPicture
                    //   ? PF + user.coverPicture
                    //   : PF + "person/noCover.png"
                  }
                  alt=""
                />
              ) : (
                <img
                  className="profileCoverImg"
                  src={
                    user.coverPicture
                      ? user.coverPicture
                      : "https://social-media--app.s3.ap-south-1.amazonaws.com/noCover.png"
                  }
                  alt=""
                />
              )}

              {profilePic ? (
                <img
                  className="profileUserImg"
                  src={URL.createObjectURL(profilePic)}
                  alt=""
                />
              ) : (
                <img
                  className="profileUserImg"
                  src={
                    user.profilePicture
                      ? user.profilePicture
                      : "https://social-media--app.s3.ap-south-1.amazonaws.com/noAvatar.png"
                  }
                  alt=""
                />
              )}

              {!profileEdit && currentUser.username == username ? (
                <div className="editDiv" onClick={editProfilePic}>
                  <label
                    htmlFor="editProfilePhoto"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <EditIcon style={{ color: "#333" }} />
                    {/* <span className="shareOptionText">Photo or Video</span> */}
                    <input
                      style={{ display: "none" }}
                      id="editProfilePhoto"
                      type="file"
                      accept=".png,.jpeg,.jpg"
                      onChange={(e) => {
                        setProfilePic(e.target.files[0]);
                        setProfileEdit(true);
                      }}
                    />
                  </label>
                </div>
              ) : null}

              {profileEdit && currentUser.username == username ? (
                <div className="editDiv" onClick={editProfilePic}>
                  <div
                    htmlFor="editProfilePhoto"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <CloudUploadOutlinedIcon style={{ color: "#333" }} />
                    {/* <span className="shareOptionText">Photo or Video</span> */}
                  </div>
                </div>
              ) : null}

              {!coverEdit && currentUser.username == username ? (
                <div className="editCover">
                  <label htmlFor="editCoverPhoto" className="editCoverLabel">
                    Edit <EditOutlinedIcon style={{ marginLeft: "5px" }} />
                  </label>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="editCoverPhoto"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => {
                      setCoverPic(e.target.files[0]);
                      setCoverEdit(true);
                    }}
                    //onChange={editCoverPic}
                  />
                </div>
              ) : null}

              {coverEdit && currentUser.username == username ? (
                <div className="editCover" onClick={editCoverPic}>
                  <div htmlFor="editCoverPhoto" className="editCoverLabel">
                    Upload{" "}
                    <CloudUploadOutlinedIcon style={{ marginLeft: "5px" }} />
                  </div>
                </div>
              ) : null}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
