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
    position:'absolute',
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
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
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
    backgroundColor:'#2800d4',
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

// connect(store => {
//   return {
//     userTweets: store.tweets.userTweets,
//     fetchingUserTweets: store.tweets.fetchingUserTweets,
//     fetchedUserTweets: store.tweets.fetchedUserTweets,
//     errorTweets: store.tweets.error,
//     username: store.login.username
//   };
// })
export class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.navigation.state.params;
    console.log(this.user.name);
    this.state = { scrollY: new Animated.Value(0) };
    // this._goBack=this._goBack.bind(this);
  }

  componentWillMount() {
    this.props.dispatch({ type: "FETCH_USER_TWEETS" });
  }
  // componentWillUpdate(){
  //   console.log(this.user.name);
  //   console.log(this.props.navigation.state.params.name);
  //   if(this.props.navigation.state.params.name!==this.user.name){
  //     this.props.dispatch({type: "FETCH_USER_TWEETS"});
  //   }
  // }
  _goBack() {
    console.log("Back button pressed");
    this.props.navigation.goBack();
  }

  _keyExtractor = (item, index) => item.id.toString();

  render() {
    var headMov = this.state.scrollY.interpolate({
      inputRange: [0, 390, 391],
      outputRange: [0, -390, -390]
    });
    var coverMov = this.state.scrollY.interpolate({
      inputRange: [0, 94, 94],
      outputRange: [0, -94, -94]
    });
    var avatarMov = this.state.scrollY.interpolate({
      inputRange: [0, 150, 151],
      outputRange: [0, -150, -150]
    });
    var avatarOp = this.state.scrollY.interpolate({
      inputRange: [0, 94, 95],
      outputRange: [1, 0, 0]
    });
    var headerOp = this.state.scrollY.interpolate({
      inputRange: [95, 180, 181],
      outputRange: [0, 0.75, 0.75]
    });
    var headerContentOp = this.state.scrollY.interpolate({
      inputRange: [0, 180, 210],
      outputRange: [0, 0, 1]
    });

    return (
      <View style={{ flex: 1 }}>
        <Header 
        style={styles.topMargin}
        >
          <Left>
            <Button
              transparent
              onPress={this._goBack.bind(this)}>
              <Icon name="ios-arrow-back" style={{ color: "#FFF", fontSize: 30, opacity: 0.8 }} light />
            </Button>
          </Left>

          <Body>
            <Title style={{ color: "#fff", fontSize: 20, textAlign: 'left' }}>{}</Title>
          </Body>
          <Right>
          <Button transparent iconRight light>
              <Icon name="md-more" />
            </Button>
          </Right>
        </Header>

        <View style={styles1.containerStyle} >
          <View style={styles1.sliderContainerStyle} >
            <View style={styles1.slider}>
            <Animated.View
          style={{
            zIndex: 4,
            position: "absolute",
            top: 0,
            alignItems:'center',
            opacity: avatarOp,
            transform: [{ translateY: avatarMov }]
          }}
        >
          <Thumbnail
            large
            source={{
              uri: "https://data.humdata.org/crisis-tiles/12/2485/1645.png"
            }}
            style={styles.avatarbg}
          />
          <Thumbnail
            large
            source={{ uri: this.user.avatar }}
            style={styles.avatar}
          />
           <Text style={{ fontSize: 18, color: "white" }}>
              {this.user.name}
           </Text>
           <Text style={{ fontSize: 16, color: "#ccc",opacity:0.6 }}>
           <Icon name="ios-pin" style={{fontSize: 17, color: "#ccc",opacity:0.6}}/> {this.user.location}
           </Text>
        </Animated.View>

            </View>

          </View>
          <View style={styles1.buttonWrapper}>
            <View style={{ flexDirection: "column", alignItems: 'center' }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "rgba(31, 31, 31, 0.83)" }}
              >
                {this.user.followers}
              </Text>
              <Text style={{ fontSize: 16, color: "#555", opacity: 0.7 }}>
                Followers
                </Text>
            </View>
            <View style={{ flexDirection: "column", alignItems: 'center' }}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "rgba(31, 31, 31, 0.83)" }}
              >
                {this.user.following}
              </Text>
              <Text style={{ fontSize: 16, color: "#555", opacity: 0.7 }}>
                Following
                </Text>
            </View>

            <View style={{ flexDirection: "column", alignItems: 'center' }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "rgba(31, 31, 31, 0.83)" }}
              >
                {this.user.followers}
              </Text>
              <Text style={{ fontSize: 16, color: "#555", opacity: 0.7 }}>
                Reviews
                </Text>
            </View>
          </View>
        </View>
        <Tabs
          tabBarUnderlineStyle={{ opacity: 0 }}
          tabContainerStyle={{elevation:0}}
          tabBarActiveTextColor='blue'
        >
          <Tab
            heading={<TabHeading style={{ backgroundColor: '#e8e8e8' }} tabStyle={{color:'red'}}><Text style={{ fontSize: 20 }}>Posts</Text></TabHeading>} style={styles.tabStyle}
          >
            <View>
              <View style={{ backgroundColor: "white", marginTop: 0 }}>
                {this.props.fetchingUserTweets ? (
                  <View
                    contentContainerStyle={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Spinner color="blue" />
                  </View>
                ) : (
                    <FlatList
                      data={this.props.userTweets}
                      keyExtractor={this._keyExtractor}
                      renderItem={({ item }) => (
                        <View style={styles.tweet}>
                          <View style={{ flex: 1, flexDirection: "row" }}>
                            <Thumbnail square source={{ uri: this.user.avatar }} style={{borderRadius:10}} />
                            <View
                              style={{
                                flexDirection: "column",
                                justifyContent: "flex-start"
                              }}
                            >
                              <Text
                                style={{
                                  paddingLeft: 15,
                                  fontWeight: "bold",
                                  fontSize: 20
                                }}
                              >
                                {this.user.name}
                              </Text>
                            </View>
                          </View>
                          {/* </TouchableHighlight> */}
                          <Text style={styles.tweetText}>{item.tweetContent}</Text>
                          <View style={styles.tweetFooter}>
                            <View style={styles.footerIcons}>
                              <Icon name="text" style={{opacity:0.7}} />
                              <Text style={styles.badgeCount}>{item.replies}</Text>
                            </View>
                            <View style={styles.footerIcons}>
                              <Icon name="heart" style={{color:'#ff1843'}}/>
                              <Text style={styles.badgeCount}>{item.likes}</Text>
                            </View>
                          </View>
                        </View>
                      )}
                    />
                  )}
              </View>
            </View>
          </Tab>
          <Tab
            activeTabStyle={{ backgroundColor: 'blue' }}
            heading={<TabHeading style={{ backgroundColor: '#e8e8e8' }}><Text style={{ fontSize: 18 }}>Lists</Text></TabHeading>} style={styles.tabStyle}
          >

          </Tab>
          <Tab
            heading={<TabHeading style={{ backgroundColor: '#e8e8e8' }}><Text style={{ fontSize: 18 }}>Likes</Text></TabHeading>} style={styles.tabStyle}
          >

          </Tab>
        </Tabs>
      </View>
    );
  }
}
export default connect(store => ({

  userTweets: store.tweets.userTweets,
  fetchingUserTweets: store.tweets.fetchingUserTweets,
  fetchedUserTweets: store.tweets.fetchedUserTweets,
  errorTweets: store.tweets.error,
  username: store.login.username

}))(ProfileScreen);