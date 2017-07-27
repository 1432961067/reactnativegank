import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Image
} from 'react-native';
import InfoHeader from './../../component/InfoHeader'
export default class PageInfo extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        // header: (
        //     <InfoHeader title='详细信息' gotourl='传送门' onBack={() => { navigation.state.params.onBack() }}></InfoHeader>
        // )
        headerTitle: '详细信息',
        headerTitleStyle: {
            alignSelf: 'center'
        },
        headerLeft: (
            <TouchableHighlight
                style={{ justifyContent: 'center', marginLeft: 10 }}
                underlayColor='#00000000'
                onPress={() => navigation.state.params.onBack()}>
                <Image source={require('./../../../img/icon_back.png')} style={{ width: 25, height: 25 }}></Image>
            </TouchableHighlight>
        ),
        headerRight: (
            <Text style={{ color: '#000', fontSize: 14, marginRight: 10 }}
                onPress={() => {
                    navigation.state.params.onWebView();
                }}
            >传送门</Text>
        ),


    });
    constructor(props) {
        super(props);
    }

    // 当我们在头部设置左右按钮时，肯定避免不了要设置按钮的单击事件，但是此时会有一个问题，
    // navigationOptions是被修饰为static类型的，所以我们在按钮的onPress的方法中不能直接通过this来
    // 调用Component中的方法。如何解决呢？在官方文档中，作者给出利用设置params的思想来动态设置头部标题。
    // 那么我们可以利用这种方式，将单击回调函数以参数的方式传递到params，
    // 然后在navigationOption中利用navigation来取出设置到onPress即可：
    componentDidMount() {
        this.props.navigation.setParams({
            onBack: this.onBack,
            onWebView: this.onWebView,
        })
    }

    onBack = () => {
        const { goBack } = this.props.navigation
        goBack();
    }


    onWebView = () => {
        const { navigate } = this.props.navigation;
        navigate('InfoWeb', {
            url: this.props.navigation.state.params.data.url,
        });
    }



    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ margin: 10 }}>
                    <Text style={{ color: '#000', fontSize: 18 }}>项目地址:</Text>
                    <Text style={{ color: '#090909', fontSize: 14 }}>{this.props.navigation.state.params.data.url}</Text>
                </View>

                <View style={{ margin: 10 }}>
                    <Text style={{ color: '#000', fontSize: 18 }}>类别:</Text>
                    <Text style={{ color: '#090909', fontSize: 14 }}>{this.props.navigation.state.params.data.type} </Text>
                </View>

                <View style={{ margin: 10 }}>
                    <Text style={{ color: '#000', fontSize: 18 }}>作者:</Text>
                    <Text style={{ color: '#090909', fontSize: 14 }}>{this.props.navigation.state.params.data.who}</Text>
                </View>

                <View style={{ margin: 10 }}>
                    <Text style={{ color: '#000', fontSize: 18 }}>描述: </Text>
                    <Text style={{ color: '#090909', fontSize: 14 }}>{this.props.navigation.state.params.data.desc}</Text>
                </View>
            </View>
        )
    }

}