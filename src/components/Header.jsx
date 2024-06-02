import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  const user = JSON.parse(sessionStorage.getItem("user")); // sessionStorage에서 유저 정보를 가져옴
  console.log("user : ", user);

  return (
    <div className="header-container">
      <ul className="header-wrap">
        {/* 로고  */}

        <li className="img-wrap">
          <Link to="/">
            <img src="/1.png" alt="프로젝트 로고" />
          </Link>
        </li>

        {/* 로그인 & 유저 */}
        <div className="user-info-wrap">
          <li className="user-login">
            <Link to="/login">{user ? <p>로그아웃</p> : <p>로그인</p>}</Link>
            <ul className="sub-menu">
              <Link to="/signup">
                <li>회원가입</li>
              </Link>
            </ul>
          </li>

          <Link to="/posts/upload">
            <li className="upload">글쓰기</li>
          </Link>
        </div>
      </ul>
    </div>
  );
}
