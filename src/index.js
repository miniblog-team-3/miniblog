import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostUploadPage from "./pages/PostUploadPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";
import { Provider } from "react-redux";
import { store } from "./redux/userRedux";

// npm i react-router-dom@6     ---> 터미널 입력 후 설치
// react-router-dom : 경로를 나누고 페이지를 설정할때 사용하는 라이브러리

//react-router-dom 사용법

//페이지를 나눌 때는 이런식으로 사용하면 됩니다.
/*
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='about' element={<AboutPage />} />
      <Route path='mypage' element={<MyPage />} />
    </Routes>
  </BrowserRouter>
*/

//페이지를 이동할 때는 이런식으로 사용하면 됩니다.
/*
  <Link to='/'>home</Link>
  <Link to='/about'>About</Link>
  <Link to='/mypage'>My page</Link>
*/

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/post">
              <Route index element={<PostListPage />} />
              <Route path="detail" element={<PostDetailPage />} />
              <Route path="upload" element={<PostUploadPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </>
);
