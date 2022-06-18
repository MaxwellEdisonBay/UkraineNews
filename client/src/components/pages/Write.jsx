import React, { useState, useEffect } from "react";
import { useContext } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { Fab } from "react-tiny-fab";
import { Context } from "../../context/Context";
import "./Write.css";

export default function Write() {
  const { user } = useContext(Context);
  return (
    <div className="write">
      <div id="writeModule" hidden={!user}>
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
    </div>
  );
}
