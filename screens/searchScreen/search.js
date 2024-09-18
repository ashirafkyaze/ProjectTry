// import React, { Component } from "react";
// import { Container, Header, Content, Accordion } from "native-base";
// const dataArray = [
//   { title: "First Element", content: "Lorem ipsum dolor sit amet" },
//   { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
//   { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
// ];
// export default class AccordionExample extends Component {
//   render() {
//     return (
//       <Container>
//         <Header />
//         <Content padder>
//           <Accordion dataArray={dataArray} expanded={0}/>
//         </Content>
//       </Container>
//     );
//   }
// }

/*This is an Example of React Native Map*/
import React, {Component} from 'react';
import { StyleSheet, Text, View,Dimensions,Animated } from 'react-native';
import MapView, { PROVIDER_GOOGLE,AnimatedRegion } from 'react-native-maps';
 
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Search extends Component {
  constructor(){
    super();

    this.state = {
      region:{
        latitude:LATITUDE,
        longitude:LONGITUDE,
        latitudeDelta:LATITUDE_DELTA,
        longitudeDelta:LONGITUDE_DELTA
      }
    };
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position=>{
        this.setState({
          region:{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
        });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
         <MapView
        provider={ PROVIDER_GOOGLE }
        style={ styles.mapContainer }
        showsUserLocation={ true }
        region={ this.state.region }
        onRegionChange={ region => this.setState({region}) }
        onRegionChangeComplete={ region => this.setState({region}) }
      >
        <MapView.Marker
          coordinate={ this.state.region }
        />
      </MapView>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    position:'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
  mapContainer:{
    height: '100%',
    width: '100%',
  }
});