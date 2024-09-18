import React, { Component } from "react";
import Constants from 'expo-constants';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableHighlight,
  Animated,
  Platform,
  Dimensions,
} from "react-native";
import {
  Container,
  Header,
  Body,
  Content,
  Left,
  Right,
  Title,
  Thumbnail,
  Col,
  Row,
  Grid,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Button,
  Spinner
} from "native-base";
// import ParallaxScrollView from "react-native-parallax-scroll-view";

import { connect } from "react-redux";
// import { fetchTweets } from "../actions/tweetsActions";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const styles = StyleSheet.create({
  header: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "column",
    backgroundColor: "white",
    color: "red"
  },
  avatarbg: {
    // marginTop: -95,
    alignItems: 'center',
    padding: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    zIndex: 12,
    // borderRadius: 180
  },
  avatar: {
    position: 'absolute',
    marginLeft: 'auto',
    marginTop: 0,
    width: 100,
    height: 100,
    borderRadius: 50,
    zIndex: 12
  },
  headerButton: {
    // alignSelf: "flex-end",
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 3,
    paddingTop: 3,
    marginRight: 8
  },
  nameText: {
    fontSize: 26,
    fontWeight: "500",
    marginLeft: 14
  },
  usernameText: {
    color: "#777",
    fontSize: 16,
    marginLeft: 14
  },
  bioText: {
    fontSize: 16,
    marginLeft: 14,
    marginTop: 10,
    maxHeight: 41
  },
  locationText: {
    fontSize: 16,
    marginLeft: 14,
    marginTop: 10,
    color: "#555"
  },
  topMargin: {
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    backgroundColor: "#2800d4",
    // zIndex: 10,
  },
  content: {
    padding: 10,
    backgroundColor: "white"
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    marginBottom: 30
  },
  tweet: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,    
    flexDirection: "column"
  },
  tweetText: {
    marginTop: 10,
    fontSize: 18,
    color: "#555"
  },
  tweetFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  badgeCount: {
    fontSize: 12,
    paddingLeft: 5
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center"
  },
  tvscreenMain: {
    width: "100%",
    height: '100%',
    backgroundColor: 'blue',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  tabStyle: {
    marginTop: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0,
    backgroundColor: "#f7f7f7"
  }
});
const styles1 = StyleSheet.create({
  containerStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    width: Dimensions.get("window").width,
    overflow: 'hidden',
    height: Dimensions.get("window").width / 1.7,
    paddingBottom: 10,
    backgroundColor: '#e8e8e8',
  },
  sliderContainerStyle: {
    borderRadius: Dimensions.get("window").width / 1.2,
    width: Dimensions.get("window").width * 2,
    height: Dimensions.get("window").width * 2,
    marginLeft: -(Dimensions.get("window").width / 2),
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
    zIndex: 7
  },
  slider: {
    height: Dimensions.get("window").width / 1.7,
    width: Dimensions.get("window").width,
    position: 'absolute',
    bottom: 0,
    marginLeft: Dimensions.get("window").width / 2,
    backgroundColor: '#2800d4',
    alignItems: 'center',
    zIndex: 8
  },
  buttonWrapper: {
    flexDirection: "row",
    backgroundColor: "#fff",
    width: Dimensions.get("window").width / 1.2,
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    zIndex: 9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  }
});

