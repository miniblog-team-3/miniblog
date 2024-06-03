import React, { useEffect, useState } from "react";
import "./PostDetailPage.css";
import { setComment, getPostId, getComment } from "../api/api";
import { useLocation } from "react-router-dom";

export default function PostDetailPage() {
  const [post, setPost] = useState({});
  // console.log("post : ", post);
  const [text1, setText1] = useState("");
  const [comments, setComments] = useState([]); // 댓글 목록 상태 추가
  // console.log("comments : ", comments);

  const location = useLocation();
  const pathName = location.pathname;
  const id = pathName.split("/").pop();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailId = await getPostId(id);
        // console.log("detailId : ", detailId);
        setPost(detailId);
      } catch (err) {
        console.error("글 디테일 정보가져오기 에러 : ", err);
      }
    };
    fetchData();
  }, [id]);

  const handleChageText = (e) => {
    setText1(e.target.value);
    console.log(e.target.value);
  };

  const handleUploadComment = async () => {
    try {
      const res = await setComment(text1);
      console.log("res : ", res);
      setText1("");
    } catch (err) {
      console.log("댓글 데이터베이스 업로드 기능 에러 : ", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getComment();
        setComments(res);
      } catch (err) {
        console.error("댓글 가져오는 기능 api 에러 : ", err);
      }
    };
    fetchData();
  }, [comments]);

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
        <form className="comments-wrapper" onSubmit={(e) => e.preventDefault()}>
          {" "}
          {/* 폼 제출 방지 */}
          <label htmlFor="comment">댓글</label>
          <div className="input-wrap">
            <input type="text" id="comment" name="comment" onChange={handleChageText} value={text1} placeholder="댓글을 달아주세요." />
          </div>
          <button type="button" onClick={handleUploadComment}>
            댓글작성
          </button>
        </form>
        {comments.map((el, idx) => {
          return (
            <div className="comments-list" key={idx}>
              <span>준성 |</span>
              <p>{el}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
