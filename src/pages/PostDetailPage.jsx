import React, { useEffect, useState } from "react";
import "./PostDetailPage.css";
import { getPostId } from "../api/api";
import { useLocation } from "react-router-dom";

export default function PostDetailPage() {
  const [post, setPost] = useState({});
  const [text1, setText1] = useState("");
  const [comments, setComments] = useState([]); // 댓글 목록 상태 추가

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
        console.error("글 디테일 정보가져오기 에러 : ", err);
      }
    };
    fetchData();
  }, [id]);

  const handleChageText = (e) => {
    setText1(e.target.value);
    console.log(e.target.value);
  };

  const handleUploadComment = () => {
    if (text1.trim()) {
      setComments([...comments, text1]); // 새로운 댓글 추가
      setText1(""); // 입력 필드 초기화
    }
    console.log("클릭");
  };

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
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index}>
              <p>{comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
