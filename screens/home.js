import React, { Component } from "react";
// import * as Expo from "expo";
import Constants from 'expo-constants';
import Modal from "react-native-modal";
import { Dimensions } from "react-native";
// import Dimensions from "Dimensions";
import moment from 'moment';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ImageBackground,
  TouchableHighlight,
  Platform
} from "react-native";
import {
  Container,
  Header,
  Body,
  Content,
  Left,
  Title,
  Thumbnail,
  Col,
  Row,
  Grid,
  Icon,
  Spinner,
  Fab,
  Button,
  Footer,
  FooterTab,
  Input,
  Right
} from "native-base";
import { connect } from "react-redux";
// import bglist from '../assets/bgImg/listbg.png';
import { DrawerActions } from "react-navigation";
// import { fetchTweets } from "../actions/tweetsActions";
// import ScrollableTabView, {
//   ScrollableTabBar
// } from "react-native-scrollable-tab-view";

const styles = StyleSheet.create({
  topMargin: {
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    backgroundColor: "#F7F7F7",
    zIndex: -1
  },
  content: {
    padding: 10,
    backgroundColor: "#F7F7F7"
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    marginBottom: 30
  },
  tweet: {
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 20,
    zIndex:52,
    backgroundColor: "#ffffff",
    // borderBottomColor: "#bbb",
    // borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "column",
    shadowColor: "#0f000000",
    shadowOffset: { width: 1, height: 0.6 },
    shadowOpacity: 1,
    shadowRadius: 10,
    marginBottom: 20
  },
  tweetText: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: "bold",
    color: "#555",
    paddingTop:10,
    paddingBottom:10,
  },
  tweetFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 0
  },
  badgeCount: {
    fontSize: 12,
    paddingLeft: 5
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center"
  },
  modalFooter: {
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 54,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 5
  },
  modal: {
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    zIndex: 4,
    elevation: 4,
    height: Dimensions.get("window").height - Constants.statusBarHeight,
    marginTop: Constants.statusBarHeight / 2
  },
  headerButtons: {
    width: 60.7,
    height: 60.7,
    borderRadius: 13.3,
    backgroundColor: "#ffffff",
    elevation: 3,
    // justifyContent:"space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  headerButtonsViews: {
    flexDirection: "column",
    alignItems: "center",
    // marginRight:"auto"

  },

});

// connect(store => {
//   return {
//     tweets: store.tweets.tweets,
//     fetchingTweets: store.tweets.fetchingTweets,
//     fetchedTweets: store.tweets.fetchedTweets,
//     errorTweets: store.tweets.error,
//     user: store.login.user,
//     tweetPosted: store.tweets.tweetPosted,
//     newTweetModalOpen: store.tweets.newTweetModalOpen
//   };
// })

