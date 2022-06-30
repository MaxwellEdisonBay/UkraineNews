import React, { useRef } from "react";
import "./Cards.css";
import CardItem from "./CardItem";
import InfiniteScroll from "react-infinite-scroll-component";

function Cards({ posts, fetchPosts, signText, mode = "normal" }) {
  return (
    <div className="cards">
      {signText !== "" && <h1>{signText}</h1>}

      <div className="cards__container">
        <div className="cards__wrapper">
          <InfiniteScroll
            dataLength={posts.length} //This is important field to render the next data
            next={fetchPosts}
            hasMore={true}
            // loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            // // below props only if you need pull down functionality
            // refreshFunction={this.refresh}
            // pullDownToRefresh
            // pullDownToRefreshThreshold={50}
            // pullDownToRefreshContent={
            //   <h3 style={{ textAlign: "center" }}>
            //     &#8595; Pull down to refresh
            //   </h3>
            // }
            // releaseToRefreshContent={
            //   <h3 style={{ textAlign: "center" }}>
            //     &#8593; Release to refresh
            //   </h3>
            // }
          >
            {posts.map((p, index) => (
              <ul className="cards__items" key={p._id}>
                <CardItem post={p} index={index} mode={mode} />
              </ul>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default Cards;
