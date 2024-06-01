import React, { useState } from "react";
import "./PostUploadPage.css";
import { useNavigate } from "react-router-dom";

export default function PostUploadPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
    console.log("title : ", e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
    console.log("내용 : ", e.target.value);
  };

  const clickMoveEvent = (e) => {
    e.preventDefault();
    console.log("클릭");
    navigate("/", {
      state: {
        title,
        description,
      },
    });
  };

  return (
    <div className="post-upload-container">
      <form className="post-input">
        <input type="text" name="title" id="title" value={title} onChange={handleChangeTitle} />
        <textarea name="description" id="description" value={description} onChange={handleChangeDescription}></textarea>
        <button onClick={clickMoveEvent}>클릭</button>
      </form>
    </div>
  );
}
