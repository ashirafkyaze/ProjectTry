/**starting page */
import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';
import LoginScreen from "./screens/login";
import HomeScreen from "./screens/homeScreen/index.js";
import ProfileScreen from "./screens/profile";
import PostDetailsScreen from "./screens/homeScreen/listDetails";
import listItemDetail from "./screens/homeScreen/listItemDetail";
import SideBar from "./screens/sideBar/sidebar";
import { Provider } from "react-redux";
// import Navigator from './screens/navigation/appNavigator'
import store from "./store";
import "regenerator-runtime/runtime";
import  FollowingScreen from "./screens/followingScreen/followerScreen";
import userProfile from "./screens/profileScreen/userProfile";
import settingScreen from "./screens/settingScreen/settings";
import searchScreen from "./screens/searchScreen/index";
import bookmarkScreen from "./screens/bookmarkScreen/bookmarkScreen";
import listScreen from './screens/listScreen/listScreen';
console.disableYellowBox = true;
const AppNavigator = createDrawerNavigator(
  {
    Login:{screen:LoginScreen},
    Home: { screen: HomeScreen },
    Profile:{screen:ProfileScreen},
    PostDetails:{screen:PostDetailsScreen},
    ItemDetail:{screen:listItemDetail},
    Following:{screen:FollowingScreen},
    userProfile:{screen:userProfile},
    Settings:{screen:settingScreen},
    Bookmark:{screen:bookmarkScreen},
    Search:{screen:searchScreen},
    CreateList:{screen:listScreen}
  },
  {
    contentComponent:  props => <SideBar {...props} />,
    initialRouteName: "Search",
    headerMode: "none"
  }
);

const AppContainer=createAppContainer(AppNavigator);
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }

  componentWillMount() {
    this.loadFonts();
  }

  async loadFonts() {
  
    this.setState({ isLoading: false });
  }

  render() {
    if (this.state.isLoading) {
      return <AppLoading />;
    } else
      return (
        <Provider store={store}>
           <AppContainer />
        </Provider>     
      );
  }
}

