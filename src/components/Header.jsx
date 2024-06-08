import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  };

  const clickWriteMove = () => {
    if (!user) {
      alert("로그인전용 기능입니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
      return;
    } else {
      navigate("/posts/upload");
    }
  };

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
            {user ? (
              <p onClick={handleLogout}>로그아웃</p>
            ) : (
              <Link to="/login">
                <p>로그인</p>
              </Link>
            )}
            {!user && (
              <ul className="sub-menu">
                <Link to="/signup">
                  <li>회원가입</li>
                </Link>
              </ul>
            )}
          </li>

          <li className="upload" onClick={clickWriteMove}>
            글쓰기
          </li>
        </div>
      </ul>
    </div>
  );
}
