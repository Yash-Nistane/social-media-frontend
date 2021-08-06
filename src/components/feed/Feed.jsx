import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "../../helpers/axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({username,home}) {

  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
       const res = home 
       ? await axios.get("posts/timeline/" + user._id)
       : await axios.get("posts/profile/" + username);

     // const res = await axios.get("posts/timeline/" + user._id);
      setPosts(res.data.sort((p1,p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* share component will be visible on only users profile */}
       {!username || username === user.username && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
