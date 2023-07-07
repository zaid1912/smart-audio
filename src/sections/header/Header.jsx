import React from "react";
import "./header.css";
import mainlogo from "./mainlogo.png";

function Header() {
  return (
    <header>
      <img src={mainlogo} alt="logo" />
      <h1 className="smart">
        Vocal<span className="audio">AI</span>
      </h1>
    </header>
  );
}
export default Header;
