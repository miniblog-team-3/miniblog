import { useDispatch, useSelector } from "react-redux";
import "./MainPage.css";

import React from "react";
import { minus, plus, reset, sum } from "../redux/userRedux";
import PostListPage from "./PostListPage";
import { useLocation } from "react-router-dom";

export default function MainPage() {
  const reduxSelector = useSelector((state) => state);

  const dispatch = useDispatch();
  const location = useLocation();
  console.log('location : ', location);
  return (
    <div className="main-container">
      <h1>메인페이지 입니다.</h1>
      <PostListPage />
    </div>
  );
}
