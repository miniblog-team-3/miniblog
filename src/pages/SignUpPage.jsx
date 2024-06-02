import React, { useState } from "react";
import "./SignUpPage.css";
import { Link, useNavigate } from "react-router-dom";
import { joinEmail } from "../api/api";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { RiLockPasswordFill, RiLockPasswordLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

export default function SignUpPage() {
  const navigete = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [name, setName] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPwValid, setConfirmPwValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);

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
    const passwordRegEx = /^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*?~_]).{8,}$/;
    if (passwordRegEx.test(password)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  // 비밀번호 재입력
  const handleConfirmPassword = (e) => {
    const confirmPwValue = e.target.value;
    setConfirmPw(confirmPwValue);

    // 비밀번호 유효성 검사
    const confirmPWdRegEx = /^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*?~_]).{8,}$/;

    if (confirmPWdRegEx.test(confirmPw)) {
      setConfirmPwValid(true);
    } else {
      setConfirmPwValid(false);
    }
  };

  // 이름 입력
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const clickSignUpEvent = async () => {
    try {
      const res = await joinEmail(email, password, name);
      alert("회원가입에 성공했습니다.");
      navigete("/login");
    } catch (err) {
      console.log("이메일 회원가입 기능 에러 : ", err);
      if (err.code === "auth/email-already-in-use") {
        alert("이미 사용중인 이메일");
      } else {
        alert("회원가입에 실패하였습니다.");
      }
    }
  };

  return (
    <>
      <div className="sign-up-container">
        <div className="title">회원가입</div>
        <p className="title-sub">회원이 되어 다양한 혜택을 경험해 보세요!</p>

        <div className="input-box">
          <div className="email-box">
            <p>이메일 주소</p>
            <div className="input-wrap">
              <FaUser />
              <input id={"email"} type="text" name="email" placeholder="email@gmail.com" value={email} onChange={handelEmailChange} />
            </div>
          </div>
          <div className="error-message">{!emailValid && email.length > 0 && <div>이메일을 올바르게 입력해주세요.</div>}</div>
          <div className="password-box">
            <p>비밀번호</p>
            <div className="input-wrap">
              <RiLockPasswordLine />
              <input id={"password"} type="password" name="password" placeholder="영문, 숫자, 특수문자 포함 8자 이상" value={password} onChange={handlePasswordChange} />
            </div>
          </div>
          <div className="error-message">{!passwordValid && password.length > 0 && <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>}</div>
          <div className="password-box-2">
            <p>비밀번호 확인</p>
            <div className="input-wrap">
              <RiLockPasswordFill />
              <input id={"confirmPw"} type="password" name="confirmPw" placeholder="비밀번호를 한번 더 입력해주세요" value={confirmPw} onChange={handleConfirmPassword} />
            </div>
            <div className="error-message">{confirmPw !== password && confirmPw.length > 0 && <div>비밀번호가 같지 않습니다.</div>}</div>
          </div>
          <div className="name-box">
            <p>이름</p>
            <div className="input-wrap">
              <MdDriveFileRenameOutline />
              <input id={"name"} type="name" name="name" placeholder="이름을 입력해주세요" value={name} onChange={handleNameChange} />
            </div>
          </div>
          <div className="last-box">
            <button className="signup-btn" type="button" onClick={clickSignUpEvent}>
              가입하기
            </button>
            <button className="cancle-btn" type="button">
              <Link to="/login">취소하기</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
