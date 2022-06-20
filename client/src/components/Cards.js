import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards({ posts }) {
  return (
    <div className="cards">
      <h1>Aktuální zprávy z Ukrajiny</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          {posts.map((p, index) => (
            <ul className="cards__items">
              <CardItem post={p} index={index} />
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
