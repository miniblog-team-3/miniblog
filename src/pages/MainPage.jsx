import { useDispatch, useSelector } from "react-redux";
import "./MainPage.css";

import React from "react";
import { minus, plus, reset, sum } from "../redux/userRedux";
import PostListPage from "./PostListPage";

export default function MainPage() {
  //const reduxSelector = useSelector((state) => state);

  //const dispatch = useDispatch();
  return (
    <div className="main-container">
      <PostListPage />
    </div>
  );
}
