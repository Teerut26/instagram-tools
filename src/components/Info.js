import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { useNavigate } from "react-router-dom";
import numeral from "numeral";

import InfiniteScroll from "react-infinite-scroll-component";

const User = ({ user_data }) => {
  return (
    <>
      <div className="w-full flex  border-2 p-2 rounded-xl gap-3 sm:gap-4 ">
        <img
          width="100"
          height="100"
          className="rounded-full"
          src={`${process.env.REACT_APP_IMAGE_API_URL}${encodeURIComponent(
            user_data.graphql.user.profile_pic_url_hd
          )}`}
          alt=""
        />
        <div className="flex flex-col w-full mr-3">
          <div className="text-xl">{user_data.graphql.user.username}</div>
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 justify-between text-sm">
            <div>
              {numeral(
                user_data.graphql.user.edge_owner_to_timeline_media.count
              ).format("0,0")}{" "}
              โพสต์
            </div>
            <div>
              ผู้ติดตาม{" "}
              {numeral(user_data.graphql.user.edge_followed_by.count).format(
                "0 a"
              )}{" "}
              คน
            </div>
            <div>
              กำลังติดตาม{" "}
              {numeral(user_data.graphql.user.edge_follow.count).format("0,0")}{" "}
              คน
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Feed = ({ node }) => {
  return (
    <>
      <div className="w-full flex gap-3 sm:gap-4 ">
        {/* <img
          className="object-cover w-[12rem] h-[13rem]"
          src={`${process.env.REACT_APP_IMAGE_API_URL}${encodeURIComponent(
            node.display_url
          )}`}
          alt=""
        /> */}
        <img
          className="object-cover w-[12rem] h-[13rem]"
          src={`${process.env.REACT_APP_IMAGE_API_URL}${encodeURIComponent(
            node.thumbnail_src
          )}`}
          alt=""
        />
      </div>
    </>
  );
};

const Feeds = ({ user_feeds, user_data, end_cursor, dispatch, is_loading }) => {
  const [HasNextPage, setHasNextPage] = useState(true);

  const getMore = async () => {
    if (HasNextPage) dispatch({ type: "set_is_loading", playload: true });
    
    let { id } = user_data.graphql.user;
    let res = await fetch(
      `${process.env.REACT_APP_API_URL}/instagram/media?id=${id}&after=${end_cursor}`
    );
    let { data } = await res.json();

    dispatch({
      type: "set_end_cursor",
      playload:
        data.data.user.edge_owner_to_timeline_media.page_info.end_cursor,
    });
    setHasNextPage(
      data.data.user.edge_owner_to_timeline_media.page_info.has_next_page
    );
    dispatch({
      type: "set_user_feeds",
      playload: [
        ...user_feeds,
        ...data.data.user.edge_owner_to_timeline_media.edges,
      ],
    });
    dispatch({ type: "set_is_loading", playload: false });
  };

  return (
    <>
      <InfiniteScroll
        dataLength={user_feeds.length}
        next={() => getMore()}
        hasMore={HasNextPage}
        className="grid grid-cols-2 sm:grid-cols-3  gap-1 w-full md:w-[35rem] px-1"
      >
        {user_feeds.map((item, index) => (
          <Feed {...item} key={index} />
        ))}
      </InfiniteScroll>
      
      {is_loading ? (
        <div className="flex gap-1 mb-3">
          <div className="spinner-grow text-dark" role="status" />
          <div className="spinner-grow text-dark" role="status" />
          <div className="spinner-grow text-dark" role="status" />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

function Info({ user_data, user_feeds, end_cursor, dispatch, is_loading }) {
  let navigate = useNavigate();
  useEffect(() => {
    if (user_data === null) navigate("/");
  }, [user_data]);
  return (
    <div className="flex flex-col w-full items-center gap-3 px-2 sm:mt-[2rem] mt-[1rem]">
      <div className="w-full md:w-[35rem] bg-white flex flex-col items-center gap-3">
        {user_data ? (
          <User
            {...{
              user_data,
            }}
          />
        ) : (
          ""
        )}
      </div>
      <div className="w-full md:w-[35rem] bg-white flex flex-col items-center gap-3">
        {user_feeds ? (
          <Feeds
            {...{
              user_feeds,
              end_cursor,
              dispatch,
              user_data,
              is_loading,
            }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default connect((state) => {
  return state;
})(Info);
