import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Fab } from "react-tiny-fab";
import "./Write.css";

// const tx = document.getElementsByTagName("write-input write-text");
// for (let i = 0; i < tx.length; i++) {
//   tx[i].setAttribute(
//     "style",
//     "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
//   );
//   tx[i].addEventListener("input", OnInput, false);
//   console.log("blobbb");
// }

// function OnInput() {
//   this.style.height = "auto";
//   this.style.height = this.scrollHeight + "px";
// }

export default function Write({ user }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(Object.keys(user).length === 0);
    console.log("LOGIN RAN " + isLoggedIn);
  }, [user]);
  return (
    <div className="write">
      <div id="writeModule" hidden={isLoggedIn}>
        <img src="/images/img-1.jpg" alt="" className="write-image" />
        <form className="write-form">
          <div className="write-form-group">
            <label htmlFor="file-input">
              <i className="write-icon fa-solid fa-plus"></i>
            </label>
            <input type="file" id="file-input" style={{ display: "none" }} />
            <input
              type="text"
              placeholder="Title"
              className="write-input"
              autoFocus={true}
            />
          </div>
          <div className="write-form-group">
            <TextareaAutosize
              placeholder="Tell your story..."
              type="text"
              className="write-input write-text"
            />
          </div>
          <Fab icon={<i className="fa-solid fa-pen"></i>} />
          <button className="write-submit">Publish</button>
        </form>
      </div>
      {isLoggedIn ? (
        <div className="error-block">
          <i className="fa-solid fa-triangle-exclamation"></i>
          <div className="error-text">
            Přihlaste se prosím, abyste mohli přidávat nové příspěvky
          </div>
        </div>
      ) : null}
    </div>
  );
}
