import React from "react";
import "./footer.css";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

function Footer() {
  return (
    <footer>
      <div className="rightsText">
        <AiOutlineCopyrightCircle className="icon" />
        <p>2023 VocalAI by Zaid Muzammil. All rights reserved</p>
      </div>
    </footer>
  );
}
export default Footer;
