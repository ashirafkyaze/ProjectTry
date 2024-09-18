import React, { Component } from "react";
import { StyleSheet, Image } from "react-native";
import getTheme from "../native-base-theme/components";
import platform from "../native-base-theme/variables/platform";
import { NavigationActions, StackActions } from "react-navigation";
// import logo from "../assets/logo/drawable-mdpi/logo.png";
import {
  Container,
  Button,
  Text,
  Header,
  Left,
  Body,
  Right,
  Icon,
  Title,
  StyleProvider,
  Content,
  
  Input,
  Item,
  Form,
  Label,
  Footer,
  Tab,
  Tabs,
  TabHeading,
  Spinner,
  View,
  
} from "native-base";
// import { setUsername } from "../actions/loginActions";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  topMargin: {
    marginTop: 0
  },
  content: {
    padding: 10,
    backgroundColor: "#ebebeb"
  },
  heading: {
    fontSize: 32,
    fontWeight: "400",
    marginBottom: 30
  },
  footer: {
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    height: 60,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  formWrapper: {
    width: 370,
    height: 'auto',
    padding: 10,
    borderRadius: 13.3,
    
  },
  tabStyle: {
    borderRadius:10,
    marginTop:0,
    paddingTop:30,
    paddingLeft:10,
    paddingRight:15,
    backgroundColor: "#f7f7f7"
  }
});

// connect(store => {
//   return {
//     username: store.login.username,
//     password: store.login.password,
//     loginStatus: store.login.loginStatus
//   };
// })
// @connect(state => ({ todos: state.todos }))
// export default connect(state => ({todos: state.todos}))(Home);
// const mapStateToProps = state => ({
//   // userInfo: state.userData.userInfo,
//   username: setUsername.username,
//   password: setUsername.password,
//   loginStatus: setUsername.loginStatus
// });
// const mapDispatchToProps = dispatch => bindActionCreators(setUsername, dispatch);


