import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import useWindowSize from "../hooks/useWidowSize";

function Navbar({ user, handleSignOut }) {
  const size = useWindowSize();
  const [click, setClick] = useState(false);
  const [isLargeScreen, setLargeScreen] = useState(size.width > 960);
  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData") ? localStorage.getItem("loginData") : null
  );
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(Object.keys(user).length !== 0);
    console.log("isLoggedIn = " + isLoggedIn);
  }, [user]);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    setLargeScreen(size.width > 960);
    console.log("isButton = " + isLargeScreen);
  }, [size]);

  // useEffect(
  //   (button, isLoggedIn) => {
  //     const showButton = () => {
  //       /* global google */
  //       if (isLoggedIn) {
  //         // google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //         //   type: "standard",
  //         //   shape: "circle",
  //         //   text: "continue_with",
  //         // });
  //         // google.accounts.id.renderButton(
  //         //   document.getElementById("signInMobileDiv"),
  //         //   {
  //         //     type: "icon",
  //         //     shape: "circle",
  //         //   }s
  //         // );
  //       }
  //       if (window.innerWidth < 960) {
  //         console.log("Set false");
  //         setButton(false);
  //       } else if (window.innerWidth > 960) {
  //         console.log("Set true");
  //         setButton(true);
  //       }
  //       console.log("button = " + button);
  //       console.log("window.innerWidth = " + window.innerWidth);
  //     };
  //     showButton();
  // const renderGoogle = () => {
  //   /* global google */
  //   google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //     type: "standard",
  //     shape: "circle",
  //     text: "continue_with",
  //   });
  //   google.accounts.id.renderButton(
  //     document.getElementById("signInMobileDiv"),
  //     {
  //       type: "icon",
  //       shape: "circle",
  //     }
  //   );
  // };
  // window.addEventListener("resize", renderGoogle);
  //   },
  //   [button]
  // );
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          VálkaUA
          {/* <i className="fab fa-typo3" /> */}
          <img src="/ukraine.png" alt="Logo" className="ukraine" />
        </Link>
        <div className="mobile-menu">
          {/* {isLoggedIn ? ( */}
          <div
            id="signInMobileDiv"
            className="sign-in-mobile-div"
            hidden={isLargeScreen || isLoggedIn}
          />
          {/* ) : null}  */}
          {isLoggedIn && !isLargeScreen && (
            <Menu
              menuButton={
                <img src={user.picture} alt="Avatar" className="user-picture" />
              }
              className="mobile-signin-menu"
            >
              <MenuItem disabled>
                {user.given_name + " " + user.family_name}
              </MenuItem>
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

          <li>
            <Link
              to="/login"
              className="nav-links-mobile"
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          </li>
        </ul>
        {isLoggedIn && isLargeScreen && (
          <Menu
            menuButton={
              <img src={user.picture} alt="Avatar" className="user-picture" />
            }
          >
            <MenuItem disabled>
              {user.given_name + " " + user.family_name}
            </MenuItem>
            <Link to="/settings" className="context-links">
              <MenuItem>Nastavení</MenuItem>
            </Link>
            <MenuItem onClick={handleSignOut}>Odhlásit se</MenuItem>
          </Menu>
        )}

        <div id="signInDiv" hidden={!isLargeScreen || isLoggedIn} />
        {/* {loginData
          ? button && <Button buttonStyle="btn--outline">SIGN UP</Button>
          : button && <Button buttonStyle="btn--outline">SIGN OUT</Button>} */}
      </div>
    </nav>
  );
}

export default Navbar;
