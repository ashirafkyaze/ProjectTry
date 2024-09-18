import React from "react"
import { Animated, TouchableOpacity, Dimensions, StyleSheet,Text,View,PanResponder } from "react-native"
import {
    Container,
    Header,
    Body,
   
  } from "native-base";
  import {connect} from 'react-redux';
// import * as Icon from "@expo/vector-icons"

const screenHeight = Dimensions.get("window").height

class MapModal extends React.Component {
    state = {
        top: new Animated.Value(screenHeight),
        prevprops:this.props.openModal
    }
    componentDidUpdate() {
        this.toggleModal()
    }

    toggleModal = () => {
        console.log('reached here '+ this.props);
        if (this.props.openModal) {
            Animated.spring(this.state.top, {
                toValue: 174
            }).start()
        }
        if (this.props.closeModal) {
            Animated.spring(this.state.top, {
                toValue: screenHeight
            }).start()
        }
    }
closeModal = () =>{
    this.props.dispatch({type:'MODAL_CLOSE'});
}
    render() {
        return (
            <AnimatedContainer style={StyleSheet.flatten([styles.Container,{ top: this.state.top }])}>
                <Header style={styles.Header}/>
                <TouchableOpacity
                    onPress={this.closeModal.bind(this)}
                    style={{ position: "absolute", top: 120, left: "50%", marginLeft: -22, zIndex: 1 }}
                >
                    <View style={styles.CloseView}>
                        {/* <Icon.Ionicons name='ios-close' size={44} color='blue' /> */}
                        <Text>
                            X
                        </Text>
                    </View>
                </TouchableOpacity>
                <Body style={styles.Body} />
            </AnimatedContainer>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        position: "absolute",
        backgroundColor: "black",
        width:'100%',
        height:"100%",
        elevation: 10,
        zIndex:999
    },

    Header : {
        backgroundColor: "#333",
        height: 150,
    },
    Body :{
        backgroundColor: "#eaeaea",
        height:100
    },
    CloseView:{
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        elevation:10
    }

});

const AnimatedContainer = Animated.createAnimatedComponent(Container)

export default connect(store=>({
openModal:store.modal.openModal,
closeModal: store.modal.closeModal
}))(MapModal);