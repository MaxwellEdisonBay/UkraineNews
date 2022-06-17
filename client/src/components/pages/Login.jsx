import "./Login.css";
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Login() {
  return (
    <div className="login">
      <span className="login-title">Login</span>
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const res = await axios
            .post(
              "http://localhost:5000/api/google-login",
              {
                token: credentialResponse.clientId,
              },
              { "Content-Type": "application/json" }
            )
            .catch((error) => {
              console.log(error);
            });
          console.log(credentialResponse);
          localStorage.setItem("loginData", res.data);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
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
