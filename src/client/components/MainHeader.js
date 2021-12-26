import React from "react";

const MainHeader = () => {
  return (
    <header>
      <div className="logo">logo</div>
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
