import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight
} from 'react-native';
export default class ButtonType extends Component {
    constructor(props) {
        super(props);
    }
    //this.props.url
    render() {
        return (
            <TouchableHighlight underlayColor='#fefefe' onPress={this.props.onClick}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={this.props.url} style={{ width: 20, height: 20 }} />
                    <Text style={{ marginLeft: 3, fontSize: 12, color: '#6d6d6d' }}>{this.props.title}</Text>
                </View>
            </TouchableHighlight>
        )
    }

}

