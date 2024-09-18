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
import {Overlay} from 'react-native-elements';
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
    backgroundColor: "#f7f7f7",
    // zIndex: 10,
    elevation:-1
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
  },
  overflowText:{
    width:Dimensions.get('window').width/1.5,
    backgroundColor:'#ffffff',
    elevation:3,
    height:Dimensions.get('window').width/3.5,
    borderRadius:10,
    position:'absolute',
    top:'30%',
    left:'26%',
    padding:15
  },
  overlay:{
    top:'0%'
  }

});


export class CreateListScreen extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.login;
    console.log(this.props);
    // this.state = { scrollY: new Animated.Value(0) };
    this.state={
      isVisible:true
    }
    // this._goBack=this._goBack.bind(this);
  }

  componentWillMount() {
    this.props.dispatch({ type: "FETCH_USER_PROFILE" });
    this.props.dispatch({ type:"FETCH_USER_LISTS"});
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
  _editListClick() {
    this.props.dispatch({type:'LIST_EDIT_OPEN'});
    this.setState({
      isVisible:!this.state.isVisible
    });
  }
  _closeEditList(){
    this.props.dispatch({type:'LIST_EDIT_CLOSED'});
  }
  _keyExtractor = (item, index) => item.id.toString();

  render() {
    if (this.props.listEdited === "success") {
      this._closeEditList();
    }
    return (
      <View style={{ flex: 1 }}>
        <Header
          style={styles.topMargin}
          iosBarStyle={"light-content"}
          androidStatusBarColor='rgba(0,0,0,0.4)'
        >
          <Left>
            <Button
              transparent
              onPress={this._goBack.bind(this)}>
              <Icon name="apps" style={{ color: "#2800d4", fontSize: 30, opacity: 0.8 }} light />
            </Button>
          </Left>

          <Body>
            <Title style={{ color: "rgba(31, 31, 31, 0.83)", fontSize: 20, textAlign: 'left' }}>Create List</Title>
          </Body>
          <Right>
            <Button transparent iconRight light>
              <Icon name="md-share" style={{ color: "#2800d4", fontSize: 25, opacity: 0.8 }}/>
            </Button>
          </Right>
        </Header>
      <Container>
        <Content style={{backgroundColor:"#f7f7f7"}}>
        <Overlay
          isVisible={this.state.isVisible}
          onBackdropPress={() => this.setState({ isVisible: false })}
          width="auto"
           height="auto"
          overlayStyle={styles.overlay}
        >
        <View style={{flexDirection:'row',width:Dimensions.get("window").width/1.2,padding:20}}>
          <View style={{alignItems:'center'}}>
            <Thumbnail large source={{uri:this.props.login.avatar}}/>
            <Text>{this.props.login.name}</Text>
            {/* {console.log(this.props)} */}
          </View>
          <View style={{paddingLeft:20,paddingRight:10}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:20,color: "rgba(31, 31, 31, 0.87)",fontWeight:'bold'}}>
              My 2018 Favourite List
            </Text>
            <Icon name="ios-create" style={{color:'blue'}}  onPress={this._editListClick.bind(this)}/>
            </View>
            <Text style={{color: "rgba(31, 31, 31, 0.53)"}}>
              Eu ipsum fugiat amet est laborum consequat minim. Irure consequat minim occaecat deserunt do quis do. Lorem veniam amet eiusmod velit ea culpa commodo proident.
            </Text>
          </View>
        </View>
        </Overlay>
        <View style={{flexDirection:'row',width:Dimensions.get("window").width/1.2,padding:20}}>
          <View style={{alignItems:'center'}}>
            <Thumbnail large source={{uri:this.props.login.avatar}}/>
            <Text>{this.props.login.name}</Text>
            {/* {console.log(this.props)} */}
          </View>
          <View style={{paddingLeft:20,paddingRight:10}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:20,color: "rgba(31, 31, 31, 0.87)",fontWeight:'bold'}}>
              My 2018 Favourite List
            </Text>
            <Icon name="ios-create" style={{color:'blue'}}  onPress={this._editListClick.bind(this)}/>
            </View>
            <Text style={{color: "rgba(31, 31, 31, 0.53)"}}>
              Eu ipsum fugiat amet est laborum consequat minim. Irure consequat minim occaecat deserunt do quis do. Lorem veniam amet eiusmod velit ea culpa commodo proident.
            </Text>
          </View>
        </View>
        <View style={{padding:20}}>
          <Text style={{fontSize:20,color: "rgba(31, 31, 31, 0.87)",fontWeight:'bold'}}>
            List Items
          </Text>

          <View>
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
                ):(

                  <FlatList
                  {...console.log(this.props.userLists)}
                  data={this.props.userLists}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item }) => (
                    <TouchableHighlight
                    // onPress={this._listDetailClick.bind(this,item)}
                    underlayColor="white"
                    activeOpacity={0.75}
                    >
                     <View style={{flexDirection:'row',paddingTop:10}}>
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
                      // {...console.log(item)}
                    />
                    <View style={styles.overflowText}>
                      
                      <Text style={{fontSize:12}}>
                        2017. Fantasy/Action
                      </Text>
                      <Text style={{fontSize:20,color: "rgba(31, 31, 31, 0.83)"}} numberOfLines={1}>
                        Jumanji: Welcome to the Jungle
                      </Text>
                      <View style={{position:'absolute',right:10,top:10}}>
                        <Icon style={{color: "rgba(31, 31, 31, 0.53)", fontWeight:'bold'}} name='md-more'/>
                      </View>
                      <Text>*******</Text>
                      <Text  numberOfLines={2} style={{ color: "rgba(31, 31, 31, 0.53)"}}>Est ea ullamco commodo quis laboris culpa fugiat deserunt laborum deserunt Lorem anim.</Text>
                    </View>
                     </View>
                      
                    </TouchableHighlight>
                  )}
                />
                )}
          </View>
          <Button style={{backgroundColor: "#2e5bff",width:160,justifyContent:'center',borderRadius:8,alignSelf:'flex-end'}}>
            <Text style={{color:'#fff',fontSize:16}}>
            Add Item
            </Text>
          </Button>
        </View> 
        </Content>
      </Container>
      
      </View>
    );
  }
}
export default connect(store => ({

  userTweets: store.tweets.userTweets,
  fetchingUserTweets: store.tweets.fetchingUserTweets,
  fetchedUserTweets: store.tweets.fetchedUserTweets,
  errorTweets: store.tweets.error,
  userLists: store.tweets.userLists,
  fetchingUserlist: store.tweets.fetchingUserlist,
  username: store.login.username,
  login: store.login.user2,
  fetchingUserprofile: store.login,

}))(CreateListScreen);