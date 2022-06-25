import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import useWindowSize from "../../hooks/useWidowSize";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { googleLogin, googleLogout } from "../../utils/authHelper";

function Navbar() {
  const size = useWindowSize();
  const { user } = useContext(Context);

  const [click, setClick] = useState(false);
  const [isLargeScreen, setLargeScreen] = useState(size.width > 960);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    setLargeScreen(size.width > 960);
  }, [size]);

  const imageBasePath =
    window.location.protocol + "//" + window.location.host + "/";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          VálkaUA
          <img
            src={imageBasePath + "ukraine.png"}
            alt="Logo"
            className="ukraine"
            hidden={!isLargeScreen}
          />
        </Link>
        <div className="mobile-menu">
          <div className="sign-in-mobile-div">
            <img
              src={imageBasePath + "/images/google.png"}
              alt="google"
              className="user-picture"
              hidden={isLargeScreen || user}
              onClick={googleLogin}
            />
          </div>
          {user && !isLargeScreen && (
            <Menu
              menuButton={
                <img
                  src={user.profilePhoto}
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                  className="user-picture"
                />
              }
              className="mobile-signin-menu"
            >
              <MenuItem disabled>
                {user.firstName + " " + user.lastName}
              </MenuItem>
              <Link to="/settings" className="context-links">
                <MenuItem>Nastavení</MenuItem>
              </Link>
              <MenuItem onClick={googleLogout}>Odhlásit se</MenuItem>
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
          <li className="nav-item" hidden={!isLargeScreen || user}>
            <div className="nav-links-empty">
              <div className="sign-in-full" onClick={googleLogin}>
                <p>Sign in with Google</p>
                <img src={imageBasePath + "images/google.png"} alt="google" />
              </div>
            </div>
          </li>
        </ul>
        {user && isLargeScreen && (
          <Menu
            menuButton={
              <img
                src={user.profilePhoto}
                alt="Avatar"
                referrerPolicy="no-referrer"
                className="user-picture"
              />
            }
          >
            <MenuItem disabled>{user.firstName + " " + user.lastName}</MenuItem>
            <Link to="/settings" className="context-links">
              <MenuItem>Nastavení</MenuItem>
            </Link>
            <MenuItem onClick={googleLogout}>Odhlásit se</MenuItem>
          </Menu>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
