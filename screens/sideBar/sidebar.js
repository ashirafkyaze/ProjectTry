import React from "react";
import {FlatList,View} from "react-native";
import { Container, Content, Text, Footer,Item, Left,Right,Title,Header,Body,Thumbnail,Icon,Spinner } from "native-base";
const routes=[{name:'Home',icon:'home'},{name:'Bookmarks',icon:'bookmark'},{name:'Profile',icon:'person'},{name:'Settings',icon:'settings'},{name:'About',icon:'ios-information'}]
import {connect} from 'react-redux';
export class SideBar extends React.Component {
  constructor(props){
    super(props);
    this.login = this.props.login;
  }
  
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER_PROFILE" });
  }
  _keyExtractor = (item, index) => index.toString();
  render() {
    return (
      <Container>
        <Content style={{backgroundColor:'#2e5bff'}}>
          {console.log(this.props)}
          <Header transparent>
          {this.props.fetchingUserprofile?
            (
              <View
              contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Spinner color="white" />
            </View> 
            ):(
            <View>
              <Left>
            <Thumbnail small source={{ uri: this.props.login.user2.avatar }} style={{ borderRadius: 10 }} />
            </Left>
            <Body>
              <Title style={{color:"#fff"}}>
                {this.login.user2.name}             
              </Title>
            </Body>
            <Right>
              <Icon name="ios-fastforward" style={{color:"#fff"}}/>
            </Right>
            </View>
            )}
          </Header>
          
          {/* <FlatList
            dataArray={routes}
            renderItem={data => {
              return (
                <ListItem
                  button
                  {...console.log(data)}
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              ); 
            }}
          /> */}
          <FlatList
                  data={routes}
                  keyExtractor={this._keyExtractor}
                  renderItem={({ item }) => (
                    <View
                      button
                      onPress={() => this.props.navigation.navigate(item.name)}
                      style={{color:"#fff",justifyContent:"space-around",alignItems:'center',marginBottom:10}}
                    >
                      
                      <Text>
                        <Icon name={item.icon}/>
                        {item.name}
                      </Text>

                    </View>
                  )}
          />
        </Content>
        <Footer style={{flexDirection:'row'}}>
            <Item>
              <Icon
              name="ios-exit"
              />
              <Text>
                Logout
              </Text>
            </Item>
          </Footer>
      </Container>
    );
  }
}
export default connect(store=>({
  tweets: store.tweets.tweets,
  login: store.login.user2,
  fetchingUserprofile: store.login,
}))(SideBar);