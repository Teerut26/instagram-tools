import React, { useEffect } from "react";
import { connect } from "react-redux";

import { useNavigate } from "react-router-dom";
import numeral from "numeral";


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
        <img className="object-cover" src={`${process.env.REACT_APP_IMAGE_API_URL}${encodeURIComponent(
            node.display_url
          )}`} alt="" />
        
      </div>
    </>
  );
};

const Feeds = ({ user_data }) => {
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3  gap-1 w-full md:w-[35rem] px-1">
        {user_data.graphql.user.edge_owner_to_timeline_media.edges.map(
          (item, index) => (
            <Feed
              {...item}
              key={index}
            />
          )
        )}
      </div>
    </>
  );
};

function Info({ user_data }) {
  let navigate = useNavigate();
  useEffect(() => {
    if (user_data === null) navigate("/");
    // console.log(user_data.graphql.user.profile_pic_url_hd);
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
        {user_data ? (
          <Feeds
            {...{
              user_data,
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
