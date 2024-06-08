import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();

  // 현재 경로가 로그인 페이지 또는 회원가입 페이지인지 확인
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";

  // 로그인 페이지 또는 회원가입 페이지에서는 푸터를 표시하지 않음
  if (isLoginPage || isSignupPage) {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  }

  // 그 외의 페이지에서는 푸터를 표시
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
