import React, { useEffect, useState } from "react";
import "./PostListPage.css";
import { Link, useNavigate } from "react-router-dom";
import { getLoadPostData } from "../api/api";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  console.log("posts : ", posts);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
  //   setPosts(storedPosts);
  // }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postItem = await getLoadPostData();
        console.log("postItem : ", postItem);
        setPosts(postItem);
      } catch (err) {
        console.error("데이터베이스에서 post에 정보를 가져오는 기능 에러 : ", err);
      }
    };
    fetchPosts();
  }, []);

  const handleClick = (e) => {
    navigate("detail");
  };

  return (
    <>
      <div className="posts-list-container">
        <h2 className="title">인스타그램</h2>
        <p>인기 게시물</p>
        <div className="posts-container">
          {posts.map((el, idx) => {
            return (
              <div className="img-wrapper" key={idx}>
                <Link to={`posts/detail/${el.id}`}>
                  <img src={el.image} alt="" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
