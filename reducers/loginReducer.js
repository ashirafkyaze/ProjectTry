export default function reducer(
  state = {
    username: "",
    password: "",
    loginStatus: "uninitiated",
    user: {},
    user2:[],
    error:null,
    fetchingUserprofile:false
  },
  action
) {
  switch (action.type) {
    case "SET_USERNAME_STARTED": {
      console.log("In set username reducer");
      return { ...state, username: action.payload };
      
    }
    case "SET_PASSWORD_STARTED": {
      console.log("In set password reducer");
      return { ...state, password: action.payload };
      
    }
    case "DO_LOGIN_STARTED": {
      return { ...state, loginStatus: "ongoing" };
      
    }
    case "DO_LOGIN_SUCCESS": {
      return { ...state, loginStatus: "success", user: action.payload };
      
    }
    case "DO_LOGIN_FAILED": {
      return { ...state, loginStatus: "failed" };
    }
    case "FETCH_USER_PROFILE_STARTED": {
      return { ...state, fetchingUserprofile: true };
    }
    case "FETCH_USER_PROFILE_REJECTED": {
      // console.log(action.payload +' '+ 'user Details');
      return { ...state, fetchingUserprofile: false ,error:action.payload};
    }
    case "FETCH_USER_PROFILE_FULFILLED": { 
      console.log(action.payload+' '+ 'user Details');
      return { ...state, fetchingUserprofile: false ,user2:action.payload};
    }
    
    default: {
      return state;
    }
  }
}
