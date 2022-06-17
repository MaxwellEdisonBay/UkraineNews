import React from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import JoLPlayer from "jol-player";
import ImageSlider from "./ImageSlider";
import Carousel from "nuka-carousel";
import "./CardItem.css";
function CardItem({ post, slides }) {
  const containerStyles = {
    width: "500px",
    height: "280px",
  };

  return (
    <li className="cards__item">
      <div className="cards__item__div">
        {/* <figure className="cards__item__pic-wrap" data-category={post.title}>
           <img className="cards__item__img" alt="Travel" src={""} /> 
          
        </figure> */}
        <div style={containerStyles}>
          <Carousel
            defaultControlsConfig={{
              pagingDotsStyle: {
                height: "15px",
                width: "15px",
              },
            }}
          >
            <JoLPlayer
              option={{
                videoSrc: "test.mp4",
                width: 500,
                height: 280,
                language: "en",
                isShowMultiple: false,
                isShowScreenshot: false,
                isShowSet: false,
                isShowWebFullScreen: false,
                isShowPicture: false,
              }}
            />

            {slides.map((slide, slideIndex) => (
              <div
                style={{
                  width: "500px",
                  height: "280px",
                  borderRadius: "10px",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(${slide.url})`,
                }}
              ></div>
            ))}
          </Carousel>
        </div>
        {/* <ImageSlider slides={slides} /> */}
        <Link className="cards__item__link" to={`/post/${post._id}`}>
          <div className="cards__item__info">
            <h5 className="cards__item__text">{post.desc}</h5>
          </div>
        </Link>
      </div>
    </li>
  );
}

// src="images/img-9.jpg"
// text="Explore the hidden waterfall deep inside the Amazon Jungle"
// label="Adventure"
// path="/services"

export default CardItem;
