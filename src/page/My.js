import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import MyListView from './../component/ListView'
export default class My extends Component {
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>原生listview</Text>
                <MyListView style={{
                    width: Dimensions.get('window').width,
                    height: Dimensions.get('window').height,
                }}
                    array={['11111', '2222', '3333', '44444', '测试', "java", "Visual Basic .NET", "JavaScript", "Assembly Language", "Ruby", "Perl"
                        , "Delphi", "Visual Basic", "Swift", "MATLAB", "Pascal"]}

                    onItemClickListener={
                        //this._onItemClickListene
                        {/* alert(1) */}
                    }
                >
                </MyListView>
            </View>
        );
    }
    _onItemClickListener = (content) => {
        alert(content)
    }
}