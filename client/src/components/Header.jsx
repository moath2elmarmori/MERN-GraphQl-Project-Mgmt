import React from "react";
import { GrGraphQl } from "react-icons/gr";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <Link to={"/"} className="header-logo-and-text-container">
        <div className="graphql-icon">
          <GrGraphQl />
        </div>
        <h2>Project Mgmt</h2>
      </Link>
    </div>
  );
}

export default Header;
