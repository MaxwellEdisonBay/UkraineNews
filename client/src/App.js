import React from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import Products from "./components/pages/Products";
import Footer from "./components/Footer";
import Login from "./components/pages/Login";
import Write from "./components/pages/Write";
import Settings from "./components/pages/Settings";
import Single from "./components/pages/Single";
import jwt_decode from "jwt-decode";

function App() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
  }

  function handleSignOut(event) {
    setUser({});
  }

  useEffect(() => {
    /* global google */
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
  }, []);

  return (
    <Router>
      <Navbar user={user} handleSignOut={handleSignOut} />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/write" element={<Write user={user} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
