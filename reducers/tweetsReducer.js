const _ = require("lodash");

export default function reducer(
  state = {
    tweets: [],
    userTweets: [],
    tweetReplies: [],
    userLists:[],
    listItems:[],
    userFollowers:[],
    fetchingItemDetails:false,
    fetchingTweets: false,
    fetchingUserlist:false,
    fetchingUserFollowers:false,
    fetchedUserList:false,
    fetchedTweets: false,
    fetchingTweetReplies: false,
    fetchedTweetReplies: false,
    fetchingUserTweets: false,
    fetchedUserTweets: false,
    error: null,
    tweetPosted: "uninitiated",
    newTweetModalOpen: false
  },
  action
) {
  switch (action.type) {
    case "FETCH_TWEETS_STARTED": {
      return { ...state, fetchingTweets: true };
      
    }
    case "FETCH_TWEETS_REJECTED": {
      return { ...state, fetchingTweets: false, error: action.payload };
      
    }
    case "FETCH_TWEETS_FULFILLED": {
      var sortedTweets = _.orderBy(action.payload, ["time"], ["desc"]);

      return {
        ...state,
        fetchedTweets: true,
        fetchingTweets: false,
        tweets: sortedTweets,
        error: null
      };
      
    }
    case "FETCH_USER_TWEETS_STARTED": {
      return { ...state, fetchingUserTweets: true };
      
    }
    case "FETCH_USER_TWEETS_REJECTED": {
      return { ...state, fetchingUserTweets: false, error: action.payload };
      
    }
    case "FETCH_USER_TWEETS_FULFILLED": {
      return {
        ...state,
        fetchedUserTweets: true,
        fetchingUserTweets: false,
        userTweets: action.payload,
        error: null
      };
      
    }
    case "FETCH_USER_LISTS_STARTED": {
      return { ...state, fetchingUserlist: true };
      
    }
    case "FETCH_USER_LISTS_REJECTED": {
      return { ...state, fetchingUserlist: false, error: action.payload };
      
    }
    case "FETCH_USER_LISTS_FULFILLED": {
      return {
        ...state,
        fetchedUserList: true,
        fetchingUserlist: false,
        userLists: action.payload,
        error: null
      };
      
    }
    case "POST_TWEET_STARTED": {
      return { ...state, tweetPosted: "ongoing" };
      
    }
    case "POST_TWEET_SUCCESS": {
      return { ...state, tweetPosted: "success" };
      
    }
    case "POST_TWEET_FAILED": {
      return { ...state, tweetPosted: "failed" };
      
    }
    case "NEW_TWEET_MODAL_OPEN": {
      return { ...state, newTweetModalOpen: true };
      
    }
    case "NEW_TWEET_MODAL_CLOSE": {
      return { ...state, newTweetModalOpen: false };
      
    }
    case "FETCH_LIST_ITEM_DETAIL":{
      return {... state, fetchingItemDetails:true};
    }
    case "FETCH_LIST_ITEM_DETAIL_FULFILLED":{
      return{
        ...state,
        fetchingItemDetails:false,
        listItems:action.payload,
        error:null
      }
    }
    case "FETCH_LIST_ITEM_DETAIL_REJECTED":{
      return { ...state,fetchingItemDetails:false,error:action.payload};
    }
    
    case "FETCH_TWEET_REPLIES_STARTED": {
      return { ...state, fetchingTweetReplies: true };
      
    }
    case "FETCH_TWEET_REPLIES_REJECTED": {
      return { ...state, fetchingTweetReplies: false, error: action.payload };
      
    }
    case "FETCH_TWEET_REPLIES_FULFILLED": {
      var sortedTweets = _.orderBy(action.payload, ["time"], ["desc"]);

      return {
        ...state,

        fetchedTweetReplies: true,
        fetchingTweetReplies: false,
        tweetReplies: sortedTweets,
        error: null
      };
      
    }
    default: {
      return state;
    }
  }
}
