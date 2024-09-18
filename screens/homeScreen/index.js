import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from 'react-native';
import { Button, Icon, Footer, FooterTab } from "native-base";
import { connect } from "react-redux";
import SearchScreen from "../searchScreen/index";
import HomeScreen from "./homescreen.js";
import ProfileScreen from "../profileScreen/profile";
import userProfileScreen from "../profileScreen/userProfile";
import { NavigationContainer } from '@react-navigation/native';

// Define styles
const styles = StyleSheet.create({
  tabz: {
    backgroundColor: 'red'
  }
});

// Create the Tab Navigator
const Tab = createBottomTabNavigator();

// Custom Tab Bar Component
function CustomTabBar({ state, navigation }) {
  return (
    <Footer>
      <FooterTab style={styles.tabz}>
        <Button
          vertical
          onPress={() => navigation.navigate("HomeScreen")}
          active={state.index === 0}
        >
          <Icon name="home" />
        </Button>

        <Button
          vertical
          onPress={() => navigation.navigate("SearchScreen")}
          active={state.index === 1}
        >
          <Icon name="search" />
        </Button>

        <Button
          vertical
          onPress={() => navigation.navigate("userProfileScreen")}
          active={state.index === 2}
        >
          <Icon name="add" />
        </Button>

        <Button
          vertical
          onPress={() => navigation.navigate("ProfileScreen")}
          active={state.index === 3}
        >
          <Icon name="person" />
        </Button>
      </FooterTab>
    </Footer>
  );
}

// Main Tab Navigator
function MainScreenNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }} // Hide the header if needed
      tabBar={(props) => <CustomTabBar {...props} />} // Pass custom tab bar
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="SearchScreen" component={SearchScreen} />
      <Tab.Screen name="userProfileScreen" component={userProfileScreen} />
      <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Export connected component with Redux
export default connect(store => ({
  tweets: store.tweets.tweets,
}))(function App() {
  return (
    <NavigationContainer>
      <MainScreenNavigator />
    </NavigationContainer>
  );
});
