import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Logo />
      <ul className="nav-links">
        <Link to="/">
          <li className="nav-link-text">Home</li>
        </Link>
      </ul>
    </nav>
  );
}

const Logo = () => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 379 363"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M353.5 181.5C353.5 266.631 281.122 337.5 189.5 337.5C97.8775 337.5 25.5 266.631 25.5 181.5C25.5 96.369 97.8775 25.5 189.5 25.5C281.122 25.5 353.5 96.369 353.5 181.5Z"
        stroke="#f7cac9"
        strokeWidth="51"
      />
      <path
        d="M247 86L248.671 341L227.5 341C227.778 313.788 231.128 257.813 226.614 250.157C221.601 241.653 221 240.5 214.5 234C212.746 223.5 211.743 225.631 212.746 176.99C213.748 128.348 236 96.0627 247 86Z"
        fill="#f7cac9"
      />
      <path
        d="M150.885 231.5C150.885 217.5 149.385 210.5 136.885 206C124.385 201.5 132.235 132.667 134.735 96H139.885L142.885 173H148.385L150.885 96H156.235V173H162.885L165.385 96H170.735V173H176.735L179.385 96H184.235C188.235 126 195.385 201.5 181.885 206C166.706 211.06 168.385 220 168.385 231.5C168.385 243 166.052 306 168.385 337H150.885V243.5V231.5Z"
        fill="#f7cac9"
      />
    </svg>
  );
};

export default Nav;
