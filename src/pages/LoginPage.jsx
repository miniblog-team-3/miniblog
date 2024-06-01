import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

export default function LoginPage() {
  const navigete = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  // const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  // const passwordRegEx = /^[A-Za-z0-9]{8,20}$/

  // 이메일 입력
  const handelEmailChange = (e) => {
    setEmail(e.target.value);
    // console.log("email : ", e.target.value)

    // 이메일 유효성 검사
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
    if (emailRegEx.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  // 비밀번호 입력
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // console.log("password : ", e.target.value)

    // 비밀번호 유효성 검사
    const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;
    if (passwordRegEx.test(password)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="title">회원 로그인</div>

        <div className="input-box">
          <div className="email-box">
            <p>이메일 주소</p>
            <input id={"email"} type="text" name="email" placeholder="email@gmail.com" value={email} onChange={handelEmailChange} />
          </div>
          <div className="error-message">{!emailValid && email.length > 0 && <div>이메일을 올바르게 입력해주세요.</div>}</div>
          <div className="password-box">
            <p>비밀번호</p>
            <input id={"password"} type="password" name="password" placeholder="영문, 숫자, 특수문자 포함 8자 이상" value={password} onChange={handlePasswordChange} />
          </div>
          <div className="error-message">{!passwordValid && password.length > 0 && <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>}</div>
          <button className="login" type="button">
            로그인
          </button>
          <button className="google-login" type="button">
            구글 로그인
          </button>
          <div>
            <div className="signup-box">
              <span>계정이 없으신가요?</span>
              <Link to={"/signup"}>
                <span className="signup">회원가입</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
