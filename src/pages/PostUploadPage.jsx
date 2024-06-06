import React, { useContext, useEffect, useState } from "react";
import "./PostUploadPage.css";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { uploadImages, uploadPostData } from "../api/api";

export default function PostUploadPage() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
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

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const clickUploadPost = async (e) => {
    e.preventDefault();
    try {
      const post = {
        title,
        description,
      };

      const url = await uploadImages(file);
      const item = await uploadPostData(post, url);
      if (!title || !description || !file) {
        alert("제목, 내용, 이미지를 모두 입력해주세요.");
        return;
      }
      alert("글을 작성했습니다.");
      navigate("/");
    } catch (err) {
      console.log("글 작성하기 기능 에러 : ", err);
    }
  };

  return (
    <>
      <div className="post-upload-container">
        <form className="post-input">
          <input className="title-input" type="text" placeholder="제목" onChange={handleChangeTitle} name="title" value={title} />
          <textarea className="content-input" placeholder="내용을 입력해주세요" onChange={handleChangeDescription} name="description" value={description} />
          <div className="fileUpload-btn">
            <input className="input-file" type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
            <label htmlFor="image" className="custom-file-upload">
              🔗 파일 선택
            </label>
            {file && <span className="file-name">{file.name}</span>}
          </div>
          <button type="submit" className="upload-btn" onClick={clickUploadPost}>
            등록
          </button>
        </form>
      </div>
    </>
  );
}
