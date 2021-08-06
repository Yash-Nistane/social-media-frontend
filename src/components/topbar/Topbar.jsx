import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  //console.log("yashhhhhhhhh", user);

  const history = useHistory();

  const logOutUser = ()=> {
     window.localStorage.removeItem("user");
     dispatch({TYPE:"LOGOUT"});
     history.push("/signup");
    
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Crowdly</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link className="topbarLink" to="/">
            Homepage
          </Link>
          <Link className="topbarLink" to={`/profile/${user.username}`}>
            Timeline
          </Link>
        </div>
        <div className="topbarIcons">
          {/* <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div> */}
          <Link to="/messenger" className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge"></span>
          </Link>
          {/* <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge"></span>
          </div> */}

          <Link className="topbarLink" style={{paddingTop:"8px"}} onClick={logOutUser}>Log Out</Link>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : "https://social-media--app.s3.ap-south-1.amazonaws.com/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
