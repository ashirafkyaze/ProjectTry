import { put, takeEvery, all, call } from "redux-saga/effects";
import axios from "axios";
import { faker } from "@faker-js/faker";


const fetchTweets = function* fetchTweets() {
  console.log("into fetch tweets saga");
  yield put({ type: "FETCH_TWEETS_STARTED" });
  try {
    const tweets = yield call(fetchTweetsData);
    yield put({ type: "FETCH_TWEETS_FULFILLED", payload: tweets });
  } catch (error) {
    yield put({ type: "FETCH_TWEETS_REJECTED", payload: error });
  }
};

const watchFetchTweets = function* watchFetchTweets() {
  yield takeEvery("FETCH_TWEETS", fetchTweets);
};

//user lists
const fetchUserLists = function* fetchUserLists(){
  yield put({ type: "FETCH_USER_LISTS_STARTED" });
  try {
    const userLists = yield call(fetchUserListsData);
    yield put({ type: "FETCH_USER_LISTS_FULFILLED", payload: userLists });
  } catch (error) {
    yield put({ type: "FETCH_USER_LISTS_REJECTED", payload: error });
  }
}

const fetchUserListsData = ()=> {
  return axios.get("http://10.0.2.2:3001/userLists").then(response => {
    console.log(response);
    return response.data;
  });
}
const watchFetchUserLists = function* watchFetchUserLists() {
  yield takeEvery("FETCH_USER_LISTS", fetchUserLists);
};

//user list item Detail
const fetchUserListItemDetail = function* fetchUserListItemDetail(){
  yield put({ type: "FETCH_LIST_ITEM_DETAIL" });
  try {
    const userLists = yield call(fetchUserListItemDetailData);
    yield put({ type: "FETCH_LIST_ITEM_DETAIL_FULFILLED", payload: userLists });
  } catch (error) {
    yield put({ type: "FETCH_LIST_ITEM_DETAIL_REJECTED", payload: error });
  }
}

const fetchUserListItemDetailData = ()=> {
  return axios.get("http://10.0.2.2:3001/userListItemDetail").then(response => {
    console.log(response);
    return response.data;
  });
}
const watchFetchUserListItemDetail = function* watchFetchUserListItemDetail() {
  yield takeEvery("FETCH_ITEM_DETAIL", fetchUserListItemDetail);
};

//userProfile
const fetchUserProfile = function* fetchUserProfile(){
  yield put({ type: "FETCH_USER_PROFILE_STARTED" });
  try {
    const userProfile = yield call(attemptLogin);
    yield put({ type: "FETCH_USER_PROFILE_FULFILLED", payload: userProfile });
  } catch (error) {
    yield put({ type: "FETCH_USER_PROFILE_REJECTED", payload: error });
  }
}

const watchFetchUserProfile = function* watchFetchUserProfile() {
  yield takeEvery("FETCH_USER_PROFILE", fetchUserProfile);
};
//userPosts
const fetchUserTweets = function* fetchUserTweets() {
  //temporary implementation. Take username/userID and fetch tweets accordingly
  yield put({ type: "FETCH_USER_TWEETS_STARTED" });
  try {
    const tweets = yield call(fetchUserTweetsData);
    yield put({ type: "FETCH_USER_TWEETS_FULFILLED", payload: tweets });
  } catch (error) {
    yield put({ type: "FETCH_USER_TWEETS_REJECTED", payload: error });
  }
};

const watchFetchUserTweets = function* watchFetchUserTweets() {
  yield takeEvery("FETCH_USER_TWEETS", fetchUserTweets);
};

const setUsername = function* setUsername(action) {
  yield put({ type: "SET_USERNAME_STARTED", payload: action.payload });
};

const watchSetUsername = function* watchSetUsername() {
  yield takeEvery("SET_USERNAME", setUsername);
};

const setPassword = function* setPassword(action) {
  yield put({ type: "SET_PASSWORD_STARTED", payload: action.payload });
};

const watchSetPassword = function* watchSetPassword() {
  yield takeEvery("SET_PASSWORD", setPassword);
};

