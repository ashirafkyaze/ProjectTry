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
  ScrollView,
  ImageBackground,
  Dimensions,
  StatusBar,
  Platform,
  TouchableHighlight,
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
  Right,
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
    alignItems: "flex-start",
    padding: 0,
    paddingBottom: 0,
    zIndex: 100,
  },
  contentView: {
    flexDirection: "column",
    alignSelf: 'center',
    // justifyContent: "center",
    padding: 20,
    backgroundColor: '#f7f7f7',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    width: Dimensions.get('window').width,
    zIndex: 12,
    marginTop:Dimensions.get('window').width/1.7
  },
  tweetFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: "#CCC",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  footerIcons: {
    flexDirection: "row",
    alignItems: "center"
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

export class ListItemDetail extends Component {
  constructor(props) {
    super(props);
    // this.listItem = this.props.navigation.state.params;
    // this.tweetTime = moment(this.tweet.time);
    console.log(this.props.itemDetail);
    this.state = {
      focused: false,
      listItem: this.props.navigation.state.params
    }
  }

  componentWillMount() {
    // if (this.state.listItem != this.props.navigation.state.params) {
    //   this.setState = {
    //     listItem: this.props.navigation.state.params
    //   }
    // }
    this.props.dispatch({ type: "FETCH_ITEM_DETAIL" });
  }
  _goBack() {
    console.log("Back button pressed");
    this.props.navigation.goBack();
  }

  _keyExtractor = (item, index) => index.toString();

  renderHeader = () => {
    //View to set in Header
    return (
      <View style={{ lineHeight: 30 }}>
        <Text style={{ fontWeight: 'bold' }}>Featured On</Text>
      </View>
    );
  };
  render() {
    console.log(this.props);
    return (

      <View style={{ flex:1 }}>
         
        <View>  
        <Header transparent iosBarStyle={'light-content'} androidStatusBarColor='rgba(0,0,0,0.4)'>
            <Left>
              <Button transparent onPress={this._goBack.bind(this)} style={{paddingLeft:5,paddingTop:5,width:30,height:30, borderRadius: 30,backgroundColor: 'rgba(0,0,0,0.4)'}}>
                <Icon name="ios-arrow-back" style={{ color: "#fff"}} />
              </Button>
            </Left>
            <Body transparent>

            </Body>
          </Header>
          
          <Image 
          style={{ 
            height: Dimensions.get('window').width/1.2, 
            width:Dimensions.get('window').width, 
            position: 'absolute', 
            top:0, 
            left:0, 
            }} 
          source={{uri: this.state.listItem.list }} />
        </View>
        <ScrollView style={{ flex:1 }}
         
        >
          <View style={styles.contentView}>
          <View >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: "bold", fontSize: 18, width: Dimensions.get('window').width / 1.4, lineHeight: 25 }}>
                {this.props.itemDetail.itemTitle}
              </Text>

              <View style={{ flexDirection: 'row' }}>
                <Icon
                  name="ios-heart"
                  style={{ marginRight: 10, color: 'crimson' }}
                />

                <Icon
                  name="md-more"
                  style={{ color: '#1f1f1f', opacity: 0.8 }}
                />
              </View>

            </View>
            <Text
              style={{ opacity: 0.8, lineHeight: 25 }}
            >
              Podcast, fiction, storytelling
                </Text>
            <Text style={{ fontSize: 16, color: "rgba(31, 31, 31, 0.73)" }}>
              {this.props.itemDetail.listDesc}
            </Text>
            <View style={{marginTop:10,marginBottom:10}}>
              <Text style={{ fontSize: 15, color: "rgba(31, 31, 31, 0.73)" }}>Published Dated: {moment(this.props.itemDetail.publishedDate).format('DD[-]MMMM[-]YYYY')}</Text>
              <Text style={{ fontSize: 15, color: "rgba(31, 31, 31, 0.73)" }}>Time: {this.props.itemDetail.itemTime} mins </Text>
              <Text style={{ fontSize: 15, color: "rgba(31, 31, 31, 0.73)" }}>Cast: {this.props.itemDetail.Cast}</Text>
            </View>
            <View style={{ flexDirection: 'column',flex: 1, }}>
              {this.props.fetchingItemDetails ? (
              
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
                  <View style={{ justifyContent: 'space-between',flex: 1, }}>
                    <Text style={{ fontSize: 16, color: "rgba(31, 31, 31, 0.83)" }}>FeaturedOn</Text>
                    <FlatList
                      data={this.props.itemDetail.featuredOn}
                      keyExtractor={this._keyExtractor}
                      horizontal
                      style={{ padding: 10 }}
                      renderItem={({ item }) => (
                        <TouchableHighlight
                        underlayColor="white"
                        activeOpacity={0.75}
                       >
                         <View style={{ flexDirection: 'row', marginRight: 10 }} >
                         
                          <Image source={{ uri: item }}
                            style={{ width: 50, height: 50, borderRadius: 40 }}
                          />
                          <View style={{ flexDirection: 'column', padding: 5 }}>
                            <Text>
                              Capital Fm
                          </Text>
                            <Text>
                              91.3
                          </Text>
                          </View>

                        </View>
                       </TouchableHighlight>
                        

                      )

                      }
                    />
                  </View>
                )}
            </View>
            {/* related list */}
            <View style={{ flexDirection: 'column',flex: 2}}>
              {this.props.fetchingItemDetails ? (
              
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
                  <View style={{ justifyContent: 'space-between',flex: 1, }}>
                    <Text style={{ fontSize: 16, color: "rgba(31, 31, 31, 0.83)" }}>Related Podcasts</Text>
                    <FlatList
                      data={this.props.itemDetail.related}
                      keyExtractor={this._keyExtractor}
                      horizontal
                      style={{ padding: 10 }}
                      renderItem={({ item }) => (
                        <View style={{ flexDirection: 'column', marginRight: 10 }} >
                          <Image source={{ uri: item }}
                            style={{
                              marginTop: Constants.statusBarHeight,
                              width: 115,
                              height: 160,
                              borderRadius: 10,
                              zIndex: 2,
                               
                              }}
                          />
                          <View style={{ flexDirection: 'column', padding: 5 }}>
                            <Text>
                             Paramount Theatre
                          </Text>
                            <Text>
                             The Panel Show
                          </Text>
                          </View>

                        </View>

                      )

                      }
                    />
                  </View>
                )}
            </View>

          </View>
          </View>
        </ScrollView>
      </View>

    );
  }
};
export default connect(store => ({
  userLists: store.tweets.userLists,
  itemDetail: store.tweets.listItems,
  fetchingItemDetails: store.tweets.fetchingItemDetails
}))(ListItemDetail);