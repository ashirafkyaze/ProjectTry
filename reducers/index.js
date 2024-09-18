import { combineReducers } from "redux";

import tweets from "./tweetsReducer";
import login from "./loginReducer";
import bookmarks from "./bookmarksReducer";
import modal from "./modalReducer";
export default combineReducers({
  tweets,
  login,
  bookmarks,
  modal
});
