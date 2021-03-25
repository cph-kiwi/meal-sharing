import React from "react";
import "../App.css";

function Footer() {
  return (
    <footer>
      <ul className="footer-links">
        <li>
          <a href="mailto:beth.jack@gmail.com" className="footer-link-text">
            Created by Beth Jackson
          </a>
        </li>
        <li>
          <a href="https://github.com/cph-kiwi" className="footer-link-text">
            Beth Jackson on github
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
