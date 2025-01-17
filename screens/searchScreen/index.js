import React, { Component } from 'react';
import MapModal from '../modal';
import { StyleSheet, Text, View, Animated, Image, Dimensions, Platform, TouchableOpacity ,Easing} from "react-native";
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
// import { Components } from 'expo';
import Constants from 'expo-constants';
// import Swipeable from 'react-native-gesture-handler/Swipeable'
import MapView, { PROVIDER_GOOGLE, AnimatedRegion } from 'react-native-maps';
// const MapView = Components.MapView;
import { connect } from "react-redux";
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import store from '../../store';
const Images = [
    { uri: "https://i.imgur.com/sNam9iJ.jpg" },
    { uri: "https://i.imgur.com/N7rlQYt.jpg" },
    { uri: "https://i.imgur.com/UDrH0wm.jpg" },
    { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT;

export class MapScreen extends Component {
    state = {
        top: new Animated.Value(0),
        markers: [
            {
                coordinate: {
                    latitude: 45.524548,
                    longitude: -122.6749817,
                },
                title: "Best Place",
                description: "This is the best place in Portland",
                image: Images[0],
            },
            {
                coordinate: {
                    latitude: 45.524698,
                    longitude: -122.6655507,
                },
                title: "Second Best Place",
                description: "This is the second best place in Portland",
                image: Images[1],
            },
            {
                coordinate: {
                    latitude: 45.5230786,
                    longitude: -122.6701034,
                },
                title: "Restaurant K",
                description: "This is the third best place in Portland",
                image: Images[2],
            },
            {
                coordinate: {
                    latitude: 45.521016,
                    longitude: -122.6561917,
                },
                title: "Fourth Best Place",
                description: "This is the fourth best place in Portland",
                image: Images[3],
            },
        ],
        region: {
            latitude: 45.52220671242907,
            longitude: -122.6653281029795,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
        },
        scale: new Animated.Value(1),
        opacity: new Animated.Value(1)
    };
    _goBack() {
        console.log("Back button pressed");
        this.props.navigation.goBack();
    }
    // componentDidUpdate() {
    //     this.toggleModal()
    // }
    toggleModal = () => {
       this.props.dispatch({type:'MODAL_OPEN'})
    }
    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
    }
    componentDidMount() {
        // We should detect when scrolling has stopped then animate
        // We should just debounce the event listener here
        this.animation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= this.state.markers.length) {
                index = this.state.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const { coordinate } = this.state.markers[index];
                    this.map.animateToRegion(
                        {
                            ...coordinate,
                            latitudeDelta: this.state.region.latitudeDelta,
                            longitudeDelta: this.state.region.longitudeDelta,
                        },
                        350
                    );
                }
            }, 10);
        });
    }
    // modalToggle(){
    //     this.props.dispatch({type: 'MODAL_CLOSE'});
    // }
    render() {
        const interpolations = this.state.markers.map((marker, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            return { scale, opacity };
        });

        return (
            <View style={styles.container}>
                <MapModal/>
                <Header
                    style={styles.topMargin}
                >
                    <Left>
                        <Button
                            transparent
                            onPress={this._goBack.bind(this)}>
                            <Icon name="ios-apps" style={{ color: "#2E5BFF", fontSize: 30, opacity: 0.8 }} light />
                        </Button>
                    </Left>

                    <Body>
                        <Title style={{ color: "#585858", fontSize: 20, textAlign: 'left' }}>Search</Title>
                    </Body>
                    <Right>
                        <Button transparent iconRight light>

                        </Button>
                    </Right>
                </Header>
                <MapView
                    ref={map => this.map = map}
                    initialRegion={this.state.region}
                    showsUserLocation
                    showsMyLocationButton
                    showsCompass
                    style={styles.container}
                >
                    {this.state.markers.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };
                        const opacityStyle = {
                            opacity: interpolations[index].opacity,
                        };
                        return (
                            <MapView.Marker key={index} coordinate={marker.coordinate}>
                                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <Animated.View style={[styles.ring, scaleStyle]} />
                                    <View style={styles.marker} />
                                </Animated.View>
                            </MapView.Marker>
                        );
                    })}
                </MapView>
                <Animated.ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: this.animation,
                                    },
                                },
                            },
                        ],
                        { useNativeDriver: true }
                    )}
                    style={styles.scrollView}
                    contentContainerStyle={styles.endPadding}
                >
                    {this.state.markers.map((marker, index) => (
                             <TouchableOpacity 
                                 onPress={this.toggleModal.bind(this)}
                                 key={index}
                                 style={styles.card}
                             >
                                <Image
                                    source={marker.image}
                                    style={styles.cardImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.textContent}>
                                    <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                                    <Text numberOfLines={1} style={styles.cardDescription}>
                                        {marker.description}
                                    </Text>
                                </View>
                        </TouchableOpacity>
                        
                       

                    ))}
                </Animated.ScrollView>
            </View >
        );
    }
}

// const AnimatedContainer = Animated.createAnimatedComponent(Container);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        elevation: 0
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        borderRadius: 10,
        overflow: "hidden",
    },
    topMargin: {
        marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        backgroundColor: "#F7F7F7",
        // zIndex: 10,
        elevation: 0
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
    },
});
export default connect(store => ({
    openModal:store.modal.openModal,
    closeModal:store.modal.closeModal
}))(MapScreen);