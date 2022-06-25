import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../../App.css";
import Cards from "../../components/cards/Cards";
import LandingSection from "../../components/landing/LandingSection";

import axios from "axios";
import { API_URL } from "../../App";

function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const postsSection = useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(`${API_URL}/api/posts` + search, {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
      });
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
      <LandingSection scrollToPosts={scrollToPosts} />
      <div ref={postsSection}>
        <Cards posts={posts} />
      </div>
    </div>
  );
}

export default Home;
