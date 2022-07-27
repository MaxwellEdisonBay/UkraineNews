import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "../../App.css";
import Cards from "../../components/cards/Cards";
import LandingSection from "../../components/landing/LandingSection";

import axios from "axios";
import { API_URL } from "../../App";

function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const { search } = useLocation();
  const postsSection = useRef(null);

  // Test comment
  window.addEventListener("popstate", function (event) {
    //Your code here
    this.window.location.reload();
  });
  const fetchPosts = async () => {
    const response = await axios.get(
      `${API_URL}/api/posts/?page=${currentPage}&source=author`
    );
    let newPosts = [...posts];
    newPosts = newPosts.concat(response.data);
    setPosts(newPosts);
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    // console.log(posts);
    // console.log(response.data);
  };

  useEffect(() => {
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
        <Cards
          posts={posts}
          fetchPosts={fetchPosts}
          signText={"Aktuální zprávy z Ukrajiny"}
        />
      </div>
    </div>
  );
}

export default Home;
