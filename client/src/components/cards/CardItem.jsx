import React, { useState } from "react";
import { Link } from "react-router-dom";
import JoLPlayer from "jol-player";
import Carousel from "nuka-carousel";
import "./CardItem.css";
import useWindowSize from "../../hooks/useWidowSize";
import ShowMoreText from "react-show-more-text";
import { sanitize } from "../../utils/htmlParser";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

function CardItem({ post }) {
  const size = useWindowSize();
  const coeff = size.width > 960 ? 0.025 : 0.045;
  const containerStyles = {
    width: `${size.width * 16 * coeff}px`,
    height: `${size.width * 9 * coeff}px`,
  };
  const isLong = [...post.text].length > 100;

  function isVideo(type) {
    return type === "video";
  }

  const postText = sanitize(post.text);
  // const postText = post.text;
  // const postText = post.text.replace(/<(\/?|\!?)(?:img|i|b|a)>/g, "");

  const [boxUrl, setBoxUrl] = useState(null);

  // console.log(postText);
  return (
    <li className="cards__item">
      {boxUrl && (
        <Lightbox mainSrc={boxUrl} onCloseRequest={() => setBoxUrl(null)} />
      )}

      <div className="cards__item__div">
        {post.media.length !== 0 && (
          <div style={containerStyles}>
            <Carousel
              wrapAround={true}
              dragThreshold={0.1}
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
                    key={m.url}
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
                    key={m.url}
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
                      onClick={() => setBoxUrl(m.url)}
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
            </Carousel>
          </div>
        )}
        {/* <ImageSlider slides={slides} /> */}
        <div
          className="cards__item__title_container"
          style={{ width: `${size.width * 16 * coeff}px` }}
        >
          {/* <Link className="cards__item__link" to={`/post/${post._id}`}> */}
          <h5
            className="cards__item__title"
            onClick={() => {
              window.open(`/post/${post._id}`, "_blank");
            }}
          >
            {post.title}
          </h5>
          {/* </Link> */}
        </div>
        <div
          className="cards__item__info_container"
          style={{ width: `${size.width * 16 * coeff}px` }}
        >
          <p>{post.username}</p>
          <p>
            {new Date(post.updatedAt).toLocaleString("en-GB", {
              hour12: false,
            })}
          </p>
        </div>
        {/* <div
          className="cards__item__text"
          dangerouslySetInnerHTML={{ __html: post.text }}
        ></div> */}

        <div
          className="cards__item__text__container"
          style={{
            width: `${size.width * 16 * coeff}px`,
          }}
        >
          {isLong ? (
            <ShowMoreText
              /* Default options */
              className="show-more-text"
              lines={3}
              more="Zobrazit více"
              less="Skrýt"
              // className="content-css"
              // anchorClass="my-anchor-css-class"
              expanded={!isLong}
              truncatedEndingComponent={"... "}
            >
              <p
                className="cards__item__text"
                dangerouslySetInnerHTML={{ __html: postText }}
              />
            </ShowMoreText>
          ) : (
            <p
              className="cards__item__text"
              dangerouslySetInnerHTML={{ __html: postText }}
            />
          )}
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
