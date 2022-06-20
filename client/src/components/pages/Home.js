import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../../App.css";
import Cards from "../Cards";
import HeroSection from "../HeroSection";
import Posts from "../Posts";
import Login from "./Login";
import Settings from "./Settings";
import Single from "./Single";
import Write from "./Write";

import axios from "axios";
import { API_URL } from "../../App";

function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const postsSection = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`${API_URL}/posts` + search);
      setPosts(response.data);
    };
    fetchPosts();
  }, [search]);

  const scrollToPosts = () => {
    window.scrollTo({
      top: postsSection.current.offsetTop - 40,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <HeroSection scrollToPosts={scrollToPosts} />
      <div ref={postsSection}>
        <Cards posts={posts} />
      </div>
    </div>
  );
}

export default Home;
