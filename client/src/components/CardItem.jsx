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

  function isVideo(type) {
    return type === "video";
  }

  return (
    <li className="cards__item">
      <div className="cards__item__div">
        {/* <figure className="cards__item__pic-wrap" data-category={post.title}>
           <img className="cards__item__img" alt="Travel" src={""} /> 
          
        </figure> */}
        {post.media.length !== 0 && (
          <div style={containerStyles}>
            <Carousel
              defaultControlsConfig={{
                pagingDotsStyle: {
                  height: "15px",
                  width: "15px",
                },
              }}
            >
              {post.media.map((m) =>
                isVideo(m.type) ? (
                  <JoLPlayer
                    option={{
                      videoSrc: m.url,
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
                ) : (
                  <div
                    style={{
                      width: `${size.width * 16 * coeff}px`,
                      height: `${size.width * 9 * coeff}px`,
                      borderRadius: "10px",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      // backgroundImage: `url(${url})`,
                    }}
                  >
                    <img
                      src={`${m.url}`}
                      style={{
                        // FIXME: scale-down better image solution
                        objectFit: "cover",
                        width: `${size.width * 16 * coeff}px`,
                        height: `${size.width * 9 * coeff}px`,
                      }}
                    ></img>
                  </div>
                )
              )}

              {/* {slides.map((slide, slideIndex) => (
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
            ))} */}
            </Carousel>
          </div>
        )}
        {/* <ImageSlider slides={slides} /> */}
        <div
          className="cards__item__title_container"
          style={{ width: `${size.width * 16 * coeff}px` }}
        >
          <Link className="cards__item__link" to={`/post/${post._id}`}>
            <h5 className="cards__item__title">{post.title}</h5>
          </Link>
        </div>
        <div
          className="cards__item__info_container"
          style={{ width: `${size.width * 16 * coeff}px` }}
        >
          <p>{post.username}</p>
          <p>{new Date(post.updatedAt).toLocaleString()}</p>
        </div>
        {/* <div
          className="cards__item__text"
          dangerouslySetInnerHTML={{ __html: post.text }}
        ></div> */}
        <div
          className="cards__item__text__container"
          style={{ width: `${size.width * 16 * coeff}px` }}
        >
          <p
            className="cards__item__text"
            dangerouslySetInnerHTML={{ __html: post.text }}
          >
            {/* {post.text.replace(/<\/?[^>]+(>|$)/g, "")} */}
          </p>
        </div>
      </div>
    </li>
  );
}

// src="images/img-9.jpg"
// text="Explore the hidden waterfall deep inside the Amazon Jungle"
// label="Adventure"
// path="/services"

export default CardItem;
