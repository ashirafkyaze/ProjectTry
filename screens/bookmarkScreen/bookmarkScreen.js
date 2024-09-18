import React, { Component } from "react";
import moment from "moment";
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
  bookmarkTitle: {
    width: Dimensions.get('window').width / 2.4,
    fontFamily: "SFProDisplay",
    fontSize: 22,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 30,
    letterSpacing: 0,
    paddingLeft: 5,
    textAlign: "left",
    color: "#797979"
  },
  bookmarkTime: {
    width: Dimensions.get('window').width / 2.4,
    fontFamily: "SFProDisplay",
    fontSize: 15,
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: 15,
    letterSpacing: 0,
    paddingLeft: 5,
    textAlign: "left",
    color: "#797979"
  },
  bookmarkImage: {
    width: Dimensions.get('window').width / 2.3,
    height: Dimensions.get('window').width / 2.3,
    borderRadius: 20,
    borderColor: '#ddd',
    borderBottomWidth: 0,
  },
  bookmarkImageView: {
    width: Dimensions.get('window').width / 2.3,
    height: Dimensions.get('window').width / 2.3,
    borderRadius: 20,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 10,
    backgroundColor: "#000",
    zIndex: 10
  },
  backgroundCurve:{ 
    height: Dimensions.get('window').width/1.5, 
    width:Dimensions.get('window').width*1.4, 
    position: 'absolute',
    borderBottomLeftRadius: Dimensions.get("window").width /1.7,
    borderBottomRightRadius: Dimensions.get("window").width /1.7,
    top:0, 
    right:-(Dimensions.get("window").width/5), 
    backgroundColor: '#3105df',
    elevation:-1
    },
  nameText: {
    fontSize: 26,
    fontWeight: "500",
    marginLeft: 14
  },

  topMargin: {
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    backgroundColor: "#3105df",
    // zIndex: 10,
    elevation:0,
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
    // alignSelf: 'center',
    // alignItems: 'center',
    // width: Dimensions.get("window").width,
    // overflow: 'hidden',
    // height: Dimensions.get("window").width / 2,
    // backgroundColor: '#e8e8e8',
  },
  sliderContainerStyle: {
    height: Dimensions.get('window').width / 1.2,
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    backgroundColor: '#2800d4',
  },
  slider: {
    // height: Dimensions.get("window").width / 1.7,
    // width: Dimensions.get("window").width,
    // position: 'absolute', 
    // bottom:0, 
    // left:0, 
    // zIndex:-1,
    // marginLeft: Dimensions.get("window").width / 2,
    // backgroundColor: '#2800d4',
    // alignItems: 'center',
    // zIndex: 8
  },
});

export class BookmarkScreen extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.bookmarks;
    this.state={
      zIndex:-2
    }
    this.bookmarkTime = moment(this.user.time);
    console.log(this.user.title);
    this.state = { scrollY: new Animated.Value(0) };
    // this._goBack=this._goBack.bind(this);
  }

  componentWillMount() {
    this.props.dispatch({ type: "FETCH_BOOKMARKS" });
  }
  componentDidMount(){
    this.setState({
      zindex:-1
    })
  }
  _goBack() {
    console.log("Back button pressed");
    this.props.navigation.goBack();
  }
  _viewScrolled () {
   if(window.scrollY>400){
    console.log("scrolled enough");
   }else
   console.log('nothing');
    
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
        <View>
          <Header
            iosBarStyle={'light-content'} 
            androidStatusBarColor='#3105df'
            style={styles.topMargin}
          >
            <Left>
              <Button
                transparent
                onPress={this._goBack.bind(this)}>
                <Icon name="apps" style={{ color: "#FFF", fontSize: 30, opacity: 0.8 }} light />
              </Button>
            </Left>

            <Body>
              <Title style={{ color: "#fff", fontSize: 20, textAlign: 'left' }}>Bookmarks</Title>
            </Body>
            <Right>
              <Button transparent iconRight light>
                <Icon name="md-add" style={{fontSize:30,fontWeight:'600'}} />
              </Button>
            </Right>
          </Header>

          <View 
          style={styles.backgroundCurve}
          >
        </View>
        
        </View>

        <ScrollView style={{ flex: 1 }}
         onScroll={this._viewScrolled()}
        >
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
          <View
          style={{zIndex:100,flexDirection:'column'}}
          >
          <Text style={{fontSize:20,color:'white',paddingLeft:20,fontWeight:'500'}}>Bookmarks</Text>
          <Text style={{fontSize:16,color:'rgba(255,255,255,0.73)',paddingLeft:20,paddingRight:5}} >{this.user.length} total</Text>
          
          </View>
          <Button
          bordered
          transparent
          style={{ alignSelf: 'flex-end', borderColor: '#fff', padding: 5,marginRight:10 }}
          >
           <Text style={{fontSize:20,color:'white',paddingLeft:20,fontWeight:'400'}}>
             All
            </Text><Icon name="ios-arrow-down" style={{color:'#fff'}}/>
          </Button>
          </View>

        
          <View style={{ flexDirection: 'row', flex: 1,marginTop:Constants.statusBarHeight }}>
            {this.props.fetchingbookmarks ? (
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
                <View style={{ flex: 1 }}>
                  <FlatList
                    numColumns={2}
                    data={this.props.bookmarks}
                    keyExtractor={this._keyExtractor}
                    style={{ paddingRight: 15, paddingLeft: 10, backgroundColor: '#0000' }}
                    renderItem={({ item }) => (
                      <TouchableHighlight
                        underlayColor="white"
                        activeOpacity={0.75}
                      >
                        <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 10, marginBottom: 10 }} >
                          <View style={styles.bookmarkImageView}>
                            <Image source={{ uri: item.bookmark }}
                              style={styles.bookmarkImage}
                            />
                          </View>

                          <View style={{ flexDirection: 'column', padding: 5, alignItems: 'center' }}>
                            <Text style={styles.bookmarkTitle}>
                              {item.title}
                            </Text>
                            <Text style={styles.bookmarkTime}>
                              {moment(item.time).format("mm")} Mins ago
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
        </ScrollView>
      </View>
    );
  }
}
export default connect(store => ({
  bookmarks: store.bookmarks.bookmarks,
  fetchingbookmarks: store.bookmarks.fetchingbookmarks,
  fetchedbookmarks: store.bookmarks.fetchedbookmarks,
  error: store.bookmarks.error
}))(BookmarkScreen);