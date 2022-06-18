import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import useWindowSize from "../hooks/useWidowSize";
import { useContext } from "react";
import { Context } from "../context/Context";

function Navbar() {
  const size = useWindowSize();
  const { user, dispatch } = useContext(Context);

  const handleSignOut = () => {
    dispatch({ type: "LOGOUT" });
  };

  const [click, setClick] = useState(false);
  const [isLargeScreen, setLargeScreen] = useState(size.width > 960);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    setLargeScreen(size.width > 960);
  }, [size]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          VálkaUA
          <img
            src="/ukraine.png"
            alt="Logo"
            className="ukraine"
            hidden={!isLargeScreen}
          />
        </Link>
        <div className="mobile-menu">
          <div
            id="signInMobileDiv"
            className="sign-in-mobile-div"
            hidden={isLargeScreen || user}
          />
          {user && !isLargeScreen && (
            <Menu
              menuButton={
                <img
                  src={user.profile_pic}
                  alt="Avatar"
                  className="user-picture"
                />
              }
              className="mobile-signin-menu"
            >
              <MenuItem disabled>{user.name}</MenuItem>
              <Link to="/settings" className="context-links">
                <MenuItem>Nastavení</MenuItem>
              </Link>
              <MenuItem onClick={handleSignOut}>Odhlásit se</MenuItem>
            </Menu>
          )}
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Hlavní
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to=""
              className="nav-links-disabled"
              // onClick={closeMobileMenu}
            >
              Aukce
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/write" className="nav-links" onClick={closeMobileMenu}>
              Nová zpráva
            </Link>
          </li>

          {/* <li>
            <Link
              to="/login"
              className="nav-links-mobile"
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          </li> */}
        </ul>
        {user && isLargeScreen && (
          <Menu
            menuButton={
              <img
                src={user.profile_pic}
                alt="Avatar"
                className="user-picture"
              />
            }
          >
            <MenuItem disabled>{user.name}</MenuItem>
            <Link to="/settings" className="context-links">
              <MenuItem>Nastavení</MenuItem>
            </Link>
            <MenuItem onClick={handleSignOut}>Odhlásit se</MenuItem>
          </Menu>
        )}

        <div id="signInDiv" hidden={!isLargeScreen || user} />
      </div>
    </nav>
  );
}

export default Navbar;
