import React from "react";
import "./PostListPage.css";
import { useLocation } from "react-router-dom";

export default function PostListPage() {
  const location = useLocation();
  const title = location.state ? location.state.title : null;
  const description = location.state ? location.state.description : null;

  return (
    <div className="post-list-container">
      {title && (
        <>
          <h2>{title}</h2>
          <p>{description}</p>
        </>
      )}
      {!title && <p>글 목록이 없습니다.</p>}
    </div>
  );
}
