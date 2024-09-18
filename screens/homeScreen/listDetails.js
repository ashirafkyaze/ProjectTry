import React, { Component } from "react";
import moment from "moment";
import Constants from 'expo-constants';
// import Modal from "react-native-modalbox";
// import Dimensions from "Dimensions";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
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
  Input,
  Form,
  Item,
  Right
} from "native-base";
import { connect } from "react-redux";
// import ProfileScreen from "./profile";
// import { fetchTweets } from "../actions/tweetsActions";
// import ScrollableTabView, {
//   ScrollableTabBar
// } from "react-native-scrollable-tab-view";

const styles = StyleSheet.create({
  tweetHead: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    paddingBottom: 0
  },
  topMargin: {
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    backgroundColor: "#F7F7F7",
    zIndex: -1
  },
  timeStamp: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomColor: "#CCC",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  tweetFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#CCC",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "flex-end"
  },
  tweetReply: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    paddingBottom: 0,
    borderBottomColor: "#000"
  },
  listStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  }
});

export class ListDetail extends Component {
  constructor(props) {
    super(props);
    this.tweet = this.props.navigation.state.params;
    this.tweetTime = moment(this.tweet.time);
    console.log(this.tweet);
    this.state = {
      focused: false
    }
  }

  componentWillMount() {
    this.props.dispatch({ type: "FETCH_TWEET_REPLIES" });
  }
  _listDetailClick(item) {
    console.log(item + 'clicked');
    this.props.navigation.navigate("ItemDetail", item);
  }
  _goBack() {
    console.log("Back button pressed");
    this.props.navigation.goBack();
  }

  _keyExtractor = (item, index) => item.id.toString();

  render() {
    console.log(this.props);
    return (
      <Container>
        <Header style={styles.topMargin}>
          <Left>
            <Button transparent onPress={this._goBack.bind(this)}>
              <Icon name="ios-arrow-back" style={{ color: "blue" }} />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: "#000" }}>News Feed</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: "white" }}>
          <View style={styles.tweetHead}>
            <Thumbnail square source={{ uri: this.tweet.user.avatar }} style={{ borderRadius: 10 }} />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                paddingLeft: 10,
                height: 56
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {this.tweet.user.name}
              </Text>

              <Text
                style={{
                  paddingLeft: 15,
                  fontFamily: "SFProDisplay",
                  color: "rgba(31, 31, 31, 0.53)",
                  fontSize: 16
                }}
              >
                {this.tweet.user.location}
              </Text>
            </View>
            <Button
              style={{ alignSelf: 'flex-end', borderColor: 'blue', padding: 10 }}
              transparent
              bordered
            >
              <Text style={{color:'#2e5bff'}}>
                Follow List
            </Text>
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              // flexWrap:'wrap', 
              justifyContent: 'space-between'
            }}
          >
            <FlatList
              {...console.log(this.tweet.user)}
              ListHeaderComponent={
                <View>
                  <Text>{this.props.userLists.listTitle}</Text>
                  <Text>{this.props.userLists.listDesc}</Text>
                </View>
              }
              //  datalist={this.props.userLists}
              numColumns={3}
              data={this.props.userLists}
              keyExtractor={this._keyExtractor}
              renderItem={({ item }) => (
                <TouchableHighlight
                onPress={this._listDetailClick.bind(this,item)}
                underlayColor="white"
                activeOpacity={0.75}
                >
                  <Image
                    source={{ uri: item.list }}
                    style={{
                    marginTop: Constants.statusBarHeight,
                    width: 120,
                    height: 160,
                    borderRadius: 5,
                    zIndex: 2,
                    margin: 2,
                  }}
                />
                </TouchableHighlight>
              )}
            />
          </View>
          <View style={styles.timeStamp}>
            <Text style={{ color: "#888", fontSize: 16 }}>
              {this.tweetTime.format("hh[:]mm A [-] DD MMM YY")}
            </Text>
          </View>
          <View style={styles.timeStamp}>
            <View style={{flexDirection:'row'}}>
              <Icon
                name="ios-heart"
                style={{ fontSize: 20, color: "crimson" }}
              />
              <Text style={{ fontWeight: "bold", fontSize: 16, paddingLeft: 7 }}>
                {this.tweet.likes}
              </Text>

              <Icon
                name="ios-text"
                style={{ fontSize: 20, color: "#ccc",paddingLeft:15}}
              />
              <Text style={{ fontWeight: "bold", fontSize: 16, paddingLeft: 7 }}>
                {this.tweet.retweets}
              </Text>
            </View>

            <Icon
              name="md-share"
              style={{ fontSize: 20, color: "#ccc"}}
            />

          </View>
          <View>
            {this.props.fetchingTweetReplies ? (
              <Spinner />
            ) : (
                <FlatList
                  data={this.props.tweetReplies}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item }) => (
                    <View style={styles.tweetReply}>
                      <Thumbnail square source={{ uri: item.user.avatar }} style={{ borderRadius: 10 }} />
                      <View
                        style={{
                          justifyContent: "space-between",
                          // alignItems: "space-between",
                          paddingLeft: 10,
                          paddingRight: 10,
                          width: "93%"
                        }}
                      >
                        <View style={{ flexDirection: "row", maxHeight: 22 }}>
                          <Text style={{ fontWeight: "bold" }}>
                            {item.user.name}
                          </Text>
                          <Text
                            style={{ color: "#888", flex: 1 }}
                          >
                            {item.user.location}
                          </Text>
                        </View>
                        <Text style={{ paddingTop: 5 }}>{item.tweetContent}</Text>
                        <View
                          style={StyleSheet.flatten([
                            styles.tweetFooter,
                            { width: "100%" }
                          ])}
                        >
                          <View style={styles.footerIcons}>
                            <Button transparent dark>

                              <Icon
                                onPress={this.setState({ focused: true })}
                                name={
                                  this.state.focused === true ? 'ios-heart' : 'ios-heart-empty'
                                }
                                style={{ fontSize: 20, color: "crimson" }}
                              />
                              <Text style={{ fontSize: 14 }}>{item.likes}</Text>
                            </Button>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                />
              )}
          </View>
        </Content>
        <View>
            <Footer style={{backgroundColor:'#d1d1d1'}}>
              <Form style={{
                width: '100%',
                height: 'auto',
                padding: 10,
                borderRadius: 13.3,
                position:'absolute',
                bottom:0
              }}>
                <Item regular last style={{ backgroundColor: "#dddddd", marginBottom: 15, borderRadius: 10, paddingRight: 5, height: 55 }}>
                  <Input

                    placeholder='comment'
                    placeholderTextColor="gray"
                    onChangeText={username =>
                      this.props.dispatch({
                        type: "SET_USERNAME",
                        payload: username
                      })}
                  />
                  <Icon active name="send" style={{ backgroundColor: "#2e5bff", color: "#dddddd", borderRadius: 10.3, padding: 6 }} />
                </Item>
              </Form>
            </Footer>
          </View>
      </Container>
    );
  }
};
export default connect(store => ({
  tweets: store.tweets.tweets,
  tweetReplies: store.tweets.tweetReplies,
  userLists: store.tweets.userLists,
  fetchingTweetReplies: store.tweets.fetchingTweetReplies,
  fetchedTweetReplies: store.tweets.fetchedTweetReplies

}))(ListDetail);