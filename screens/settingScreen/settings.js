import React, { Component } from "react";
import { StyleSheet, Platform, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import {
  Container,
  Header,
  Content,
  Accordion,
  Button,
  Text,
  Right,
  Left,
  Body,
  Title,
  Icon,
  Switch,
  Form,
  Input,

  Item,
  Label

} from "native-base";
const dataArray = [
  { title: "Account", content: "Lorem ipsum dolor sit amet" },
  { title: "Notifications", content: "Lorem ipsum dolor sit amet" },
];
const anotherData = [
  { title: "About", content: 'Blah blah' }
]

// const Acccount;
const styles = StyleSheet.create({
  topMargin: {
    marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
    backgroundColor: "#f7f7f7",
    elevation: 0,
    borderBottomWidth: 0,
    borderBottomColor:'red',
    shadowColor: '#f7f7f7',
    shadowOpacity:0,
    shadowRadius:0,
    shadowOffset: {
      height: 0
    }
  },
  default:{
    textAlign:'left',
    fontSize:16,
    color: "rgba(31, 31, 31, 0.53)",
    width:'90%',
    
  },
  switchsection:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  segments:{
    paddingLeft:10,
    paddingTop:10,
    paddingBottom:10
    
  },
  btn:{
  borderRadius: 8.3,
  backgroundColor: "#ff1e45",
  width:'90%',
  alignSelf:'center',
  marginTop:50,
  marginBottom:50,
  shadowColor: "#33000000",
  shadowOffset: { width: 1, height: 3.3 },
  shadowOpacity: 1,
  shadowRadius: 2,
  }

})
export class Settings extends Component {
  constructor(props) {
    super(props);
  }


  _goBack() {
    console.log("Back button pressed");
    this.props.navigation.goBack();
  }
  _renderContent(item) {
    if (item.title === "Account") {
      return (
        <View style={{backgroundColor:"#eff0f0",paddingLeft:20}}>
          <Form >
            <Item stackedLabel last style={{alignItems:'flex-start'}}>
              <Label style={{color:'#000',fontSize:13}}>Username</Label>
              <TextInput disabled style={styles.default} value="John Kazibwe" editable={false} />
            </Item>
            <Item stackedLabel last style={{alignItems:'flex-start'}}>
              <Label style={{color:'#000',fontSize:13}}>Email</Label>
              <TextInput disabled style={styles.default} value="jonkaz@gmail.com" editable={false} />
            </Item>
            <Item stackedLabel last style={{alignItems:'flex-start'}}>
              <Label style={{color:'#000',fontSize:13}}>Password</Label>
              <TextInput secureTextEntry={true} style={{fontSize:25,color:"rgba(31, 31, 31, 0.53)"}} value="abcasda" editable={false} />
            </Item>
          </Form>
          <View style={styles.segments}>
            <View style={styles.switchsection}>
              <Text style={{fontSize:16,color:'#000'}}>
                Private Account
              </Text>

              <Switch thumbColor="blue" disabled={false} />
            </View>
            <Text style={styles.default}>
              Voluptate consectetur est ut et proident do ad anim in dolor quis fugiat ea sunt.
            </Text>
          </View>
         
        </View>

      );
    } else {
      return (
        <View style={StyleSheet.flatten([styles.segments,{backgroundColor:"#eff0f0",paddingLeft:35}])} >
          <Text style={styles.default}>{item.content}</Text>
        </View>
      );

    }

  }
  _renderHeader(item,expanded){
    return(
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor:'#f7f7f7',
        borderBottomWidth:1,
        borderBottomColor:"#ededed",
        shadowOffset:'groove',
        paddingLeft:30
         }}>
      <Text style={{ fontWeight: "400",opacity: 0.83,color: "rgb(31, 31, 31)",fontSize:18 }}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18,color: "rgba(31, 31, 31, 0.53)",paddingRight:10 }} name="ios-arrow-down" />
          : <Icon style={{ fontSize: 18,color: "rgba(31, 31, 31, 0.53)",paddingRight:10 }} name="ios-arrow-forward" />}
      </View>
    );
  }
  render() {
    return (
      <Container style={{backgroundColor:"#f7f7f7"}}>
        <Header style={styles.topMargin} headerStyle={{shadowOpacity:0}}>
          <Left>
            <Button
              transparent
              onPress={() => this._goBack()}>
              <Icon name="ios-arrow-back" style={{ color: "#2E5BFF", fontSize: 30, opacity: 0.8 }} light />
            </Button>
          </Left>

          <Body>
            <Title style={{ color: "#585858", fontSize: 20 }}>Settings</Title>
          </Body>

          <Right>

          </Right>
        </Header>
        <Content>
          <Accordion
            dataArray={dataArray}
            contentStyle={{ backgroundColor: '#dddddd' }}
            headerStyle={{ backgroundColor: "#f7f7f7"}}
            style={{borderTopWidth:0,}}
            expanded={0}
            icon='ios-arrow-forward'
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
          />
          <View  style={StyleSheet.flatten([styles.segments,{lineHeight:1,paddingLeft:35}])} >
            <View style={styles.switchsection}>
              <Text style={{fontSize:18,color:'#000'}}>Location Services</Text>
              <Switch thumbColor="blue" />
            </View>
            <Text style={styles.default}>
              Ut duis cupidatat elit ullamco eu elit. Ex laborum et id aliquip magna non in et. 
            </Text>
          </View>
          <Accordion
            dataArray={anotherData}
            renderHeader={this._renderHeader}
            contentStyle={{paddingLeft:35,backgroundColor:'#eff0f0'}}
          />
          <Button  style={styles.btn} block>
            <Text style={{textTransform:'capitalize',fontSize:16}}>Logout</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default connect(store => ({
  username: store.login.username
}))(Settings);