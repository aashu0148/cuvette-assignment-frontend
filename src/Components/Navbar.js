import React from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@material-ui/core";

import logo from "../assets/logo.png";

function Navbar() {
  return (
    <div className="navbar">
      <Link style={{ textDecoration: "none" }} to="/">
        <img alt="LOGO" src={logo} style={{ height: "30px" }} />
      </Link>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link style={{ textDecoration: "none" }} to="/listing">
          <p>My Listings</p>
        </Link>

        <Avatar
          style={{ marginLeft: "30px", height: "32px", width: "32px" }}
          src="https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375__340.png"
        />
      </div>
    </div>
  );
}

export default Navbar;
