import React, { useEffect, useState } from "react";
import "./PostListPage.css";
import { useNavigate } from "react-router-dom";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);
  }, []);

  const handleClick = (e) => {
    navigate("detail");
  }

  return (
    <>
      <div className="post-list-container">
        {posts.length > 0 ? (
          posts.map((post, idx) => (
            <div key={idx} onClick={handleClick} style={{ cursor: "pointer"}}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>글 목록이 없습니다.</p>
        )}
      </div>
    </>
  );
}
