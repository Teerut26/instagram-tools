import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home({ dispatch, user_data }) {
  const Username = useRef(null);

  let navigate = useNavigate();

  const getData = async () => {
    if (Username.current.value.length === 0) return;
    let res = await fetch(
      process.env.REACT_APP_API_URL +
        "/instagram/user?username=" +
        Username.current.value
    );
    let data = await res.json();
    dispatch({
      type: "set_end_cursor",
      playload:
        data.data.graphql.user.edge_owner_to_timeline_media.page_info
          .end_cursor,
    });
    dispatch({
      type: "set_user_data",
      playload: data.data,
    });
    dispatch({
      type: "set_user_feeds",
      playload: data.data.graphql.user.edge_owner_to_timeline_media.edges,
    });
  };

  useEffect(() => {
    if (!user_data) return;
    navigate("/info");
  }, [user_data]);

  return (
    <div className="flex flex-col h-screen w-full justify-center items-center">
      <div className="w-full md:w-96 p-3 bg-white flex flex-col items-center gap-3">
        <div className="w-full flex flex-col gap-1">
          <div className="text-lg">Username Instagram</div>
          <input
            ref={Username}
            type="text"
            className="form-control w-full rounded-0"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div
            onClick={() => getData()}
            className="btn btn-danger border-0 rounded-0"
          >
            Grab
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect((state) => {
  return state;
})(Home);