export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.state = {
      showPassword: true,
    }
    console.log(this.props);
  }
  login() {
    this.props.dispatch({
      type: "DO_LOGIN",
      payload: { username: this.props.username, password: this.props.password }
    });
  }
  toggleSwitch() {
    this.setState({ showPassword: !this.state.showPassword });
  }
  componentWillMount() {
    console.log("component will mount");
  }

  render() {
    // // const {username} = this.props;
    // if (this.props.loginStatus === "success") {
    //   console.log(this.props.navigation);
    //   this.props.navigation.dispatch(
    //     NavigationActions.reset({
    //       index: 0,
    //       actions: [NavigationActions.navigate({ routeName: "Home" })]
    //     })
    //   );
    // }
    if (this.props.loginStatus === "success") {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Home" })],
      });
      this.props.navigation.dispatch(resetAction);
    }

    return (
      <StyleProvider style={getTheme(platform)}>
        <Container style={styles.topMargin}>
          <Content style={styles.content}>
            <Image source={require('../assets/logo/logo.png')} style={{ width: 174, height: 120, marginHorizontal: 110, marginTop: 60 }} />

            <Tabs tabBarUnderlineStyle={{ opacity: 0 }} style={{marginTop:20}}>
              <Tab 
              heading={<TabHeading><Text>Login</Text></TabHeading>} style={styles.tabStyle} activeTabStyle={{backgroundColor:"#fff"}} >
                <Form style={styles.formWrapper}>
                  <Item regular last style={{backgroundColor:"#dddddd", marginBottom:15, borderRadius:10,paddingRight:5, height:55}}>
                    <Input
                    
                      placeholder='johndoe95@gmail.com'
                      placeholderTextColor="gray"
                      onChangeText={username =>
                        this.props.dispatch({
                          type: "SET_USERNAME",
                          payload: username
                        })}
                    />
                    <Icon active name="person" style={{backgroundColor:"#2e5bff",color:"#dddddd",borderRadius: 10.3,padding:6}}/>
                  </Item>
                  <Item regular last style={{backgroundColor:"#dddddd",marginBottom:15, borderRadius:10,paddingRight:5}}>
                    {/* <Label>Password</Label> */}
                    <Input
                    placeholderTextColor="gray"
                    
                      secureTextEntry={this.state.showPassword}
                      placeholder="password"
                      onChangeText={password =>
                        this.props.dispatch({
                          type: "SET_PASSWORD",
                          payload: password
                        })}
                    />
                    <Icon active name="eye"
                    onPress={this.toggleSwitch}
                    onValueChange={this.toggleSwitch}
                    value={!this.state.showPassword}
                    />
                  </Item>
                  <View>
                  
                  <Button block
                  onPress={this.login.bind(this)}
                  style={{backgroundColor:"#2e5bff",height:60}}
                  >
                    <Text style={{textTransform:"capitalize",fontSize:25,fontFamily: "SFProDisplay",fontWeight:"400",color:"#f7f7f7"}}>Login</Text>
                  </Button>
                  {this.props.loginStatus === "ongoing" ? <Spinner /> : null}
                  {this.props.loginStatus === "failed" ? (
                    <Text style={{ color: "#f92a3f",textAlign:"center" }}>Login Failed</Text>
                  ) : null
                  }
                </View>
                <Button
                  transparent
                  style={{
                    margin: 15,
                    marginTop: 25,
                    width: "50%",
                    alignSelf: "center"
                  }}
                >
                  <Text
                    style={{ textAlign: "center", fontSize: 14, color: "rgba(46, 91, 255, 0.83)" }}
                  >
                    Forgot password?
              </Text>
                </Button>
                </Form>                             
              </Tab>
              <Tab 
              heading={<TabHeading><Text>Register</Text></TabHeading>} style={styles.tabStyle} activeTabStyle={{backgroundColor:"#fff"}} >
                <Form style={styles.formWrapper}>
                  <Item regular last style={{backgroundColor:"#dddddd", marginBottom:15, borderRadius:10,paddingRight:5, height:55}}>
                    <Input
                    
                      placeholder='Username'
                      placeholderTextColor="gray"
                      onChangeText={username =>
                        this.props.dispatch({
                          type: "SET_USERNAME",
                          payload: username
                        })}
                    />
                    <Icon active name="person" style={{backgroundColor:"#2e5bff",color:"#dddddd",borderRadius: 10.3,padding:6}}/>
                  </Item>

                  <Item regular last style={{backgroundColor:"#dddddd", marginBottom:15, borderRadius:10,paddingRight:5, height:55}}>
                    <Input
                    
                      placeholder='Email'
                      placeholderTextColor="gray"
                      onChangeText={username =>
                        this.props.dispatch({
                          type: "SET_USERNAME",
                          payload: username
                        })}
                    />
                    <Icon active name="mail" style={{color:"#D4D4D4d",borderRadius: 10.3,padding:6}}/>
                  </Item>
                  <Item regular last style={{backgroundColor:"#dddddd",marginBottom:15, borderRadius:10,paddingRight:5}}>
                    {/* <Label>Password</Label> */}
                    <Input
                    placeholderTextColor="gray"
                    
                      secureTextEntry={this.state.showPassword}
                      placeholder="password"
                      onChangeText={password =>
                        this.props.dispatch({
                          type: "SET_PASSWORD",
                          payload: password
                        })}
                    />
                    <Icon active name="eye"
                    onPress={this.toggleSwitch}
                    onValueChange={this.toggleSwitch}
                    value={!this.state.showPassword}
                    />
                  </Item>
                  
                  <View>
                  
                  <Button block
                  onPress={this.login.bind(this)}
                  style={{backgroundColor:"#2e5bff",height:60}}
                  >
                    <Text style={{textTransform:"capitalize",fontSize:25,fontFamily: "SFProDisplay",fontWeight:"400",color:"#f7f7f7"}}>Register</Text>
                  </Button>
                  {this.props.loginStatus === "ongoing" ? <Spinner /> : null}
                  {this.props.loginStatus === "failed" ? (
                    <Text style={{ color: "#f92a3f",textAlign:"center" }}>Registration Failed</Text>
                  ) : null
                  }
                </View>
                </Form>
                <View style={{marginTop:10,backgroundColor:"#ccc",position:"relative",bottom:-20,elevation:10}}>
                  <Text>
                    Or Register With <Icon active name="facebook" type="FontAwesome"></Icon> <Icon type="FontAwesome" name="google"></Icon>
                   
                  </Text>
                  
                </View>                             
              </Tab>
            </Tabs>

          </Content>
        </Container>
      </StyleProvider>
    );
  }
}
export default connect(store => ({ username: store.login.username, password: store.login.password, loginStatus: store.login.loginStatus }))(LoginScreen);