import "./Settings.css";

import React from "react";

function Settings() {
  return (
    <div className="settings">
      <div className="settings-wrapper">
        <div className="settings-title">
          <span className="settings-update-title"> Update Your Account</span>
          <span className="settings-delete-title"> Delete Account</span>
        </div>
        <form className="settings-form">
          <label>Profile Picture</label>
          <div className="settings-profile-picture">
            <img src="/images/img-1.jpg" alt="" />
            <label htmlFor="file-input">
              <i className="settings-profile-picture-icon fa-solid fa-user"></i>
            </label>
            <input type="file" id="file-input" style={{ display: "none" }} />
          </div>
          <label>Username</label>
          <input type="text" placeholder="Safak" />
          <label>Email</label>

          <input type="email" placeholder="afak@gmail.com" />
          <label>Password</label>

          <input type="password" />
          <button className="settings-submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
