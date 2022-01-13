import { combineReducers } from "redux";
import { createStore } from "redux";

import { user_data } from "./user_data";


const reducer = combineReducers({
  user_data
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store };
