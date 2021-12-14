/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-router-dom';
// import Profile from "./Profile";
// import Login from "./Login";
// import { useEffect, useState } from "react";
function NavBar({ email }) {
  return (
    <div className="header" id="top">
      <div className="wrap">
        {/* <!---start-logo----> */}
        <div className="logo">
          <img src={'/images/logo2.png'} title={'logo'} />
        </div>
        <div className="top-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <a href="about.html">About</a>
            </li> */}
            <li>
              <Link to="/Page404">Services</Link>
            </li>
            {email ? (
              <li>
                <Link to={`user/${email}/profile`}>Welcome: {email}</Link>
              </li>
            ) : (
              <li>
                <Link to="user/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
        {/* <!---End-top-nav---->*}
        {/* <!--End-image-slider----> */}
      </div>
      {/* <!---End-header----> */}
    </div>
  );
}

export default NavBar;