export class FollowingScreen extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.tweets;
    this.userDetails=this.props.navigation.state.params;
    console.log(this.userDetails);
    // this._goBack=this._goBack.bind(this);
  }
  componentWillMount() {
    this.props.dispatch({ type: "FETCH_TWEETS" });
  }
  _goBack() {
    console.log("Back button pressed");
    this.props.navigation.goBack();
  }

  _keyExtractor = (item, index) => item.id.toString();

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          style={styles.topMargin}
        >
          <Left>
            <Button
              transparent
              onPress={this._goBack.bind(this)}>
              <Icon name="arrow-back" style={{ color: "#FFF", fontSize: 30, opacity: 0.8 }} light />
            </Button>
          </Left>

          <Body>
            <Title style={{ color: "#fff", fontSize: 20, textAlign: 'left' }}>{this.userDetails.name}</Title>
          </Body>
          <Right>
            <Button transparent iconRight light>
              <Icon name="md-search" />
            </Button>
          </Right>
        </Header>
        <Tabs
          tabBarUnderlineStyle={{ borderBottomColor: 'red' }}
          tabContainerStyle={{ elevation: 2,borderBottomColor: 'red' }}
          tabBarActiveTextColor='blue'
        >
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: '#e8e8e8' }}
                tabStyle={{ color: 'red' }}
                activeTabStyle={{color:'blue'}}
                >
                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "rgba(31, 31, 31, 0.83)" }}
                  >
                    100
                  </Text>
                  <Text style={{ fontSize: 16, color: "#555", opacity: 0.7 }}>
                    Followers
                </Text>
                </View>
              </TabHeading>}
            style={styles.tabStyle}
          >
            <View>
              <View style={{ flexDirection: 'column',borderBottomWidth: StyleSheet.hairlineWidth, }}>
                <Text>
                  Invite
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                  <Icon name="logo-facebook" />
                  <View style={{ flexDirection: 'column' }}>
                    <Text>
                      Connect using Facebook
                    </Text>
                    <Text>
                      Find friends on SocentLoop
                    </Text>
                  </View>
                  <Icon name="md-arrow-dropright" />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                  <Icon name="contacts" />
                  <View style={{ flexDirection: 'column' }}>
                    <Text>
                      Connect using Contacts
                    </Text>
                    <Text>
                      Find friends on SocentLoop
                    </Text>
                  </View>
                  <Icon name="md-arrow-dropright" />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                  <Icon name="mail" />
                  <View style={{ flexDirection: 'column' }}>
                    <Text>
                      More invite options
                    </Text>
                    <Text>
                      Find friends on SocentLoop
                    </Text>
                  </View>
                  <Icon name="md-arrow-dropright" />
                </View>
              </View>
              <View style={{ backgroundColor: "#f7f7f7", marginTop: 0 }}>
                {this.props.fetchingTweets ? (
                  <View
                    contentContainerStyle={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Spinner color="#2800d4" />
                  </View>
                ) : (
                    <FlatList
                      data={this.props.tweets}
                      keyExtractor={this._keyExtractor}
                      renderItem={({ item }) => (
                        <View style={styles.tweet}>
                          <View style={{ flex: 1, flexDirection: "row",justifyContent:'space-between' }}>
                            <View style={{ flexDirection: "row",alignItems:'center'}}>
                            <Thumbnail square source={{ uri: item.user.avatar }} style={{ borderRadius: 10 }} />
                            <Text style={{marginLeft:10}}>
                              {item.user.name}
                            </Text>
                            </View>
                            
                            <Button
                              style={{ alignSelf: 'center', opacity:0.53,borderRadius:10.3,borderWidth:2.7, width:100,height:40.4,borderColor: '#1f1f1f',backgroundColor: "#f7f7f7", paddingTop:0,paddingBottom:0,paddingLeft:15,paddingRight:15,justifyContent:'center' }}
                              transparent
                              bordered
                            >
                              <Text style={{ color: '#1f1f1f',opacity:0.63 }}>
                                Following
                              </Text>
                            </Button>
                          </View>
                          {/* </TouchableHighlight> */}
                        </View>
                      )}
                    />
                  )}
              </View>
            </View>
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: 'blue' }}
            heading={
              <TabHeading style={{ backgroundColor: '#e8e8e8' }}>
                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "rgba(31, 31, 31, 0.83)" }}
                  >
                    200
                  </Text>
                  <Text style={{ fontSize: 16, color: "#555", opacity: 0.7 }}>
                    Following
                </Text>
                </View>
              </TabHeading>} style={styles.tabStyle}
          >

          </Tab>
          <Tab
            heading={
              <TabHeading style={{ backgroundColor: '#e8e8e8' }}>
                <View style={{ flexDirection: "column", alignItems: 'center' }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "rgba(31, 31, 31, 0.83)" }}
                  >
                    600
                  </Text>
                  <Text style={{ fontSize: 16, color: "#555", opacity: 0.7 }}>
                    Reviews
                </Text>
                </View>
              </TabHeading>}
            style={styles.tabStyle}
          >

          </Tab>
        </Tabs>
      </View>
    );
  }
}
export default connect(store => ({

  tweets: store.tweets.tweets,
  fetchingTweets: store.tweets.fetchingTweets,
  errorTweets: store.tweets.error,
}))(FollowingScreen);