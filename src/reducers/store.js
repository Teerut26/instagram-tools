import { combineReducers } from "redux";
import { createStore } from "redux";

import { user_data } from "./user_data";
import { user_feeds } from "./user_feeds";
import { end_cursor } from "./end_cursor";
import { is_loading } from "./is_loading";


const reducer = combineReducers({
  user_data,
  end_cursor,
  user_feeds,
  is_loading,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store };
