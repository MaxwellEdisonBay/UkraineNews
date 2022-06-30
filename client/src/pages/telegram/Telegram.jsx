import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../App";

import "./Telegram.css";
import Cards from "../../components/cards/Cards";

export default function Telegram() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [source, setSource] = useState("u_now");

  const fetchPosts = async () => {
    const response = await axios.get(
      `${API_URL}/api/posts/?page=${currentPage}&source=telegram`
    );
    let newPosts = [...posts];
    newPosts = newPosts.concat(response.data);
    setPosts(newPosts);
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    console.log(posts);
    // console.log(response.data);
  };

  window.addEventListener("popstate", function (event) {
    //Your code here
    this.window.location.reload();
  });

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      <Cards posts={posts} fetchPosts={fetchPosts} />
    </div>
  );
}
