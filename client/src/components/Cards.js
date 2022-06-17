import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards({ posts }) {
  const slides = [
    {
      url: "https://c4.wallpaperflare.com/wallpaper/611/154/459/widescreen-high-resolution-nature-hd-1920x1080-wallpaper-preview.jpg",
      title: "Beach1",
    },
    {
      url: "https://c4.wallpaperflare.com/wallpaper/388/898/571/hd-images-nature-pc-1920x1080-wallpaper-preview.jpg",
      title: "Beach2",
    },
    {
      url: "https://c4.wallpaperflare.com/wallpaper/314/778/449/1920x1080-px-los-angeles-anime-sailor-moon-hd-art-wallpaper-preview.jpg",
      title: "Beach3",
    },
    {
      url: "https://c4.wallpaperflare.com/wallpaper/636/592/951/beach-1920x1080-high-definition-wallpaper-preview.jpg",
      title: "Beach4",
    },
  ];
  return (
    <div className="cards">
      <h1>Check out these EPIC Destinations!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          {posts.map((p) => (
            <ul className="cards__items">
              <CardItem post={p} slides={slides} />
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
