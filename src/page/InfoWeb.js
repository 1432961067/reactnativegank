import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    WebView,
    TouchableHighlight,
    Image
} from 'react-native';
export default class InfoWeb extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions =({ navigation, screenProps }) => ({
        // header: (
        //     <InfoHeader title='详细信息' gotourl='传送门' onBack={() => { navigation.state.params.onBack() }}></InfoHeader>
        // )
        headerTitle: '项目主页',
        headerTitleStyle: {
            alignSelf: 'center'
        },
        headerLeft: (
            <TouchableHighlight
                style={{ justifyContent: 'center', marginLeft: 10 }}
                underlayColor='#00000000'
                onPress={() => navigation.state.params.onBack()}>
                <Image source={require('./../../img/icon_back.png')} style={{ width: 25, height: 25 }}></Image>
            </TouchableHighlight>
        ),
    });


    componentDidMount() {
        this.props.navigation.setParams({
            onBack: this.onBack,
        })
    }


    onBack = () => {
        const { goBack } = this.props.navigation
        goBack();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {
                    console.log(this.props.navigation.state.params.url)
                }
                <WebView
                    source={{ uri: this.props.navigation.state.params.url }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true} />
            </View>
        )
    }


}