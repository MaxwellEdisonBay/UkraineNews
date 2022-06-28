import React, { useContext } from "react";

import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single_post/Single";
import { Context } from "./context/Context";
import ScrollToTop from "./utils/scrollToTop";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Admin from "./pages/admin/Admin";

export const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const { user } = useContext(Context);

  // console.log(user);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
        <Route path="/post/:postId" element={<Single />} />
        <Route path="/admin" element={user ? <Admin /> : <Login />} />
      </Routes>
      <Footer />
      <NotificationContainer />
    </Router>
  );
}

export default App;
