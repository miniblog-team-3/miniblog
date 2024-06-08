import React, { useEffect, useState } from "react";
import "./PostDetailPage.css";
import { setComment, getPostId, getComment, deletePostDat } from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function PostDetailPage() {
  const [post, setPost] = useState({});
  console.log("post : ", post);
  const [text1, setText1] = useState("");
  const [comments, setComments] = useState([]); // 댓글 목록 상태 추가
  // console.log("comments : ", comments);

  const location = useLocation();
  const pathName = location.pathname;
  const id = pathName.split("/").pop();

  const navigete = useNavigate();

  const [user, setUser] = useState(null);
  // console.log("user : ", user);

  const userUid = localStorage.getItem("uid");
  console.log("userUid : ", userUid);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

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
    if (!user) {
      alert("로그인 전용기능입니다. 로그인 페이지로 이동합니다.");
      navigete("/login");
      return;
    }
    try {
      if (!text1) {
        alert("댓글 내용을 작성해주세요");
        return;
      }
      const res = await setComment(id, text1, user.displayName);
      fetchComments();
      console.log("res : ", res);
      setText1("");
    } catch (err) {
      console.log("댓글 데이터베이스 업로드 기능 에러 : ", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await getComment(id);
      setComments(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const clickDeletePost = async () => {
    try {
      if (!user) {
        alert("댓글을 지울수 없습니다.");
      } else {
        const res = await deletePostDat(id);
        alert("글 삭제에 성공했습니다.");
        navigete("/");
      }
    } catch (err) {
      console.log("글 삭제 기능 에러 : ", err);
    }
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
          {/* <label htmlFor="comment">댓글</label> */}
          <div className="input-wrap">
            <input type="text" id="comment" name="comment" onChange={handleChageText} value={text1} placeholder="댓글을 달아주세요." />
          </div>
          <button className="comment-btn" type="button" onClick={handleUploadComment}>
            등록
          </button>
        </form>
      </div>
      <div className="comments-list">
        {comments.map((comment, index) => (
          <div key={index} className="comments-wrap">
            <p>{comment.userName} :</p>
            <p>{comment.comments}</p>
          </div>
        ))}
      </div>
      {post?.userUid === userUid ? (
        <button className="delete-btn" type="button" onClick={clickDeletePost}>
          삭제
        </button>
      ) : null}
    </div>
  );
}
