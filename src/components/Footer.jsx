import "./Footer.css";

import React from "react";

export default function Footer() {
  return (
    <>
      <div className="footer-container">
        <ul className="footer-list">
          <li className="footer-item">
            <span className="role">Frontend development :</span>
            <span className="name">박준성</span>
          </li>
          <li className="footer-item">
            <span className="role">Frontend development :</span>
            <span className="name">이지수</span>
          </li>
          <li className="footer-item">
            <span className="role">Frontend development :</span>
            <span className="name">송정아</span>
          </li>
        </ul>
      </div>
    </>
  );
}
