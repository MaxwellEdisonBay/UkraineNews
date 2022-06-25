import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { API_URL } from "../../App";
import { Button } from "../../components/main_button/Button";
import useWindowSize from "../../hooks/useWidowSize";

import "./SinglePost.css";
// const Carousel = require("react-responsive-carousel").Carousel;

export default function SinglePost() {
  const location = useLocation();
  const size = useWindowSize();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [imageUrl, setImageUrl] = useState({});
  const coeff = size.width > 960 ? 0.025 : 0.055;
  console.log(size.width);
  console.log(size.width * 16 * coeff);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${API_URL}/api/posts/` + path);
      setPost(res.data);
    };
    getPost();
  }, [path]);

  const createdDate = new Date(post.createdAt).toLocaleString("en-GB", {
    hour12: false,
  });

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
      <h1 className="single-post-top">
        {/* {post.title} */}
        <div className="single-post-title">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Libero
          nesciunt inventore et nostrum voluptatem sapiente esse ratione.
          Necessitatibus error impedit debitis quaerat sint hic, consequuntur
          vero voluptatem nihil ab suscipit.
        </div>

        <div className="single-post-edit">
          <Button buttonStyle="btn--black" buttonSize="btn--small">
            <i
              className="single-post-icon fa-solid fa-pen-to-square"
              style={{ color: "#7bae37", marginRight: "5px" }}
            ></i>
            Editovat
          </Button>
          <Button buttonStyle="btn--black" buttonSize="btn--small">
            <i
              className="single-post-icon fa-solid fa-trash-can"
              style={{ color: "#ED4337", marginRight: "5px" }}
            ></i>
            Smazat
          </Button>
        </div>
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
        <p
          className="single-post-text"
          dangerouslySetInnerHTML={{ __html: post.text }}
        />
      </div>
    </div>
  );
}
