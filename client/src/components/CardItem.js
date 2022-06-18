import React from "react";
import { Link } from "react-router-dom";
import JoLPlayer from "jol-player";
import Carousel from "nuka-carousel";
import "./CardItem.css";
import useWindowSize from "../hooks/useWidowSize";

function CardItem({ post, slides }) {
  const size = useWindowSize();
  const coeff = size.width > 960 ? 0.025 : 0.045;
  const containerStyles = {
    width: `${size.width * 16 * coeff}px`,
    height: `${size.width * 9 * coeff}px`,
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
                width: size.width * 16 * coeff,
                height: size.width * 9 * coeff,
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
                  width: `${size.width * 16 * coeff}px`,
                  height: `${size.width * 9 * coeff}px`,
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
