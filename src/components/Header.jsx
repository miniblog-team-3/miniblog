import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
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
            <Link to="/login">
              <p>로그인</p>
            </Link>
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
