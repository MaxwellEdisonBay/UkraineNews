import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../App";

import "./Telegram.css";
import Cards from "../../components/cards/Cards";
import ImageButton from "../../components/image-button/ImageButton";

// 1718881294 - valkaua
// 1197363285 - u_now
// 1105313000 - uniannet

export const channelIdToName = (id) => {
  switch (id) {
    case "1197363285":
      return "Ukraine Now";
    case "1105313000":
      return "Unian Agency";
    case "1718881294":
      return "Válka UA";
    default:
      return "unknown";
  }
};

export default function Telegram() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [source, setSource] = useState("1197363285");

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
  const modalData1 = {
    whoOwns: "Rinat Akhmetov",
    whoOwnsUrl: "https://cs.wikipedia.org/wiki/Rinat_Achmetov",
    position: "🇺🇦🇺🇦",
    originalUrl: "https://t.me/u_now",
    subscribers: "1.5 M",
  };
  const modalData2 = {
    whoOwns: "Ihor Kolomojskyj",
    whoOwnsUrl: "https://en.wikipedia.org/wiki/Ihor_Kolomoyskyi",
    position: "🇺🇦🇺🇦🇺🇦",
    originalUrl: "https://t.me/uniannet",
    subscribers: "775 K",
  };
  return (
    <div>
      <div className="telegram-container">
        <div className="telegram-channel-container">
          <ImageButton
            text={"Ukraine Now"}
            modalData={modalData1}
            imagePath={"u_now.jpeg"}
            active={source === "1197363285"}
            handleClick={() => setSource("1197363285")}
          />
          <ImageButton
            text={"UNIAN"}
            modalData={modalData2}
            imagePath={"unian.jpg"}
            active={source === "1105313000"}
            handleClick={() => setSource("1105313000")}
          />
        </div>
        <Cards posts={posts} fetchPosts={fetchPosts} mode={"telegram"} />
      </div>
    </div>
  );
}