const watchLogin = function* watchLogin() {
  yield takeEvery("DO_LOGIN", function*(action) {
    yield put({ type: "DO_LOGIN_STARTED" });
    try {
      const loginData = yield call(attemptLogin);
      if (
        loginData.username === action.payload.username &&
        loginData.password === action.payload.password
      )
        yield put({ type: "DO_LOGIN_SUCCESS", payload: loginData });
      else yield put({ type: "DO_LOGIN_FAILED" });
    } catch (error) {
      yield put({ type: "DO_LOGIN_FAILED" });
    }
  });
};

const watchPostTweet = function* watchPostTweet() {
  yield takeEvery("POST_TWEET", function*(action) {
    if (action.payload.tweetContent) {
      yield put({ type: "POST_TWEET_STARTED" });
      try {
        yield call(postTweet.bind(this, action.payload));
        yield put({ type: "POST_TWEET_SUCCESS" });
        yield put({ type: "FETCH_TWEETS" });
      } catch (error) {
        yield put({ type: "POST_TWEET_FAILED" });
      }
    } else {
      yield put({ type: "POST_TWEET_FAILED" });
    }
  });
};

const watchFetchTweetReplies = function* watchFetchTweetReplies() {
  yield takeEvery("FETCH_TWEET_REPLIES", fetchTweetReplies);
};

const fetchTweetReplies = function* fetchTweetReplies() {
  yield put({ type: "FETCH_TWEET_REPLIES_STARTED" });
  try {
    const tweetReplies = yield call(fetchTweetRepliesData);
    yield put({ type: "FETCH_TWEET_REPLIES_FULFILLED", payload: tweetReplies });
  } catch (error) {
    yield put({ type: "FETCH_TWEET_REPLIES_REJECTED", payload: error });
  }
};

// bookmarks
const watchFetchBookmarks = function* watchFetchBookmarks(){
  yield takeEvery('FETCH_BOOKMARKS', fetchbookmarks);
};
const fetchbookmarks = function* fetchbookmarks(){
  yield put({type: "FETCH_BOOKMARKS_STARTED"});
  try {
    const bookmarks = yield call (fetchbookmarkslist);
    yield put({ type: "FETCH_BOOKMARKS_FULLFILLED",payload:bookmarks});
  }catch (error){
    yield put({type:"FETCH_BOOKMARKS_REJECTED",payload:error});
  }
};

const fetchbookmarkslist = () => {
  return axios.get("http://10.0.2.2:3001/bookmarks").then(response => {
    console.log(response);
    return response.data;
  });
};
// ....bookmarks
const rootSaga = function* rootSaga() {
  console.log("into root saga");
  yield all([
    watchFetchTweets(),
    watchFetchUserTweets(),
    watchFetchUserLists(),
    watchSetUsername(),
    watchSetPassword(),
    watchLogin(),
    watchFetchBookmarks(),
    watchPostTweet(),
    watchFetchTweetReplies(),
    watchFetchUserProfile(),
    watchFetchUserListItemDetail()
  ]);
};

export default rootSaga;

const fetchTweetsData = () => {
  return axios.get("http://10.0.2.2:3001/tweets").then(response => {
    console.log(response);
    return response.data;
  });
};

const fetchTweetRepliesData = () => {
  return axios.get("http://10.0.2.2:3001/tweetReplies").then(response => {
    console.log(response);
    return response.data;
  });
};

const fetchUserTweetsData = () => {
  return axios.get("http://10.0.2.2:3001/userTweets").then(response => {
    console.log(response);
    return response.data;
  });
};

const attemptLogin = () => {
  return axios.get("http://10.0.2.2:3001/login").then(response => {
    return response.data;
  });
};

const postTweet = payload => {
  return axios.post("http://10.0.2.2:3001/tweets", {
    id:faker.random.number(100000),
    time: new Date().toISOString(),
    user: payload.user,
    tweetContent: payload.tweetContent,
    likes: 0,
    retweets: 0,
    replies: 0
  });
};

// const helloSaga = function* helloSaga() {
//   console.log("Hello Sagas!");
// };

// export default helloSaga;
