import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../App";

import "./Telegram.css";
import Cards from "../../components/cards/Cards";
import ImageButton from "../../components/image-button/ImageButton";

// 1718881294 - valkaua
const VALKA_UA_ID = "1718881294";
// 1197363285 - u_now
const U_NOW_ID = "1197363285";
// 1105313000 - uniannet
const UNIAN_ID = "1105313000";
// 1199360700 - truexanewsua
const TRUCHA_ID = "1199360700"

export const channelIdToName = (id) => {
  switch (id) {
    case U_NOW_ID:
      return "Ukraine Now";
    case UNIAN_ID:
      return "Unian Agency";
    case VALKA_UA_ID:
      return "Válka UA";
    case TRUCHA_ID:
      return "Trucha Ukrajina"
    default:
      return "unknown";
  }
};

export default function Telegram() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [source, setSource] = useState([]);
  const getQueryArgs = (src) => {
    return src.length === 0 ? "" : "&selectedChannels=" + src.join("-");
  };

  const handleChannelClick = async (id) => {
    let tempSource = [...source];
    if (source.includes(id)) {
      tempSource = tempSource.filter((item) => item !== id);
    } else {
      tempSource = tempSource.concat(id);
    }
    console.log("TEMP SOURCE");
    console.log(tempSource);

    setSource(tempSource);
    setCurrentPage(0);
    setPosts([]);
    // await fetchPosts();
  };

  const fetchPosts = async () => {
    const selectedChannelsQueryArg = getQueryArgs(source);

    console.log("fetching " + selectedChannelsQueryArg);
    const requestQuery = `${API_URL}/api/posts/?page=${currentPage}&source=telegram${selectedChannelsQueryArg}`;
    // console.log(requestQuery);
    const response = await axios.get(requestQuery);
    // console.log(response.data)
    let newPosts = [...posts];
    newPosts = newPosts.concat(response.data);
    setPosts(newPosts);
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    // console.log(posts);
    // console.log(response.data);
  };

  window.addEventListener("popstate", function (event) {
    //Your code here
    this.window.location.reload();
  });

  useEffect(() => {
    fetchPosts();
  }, [source]);
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
  const modalData3 = {
    whoOwns: "Nezávislý",
    whoOwnsUrl: null,
    position: "🇺🇦🇺🇦🇺🇦",
    originalUrl: "https://t.me/truexanewsua",
    subscribers: "2.4 M",
  };
  return (
    <div>
      <div className="telegram-container">
        <div className="telegram-channel-container">
          <ImageButton
            text={"Ukraine Now"}
            modalData={modalData1}
            imagePath={"u_now.jpeg"}
            active={source.includes(U_NOW_ID)}
            handleClick={() => handleChannelClick(U_NOW_ID)}
          />
          <ImageButton
            text={"UNIAN"}
            modalData={modalData2}
            imagePath={"unian.jpg"}
            active={source.includes(UNIAN_ID)}
            handleClick={() => handleChannelClick(UNIAN_ID)}
          />
          <ImageButton
            text={"Trucha"}
            modalData={modalData3}
            imagePath={"truha.jpg"}
            active={source.includes(TRUCHA_ID)}
            handleClick={() => handleChannelClick(TRUCHA_ID)}
          />
        </div>
        <Cards posts={posts} fetchPosts={fetchPosts} mode={"telegram"} />
      </div>
    </div>
  );
}
