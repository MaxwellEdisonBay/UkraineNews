import "./Login.css";
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    /* global google */
    // google.accounts.id.initialize({
    //   client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    //   callback: handleCallbackResponse,
    // });
    // google.accounts.id.prompt();
    google.accounts.id.renderButton(document.getElementById("signInDivLogin"), {
      type: "standard",
      shape: "circle",
      text: "continue_with",
    });
  });
  return (
    <div className="login">
      <span className="login-title">Login</span>
      <div id="signInDivLogin" />
      <form className="login-form">
        <label>Email</label>
        <input
          type="text"
          className="login-input"
          placeholder="Enter your email"
        />
        <label>Password</label>
        <input
          type="password"
          className="login-input"
          placeholder="Enter your password"
        />
        <div className="login-buttons-bar">
          <button className="login-button">Login</button>
          <button className="login-register-button">Sign Up</button>
        </div>
      </form>
    </div>
  );
}
