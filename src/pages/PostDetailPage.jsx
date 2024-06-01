import React, { useEffect, useState } from "react";
import "./PostDetailPage.css";
import { getPostId } from "../api/api";
import { useLocation } from "react-router-dom";

export default function PostDetailPage() {
  const [post, setPost] = useState({});

  //현재 url 제공하는 훅
  const location = useLocation();
  const pathName = location.pathname;

  const id = pathName.split("/").pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailId = await getPostId(id);
        console.log("detailId : ", detailId);
        setPost(detailId);
      } catch (err) {
        console.error("글 디테일 정보가져오기 에러  : ", err);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="container">
      <div className="post-detail-container">
        <div className="img-wrapper">
          <img src={post.image} alt="로고" />
        </div>
        <div className="content-wrapper">
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      </div>
      <div className="comments-container">
        <form className="comments-wrapper">
          <label htmlFor="comment">댓글</label>
          <div className="input-wrap">
            <input type="text" id="comment" name="comment" placeholder="댓글을 달아주세요." />
          </div>
        </form>
      </div>
    </div>
  );
}
