import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import "./SinglePost.css";
// const Carousel = require("react-responsive-carousel").Carousel;

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
    };
    getPost();
  }, [path]);
  return (
    <div className="single-post">
      <div className="single-post-wrapper">
        {/* <Carousel showArrows={true}>
          {post.photos &&
            post.photos.map((p) => (
              <img src={p} alt="" className="single-post-image" />
            ))}
        </Carousel> */}
      </div>
      <h1 className="single-post-title">
        {post.title}
        <div className="single-post-edit">
          <i className="single-post-icon fa-solid fa-pen-to-square"></i>
          <i className="single-post-icon fa-solid fa-pen-to-square"></i>
        </div>
      </h1>
      <div className="single-post-info">
        <span className="single-post-author">
          Author:
          <Link to={`/?user=${post.username}`} className="link">
            <b>{post.username}</b>
          </Link>
        </span>
        <span className="single-post-date">
          {new Date(post.createdAt).toDateString}
        </span>
      </div>
      <p className="single-post-desc">{post.desc}</p>
    </div>
  );
}
