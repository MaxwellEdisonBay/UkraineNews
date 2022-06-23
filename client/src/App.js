import React, { useContext } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import Products from "./components/pages/Products";
import Footer from "./components/Footer";
import Login from "./components/pages/Login";
import Write from "./components/pages/Write";
import Settings from "./components/pages/Settings";
import Single from "./components/pages/Single";
import axios from "axios";
import { Context } from "./context/Context";

export const API_URL = "https://ukrajinazije.cz/api";

function App() {
  const { dispatch, user } = useContext(Context);

  // if (localStorage.getItem("loginData") !== null) {
  //   console.log(JSON.parse(localStorage.getItem("loginData")));
  // }

  function handleCallbackResponse(response) {
    // var userObject = jwt_decode(response.credential);
    // console.log(userObject);
    dispatch({ type: "LOGIN_START" });
    axios
      .post(`${API_URL}/auth/google`, response)
      .then((res) => {
        console.log("DATA RECEIVED");
        console.log(res);
        if (res.status === 200) {
          dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } else {
          dispatch({ type: "LOGIN_FAILURE" });
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: "LOGIN_FAILURE" });
      });
  }

  useEffect(() => {
    /* global google */
    const google = window.google;

    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });
    // google.accounts.id.prompt();
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      type: "standard",
      shape: "circle",
      text: "continue_with",
    });
    google.accounts.id.renderButton(
      document.getElementById("signInMobileDiv"),
      {
        type: "icon",
        shape: "circle",
      }
    );
  });

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
