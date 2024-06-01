import React, { useContext, useEffect, useState } from "react";
import "./PostUploadPage.css";
import { Link, useNavigate, useOutletContext } from "react-router-dom";

export default function PostUploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
    console.log("title: ", e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
    console.log("내용: ", e.target.value);
  };

  const clickMoveEvent = (e) => {
    e.preventDefault();
    const postData = { title, description };
    const existingData = JSON.parse(localStorage.getItem("posts")) || [];
    localStorage.setItem("posts", JSON.stringify([...existingData, postData]));
    navigate(
      "/"
      // {
      //   state: {
      //     title,
      //     description
      //   }
      // }
    );
  };

  return (
    <>
      <div className="post-upload-container">
        <form className="post-input">
          <input className="title-input" type="text" placeholder="제목" onChange={handleChangeTitle} name="title" value={title} />
          <textarea className="content-input" placeholder="내용을 입력해주세요" onChange={handleChangeDescription} name="description" value={description} />
          <input type="file" />
          <button type="submit" className="upload-btn" onClick={clickMoveEvent}>
            등록
          </button>
        </form>
      </div>
    </>
  );
}
