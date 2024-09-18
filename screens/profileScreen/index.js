import React, { Component } from "react";
import LucyChat from "./chat.js";

import { createBottomTabNavigator } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";
import { connect } from "react-redux";

const MainScreenNavigator = createBottomTabNavigator(
  {
    LucyChat: { screen: LucyChat },
    
  },
  {
    tabBarPosition: "bottom",
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              // active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("LucyChat")}>
              <Icon name="bowtie" />
              <Text>Lucy</Text>
            </Button>
            {/* <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("JadeChat")}>
              <Icon name="briefcase" />
              <Text>Nine</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("NineChat")}>
              <Icon name="headset" />
              <Text>Jade</Text>
            </Button> */}
          </FooterTab>
        </Footer>
      );
    }
  }
);
export default connect(store=>({
  tweets: store.tweets.tweets,
}))(MainScreenNavigator);