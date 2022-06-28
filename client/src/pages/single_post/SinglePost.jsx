import axios from "axios";
import React from "react";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { API_URL } from "../../App";
import { Button } from "../../components/main_button/Button";
import useWindowSize from "../../hooks/useWidowSize";
import { Editor } from "@tinymce/tinymce-react";

import "./SinglePost.css";
import { Context } from "../../context/Context";
import { createNotification } from "../../utils/notificationManager";
import DOMPurify from "dompurify";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

// const Carousel = require("react-responsive-carousel").Carousel;

export default function SinglePost() {
  const location = useLocation();
  const { user, dispatch, isFetching } = useContext(Context);
  const size = useWindowSize();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const coeff = size.width > 960 ? 0.025 : 0.055;
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${API_URL}/api/posts/` + path);
      setPost(res.data);
      setEditText(res.data.text);
      setEditTitle(res.data.title);
    };
    getPost();
  }, [path]);
  let canEdit = false;
  if (user) {
    canEdit = user._id === post.userID || user.group === "admin";
  }
  const createdDate = new Date(post.createdAt).toLocaleString("en-GB", {
    hour12: false,
  });

  const handleEditButton = async () => {
    if (editing) {
      const updatedPost = { ...post };
      updatedPost.text = DOMPurify.sanitize(editText);
      updatedPost.title = editTitle;
      dispatch({ type: "FETCHING_START" });
      const res = await axios.put(`${API_URL}/api/posts/${path}`, updatedPost);
      dispatch({ type: "FETCHING_FINISH" });
      createNotification("single_post_edit_saved");
      console.log(res);
      setPost(res.data);
      console.log(post);
    }
    setEditing(!editing);
  };
  const handleDeleteDialogue = async () => {
    setDeleteDialogOpen(false);
    dispatch({ type: "FETCHING_START" });
    const res = await axios.delete(
      `${API_URL}/api/posts/${path}`,
      {},
      { test: "test" }
    );
    dispatch({ type: "FETCHING_FINISH" });
    if (res.status === 200) {
      createNotification("single_post_delete_post");

      window.location.replace("/");
    }
  };

  const handleEditBackButton = () => {
    setEditing(!editing);
    setEditText(post.text);
    setEditTitle(post.title);
  };

  return (
    <div className="single-post">
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>{"Smazat příspěvek"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Opravdu chcete tento příspěvek smazat?
          </DialogContentText>
        </DialogContent>

        <DialogActions style={{ display: "flex", flexDirection: "row" }}>
          <Button onClick={handleDeleteDialogue} color="primary" autoFocus>
            Ano
          </Button>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Ne
          </Button>
        </DialogActions>
      </Dialog>
      <div className="single-post-wrapper">
        {/* <Carousel showArrows={true}>
          {post.photos &&
            post.photos.map((p) => (
              <img src={p} alt="" className="single-post-image" />
            ))}
        </Carousel> */}
      </div>
      <h1 className="single-post-top">
        {/* {post.title} */}
        {editing ? (
          <div>
            <i
              className="single-post-icon fa-solid fa-pen"
              style={{ fontSize: "0.73em" }}
            />
            <input
              type="text"
              placeholder="Title"
              className="write-input"
              autoFocus={true}
              disabled={isFetching}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
          </div>
        ) : (
          <div className="single-post-title">
            {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
            nesciunt inventore et nostrum voluptatem sapiente esse ratione.
            Necessitatibus error impedit debitis quaerat sint hic, consequuntur
            vero voluptatem nihil ab suscipit. */}
            {post.title}
          </div>
        )}
        {canEdit && (
          <div className="single-post-edit">
            {editing && (
              <Button
                buttonStyle="btn--black"
                buttonSize="btn--small"
                onClick={handleEditBackButton}
              >
                <i
                  className="single-post-icon fa-solid fa-arrow-left"
                  style={{ color: "#F7DE3A", marginRight: "5px" }}
                />
                Zpět
              </Button>
            )}
            <Button
              buttonStyle="btn--black"
              buttonSize="btn--small"
              onClick={handleEditButton}
            >
              {editing ? (
                <i
                  className="single-post-icon fa-solid fa-paper-plane"
                  style={{ color: "#7bae37", marginRight: "5px" }}
                />
              ) : (
                <i
                  className="single-post-icon fa-solid fa-pen-to-square"
                  style={{ color: "#F7DE3A", marginRight: "5px" }}
                />
              )}
              {editing ? "Uložit" : "Editovat"}
            </Button>
            <Button
              buttonStyle="btn--black"
              buttonSize="btn--small"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <i
                className="single-post-icon fa-solid fa-trash-can"
                style={{ color: "#ED4337", marginRight: "5px" }}
              ></i>
              Smazat
            </Button>
          </div>
        )}
      </h1>
      <div className="single-post-info">
        <span className="single-post-author">
          Autor:
          <Link
            to={`/?user=${post.username}`}
            className="link"
            style={{ marginLeft: "10px", color: "#0e1111" }}
          >
            <b>{post.username}</b>
          </Link>
        </span>
        <span className="single-post-date">{createdDate}</span>
      </div>
      <div className="single-post-body">
        {editing ? (
          <Editor
            apiKey={process.env.REACT_APP_TINY_KEY}
            className="write-input write-text"
            placeholder="Tell your story..."
            initialValue={post.text}
            disabled={isFetching}
            onEditorChange={(content) => {
              setEditText(content);
            }}
            init={{
              height: "60vw",
              width: "80vw",
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:'Roboto', sans-serif; font-size:14px }",
            }}
          />
        ) : (
          <p
            className="single-post-text"
            dangerouslySetInnerHTML={{ __html: post.text }}
          />
        )}
      </div>
    </div>
  );
}
