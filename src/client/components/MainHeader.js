import React from "react";
import logo from "../images/logo.svg";

const MainHeader = () => {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="" />
        <h1>EVALUATE NEWS</h1>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a
              href="https://www.meaningcloud.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Meaningcloud API
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