export class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTweetContent: ""
    };
    console.log(props);
    this.tweet = this.props.tweets;
    console.log(this.props.tweets);
    this.tweetTime = moment(this.tweet.time);
  }

  openModal() {
    this.props.dispatch({ type: "NEW_TWEET_MODAL_OPEN" });
  }

  closeModal() {
    this.props.dispatch({ type: "NEW_TWEET_MODAL_CLOSE" });
  }

  postTweet() {
    this.props.dispatch({
      type: "POST_TWEET",
      payload: {
        user: this.props.user,
        tweetContent: this.state.newTweetContent
      }
    });
  }

  componentWillMount() {
    this.props.dispatch({ type: "FETCH_TWEETS" });
    this.props.dispatch({ type:"FETCH_USER_LISTS"});
  }

  _keyExtractor = (item, index) => item.id.toString();

  _profileClick(user) {
    this.props.navigation.navigate("Profile", user);
  }

  _tweetDetails(tweet) {
    this.props.navigation.navigate("TweetDetails", tweet);
  }

  render() {
    if (this.props.tweetPosted === "success") {
      this.closeModal();
    }
    let datalist=this.props.userLists;
    return (
      <Container>
        {this.props.newTweetModalOpen && Platform.OS === "android" ? null : (
          <Header style={styles.topMargin}>
            <Left>
              <Button
              transparent
                onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="apps" style={{ color: "#2E5BFF", fontSize: 40, opacity: 0.8 }} light />
              </Button>             
            </Left>

            <Body>
              <Title style={{ color: "#585858", fontSize: 20 }}>News Feed</Title>
            </Body>
            
            <Right>
              <Button transparent onPress={this.openModal.bind(this)}>
                <Icon name="md-search" style={{ color: "#4286f4", fontSize: 30 }} />
              </Button>
            </Right>
          </Header>
        )}

        <Modal
          ref={"newTweetModal"}
          backdrop={true}
          style={styles.modal}
          isOpen={this.props.newTweetModalOpen}
          onClosed={this.closeModal.bind(this)}
        >
          <View
            style={{
              alignSelf: "flex-start",
              alignItems: "center",
              flexDirection: "row",
              padding: 5,
              paddingRight: 10
            }}
          >
            <Button transparent onPress={this.closeModal.bind(this)}>
              <Icon name="close" style={{ color: "black", fontSize: 32 }} />
            </Button>
            <View style={{ flex: 1 }} />
            <Thumbnail
              small
              source={{
                uri:
                  "https://i1.wallpaperscraft.ru/image/betmen_art_minimalizm_107658_300x240.jpg"
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%"
            }}
          >
            <Input
              style={{
                flex: 1,
                width: "100%",
                fontSize: 24,
                alignContent: "flex-start",
                justifyContent: "flex-start",
                textAlignVertical: "top",
                margin: 5
              }}
              multiline
              placeholder="Ask a question?"
              onChangeText={tweet => this.setState({ newTweetContent: tweet })}
            />
          </View>
          <View style={styles.modalFooter}>
            <Button transparent small>
              <Icon name="heart" />
            </Button>
            <Button transparent small>
              <Icon name="ios-pin" />
            </Button>
            <Button transparent small>
              <Icon name="ios-stats-outline" />
            </Button>

            <View style={{ flex: 1 }} />
            {this.props.tweetPosted === "ongoing" ? <Spinner /> : null}
            <Button
              rounded
              style={{ color: "#4286f4", height: 40, width: 94 }}
              onPress={this.postTweet.bind(this)}
            >
              <Text style={{ color: "white" }}>Tweet</Text>
            </Button>
          </View>
        </Modal>
        <Content style={styles.content}>
          <View style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
            marginBottom: 10,
          }}>
            <View style={styles.headerButtonsViews}>
              <Button transparent style={styles.headerButtons}>
                <Icon type="MaterialIcons" style={{ fontSize: 30 }} name="live-help" />
              </Button>
              <Text style={{ paddingTop: 10, color: "rgba(31, 31, 31, 0.73)", fontFamily: "SFProDisplay" }}>Ask</Text>
            </View>

            <View style={styles.headerButtonsViews}>
              <Button transparent style={styles.headerButtons}>
                <Icon type="MaterialIcons" style={{ fontSize: 30 }} name="movie" />
              </Button>
              <Text style={{ paddingTop: 10, color: "rgba(31, 31, 31, 0.73)", fontFamily: "SFProDisplay" }}>Movies</Text>
            </View>

            <View style={styles.headerButtonsViews}>
              <Button transparent style={styles.headerButtons}>
                <Icon type="MaterialIcons" style={{ fontSize: 30 }} name="restaurant" />
              </Button>
              <Text style={{ paddingTop: 10, color: "rgba(31, 31, 31, 0.73)", fontFamily: "SFProDisplay" }}>Food</Text>
            </View>

            <View style={styles.headerButtonsViews}>
              <Button transparent style={styles.headerButtons}>
                <Icon type="MaterialIcons" style={{ fontSize: 30 }} name="headset" />
              </Button>
              <Text style={{ paddingTop: 10, color: "rgba(31, 31, 31, 0.73)", fontFamily: "SFProDisplay" }}>Music</Text>
            </View >

          </View>
          {this.props.fetchingTweets ? (
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
              <View style={{ justifyContent: "flex-start" }}>
                <FlatList
                  data={this.props.tweets}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item }) => (
                    <View style={styles.tweet}>
                      <TouchableHighlight
                        onPress={this._profileClick.bind(this, item.user)}
                        underlayColor="white"
                        activeOpacity={0.75}
                      >
                        <View style={{ flex: 1, flexDirection: "row" }}>
                          <Thumbnail square source={{ uri: item.user.avatar }} style={{ borderRadius: 10 }} />
                          <View
                            style={{
                              flexDirection: "column",
                              flex: 1,
                              justifyContent: "flex-start"
                            }}
                          >
                            <Text
                              style={{
                                paddingLeft: 15,
                                fontWeight: "normal",
                                fontSize: 22,
                                fontFamily: "SFProDisplay",
                                color: "rgba(31, 31, 31, 0.73)"
                              }}
                            >
                              {item.user.name}
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                flex: 3,
                                justifyContent: "space-between"
                              }}
                            >

                              <Text
                                style={{
                                  paddingLeft: 15,
                                  fontFamily: "SFProDisplay",
                                  color: "rgba(31, 31, 31, 0.53)",
                                  fontSize: 16
                                }}
                              >
                                {item.user.location}
                              </Text>
                              <View >
                                <Text style={{ color: "#888", fontSize: 16 }}>
                                  {this.tweetTime.format("hh[:]mm")}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </TouchableHighlight>
                      <View>
                      <Text style={styles.tweetText}>{item.listHeader}</Text>
                     
                        
                        {this.props.fetchingUserlist ? (
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
                            <View
                                
                            style={{
                              flexDirection:'row',
                              justifyContent: 'space-between'
                            }}  
                            >
                              <FlatList
                            //  datalist={this.props.userLists}
                            style={{
                              flexDirection:'row',
                              justifyContent: 'space-between'
                            }} 
                              data={datalist.slice(0,2)}
                              keyExtractor={this._keyExtractor}
                              renderItem={({ item })=>(
                                 <Image    
                                 source={{ uri: item.list }}
                                 style={{
                                   marginTop: Constants.statusBarHeight,
                                   width: 115,
                                   height: 160,
                                   borderRadius: 10,
                                   zIndex: 2,
                                   marginRight:5
                                 }}
                               />
                    
                              )} 
                              />
                              {/* {console.log(datalist[3].list)} */}
                              <ImageBackground
                                source={{uri:datalist[3].list}}
                                blurRadius={10}
                                borderRadius={10}
                                opacity={0.4}
                                
                                style={{
                                  width:115,
                                  height:160,
                                  // opacity:0.4,
                                   zIndex: 2,
                                   padding:20,
                                   justifyContent:'center'
                                }}
                                >
                                <Text
                                  style={{
                                    fontSize:25,
                                    color:'#434343',
                                    paddingLeft:10
                                  }}
                                >
                                  +{datalist.length} <Text style={{fontSize:18}}>more</Text>
                                </Text>
                              </ImageBackground>
                            </View>
                        )}
                      </View>
                      <View 
                       style={{
                        borderBottomColor:'#f7f7f7',
                        borderBottomWidth: 2,
                        paddingTop:10,
                        paddingBottom:10
                      }}
                      >
                        
                      </View>
                      <View style={styles.tweetFooter}>
                          <View style={styles.footerIcons}>
                            <Button
                              transparent
                              dark
                              onPress={this._tweetDetails.bind(this, item)}
                            >
                              <Icon name="ios-text" />
                              <Text style={styles.badgeCount}>{item.replies}</Text>
                            </Button>
                          </View>
                          <View style={styles.footerIcons}>
                            <Button transparent dark>
                              <Icon name="ios-repeat" />
                              <Text style={styles.badgeCount}>{item.retweets}</Text>
                            </Button>
                          </View>
                          <View style={styles.footerIcons}>
                            <Button transparent dark>
                              <Icon name="heart-empty" />
                              <Text style={styles.badgeCount}>{item.likes}</Text>
                            </Button>
                          </View>
                          <View style={styles.footerIcons}>
                            <Button transparent dark>
                              <Icon name="ios-mail" />
                            </Button>
                          </View>
                        </View>
                      </View>
                      )}  
                    />
                    
                {/* {this.state.newTweetModalOpen ? null : (
                  <Fab
                    position="bottomRight"
                    style={{ backgroundColor: "#4286f4", zIndex: -1 }}
                    onPress={this.openModal.bind(this)}
                    ref={"FAB"}
                  >
                    <Icon name="md-create" />
                  </Fab>
                )} */}
                    </View>
                  )}
        </Content>
        
        <Footer>
                  <FooterTab>
                    <Button>
                      <Icon name="home" />
                    </Button>
                    <Button>
                      <Icon name="camera" />
                    </Button>
                    <Button active>
                      <Icon active name="navigate" />
                    </Button>
                    <Button>
                      <Icon name="person" />
                    </Button>
                  </FooterTab>
                </Footer>
      </Container>
            );
          }
        }
export default connect(store => ({
          tweets: store.tweets.tweets,
          userLists:store.tweets.userLists,
          fetchingTweets: store.tweets.fetchingTweets,
          fetchingUserlist: store.tweets.fetchingUserlist,
          errorTweets: store.tweets.error,
          user: store.login.user,
          tweetPosted: store.tweets.tweetPosted,
          newTweetModalOpen: store.tweets.newTweetModalOpen
}))(HomeScreen);