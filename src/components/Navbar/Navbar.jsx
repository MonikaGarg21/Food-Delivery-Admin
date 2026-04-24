import React from "react";
import "./Navbar.css";
import {assets} from "../../assets/assets.js";

const Navbar = () => {
  return (
    <div className="navbar">
      <img alt="logo" src={assets.dark_logo} className="logo" />
      <img alt="profile" src={assets.official_profile_image} className="profile" />
    </div>
  );
};

export default Navbar;