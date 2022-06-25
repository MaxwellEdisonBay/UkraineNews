import "./Login.css";
import React from "react";

export default function Login() {
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
