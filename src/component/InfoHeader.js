import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
} from 'react-native';
export default class InfoHeader extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={{ height: 50, flexDirection: 'row', backgroundColor: '#fff' }}>
                <TouchableHighlight
                    style={{ justifyContent: 'center', marginLeft: 10 }}
                    underlayColor='#00000000'
                    onPress={() => this.props.onBack()}>
                    <Image source={require('./../../img/icon_back.png')} style={{ width: 25, height: 25 }}></Image>
                </TouchableHighlight>

                <View style={{ justifyContent: 'center', marginLeft: 20 }}>
                    <Text style={{ color: '#000', fontSize: 18 }}>{this.props.title}</Text>
                </View>
                <View style={{ position: 'absolute', right: 10, top: 20 }}>
                    <Text style={{ color: '#000', fontSize: 14 }}>{this.props.gotourl}</Text>
                </View>
            </View>
        )
    }


}