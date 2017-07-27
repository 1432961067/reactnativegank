import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import AndroidPage from './gank/AndroidPage';
import IosPage from './gank/IosPage';
import FuliPage from './gank/FuliPage';
import QianduanPage from './gank/QianduanPage';
import VideoPage from './gank/VideoPage';
var ScreenWidth = Dimensions.get('window').width;
export default class Gank extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        const { navigate } = this.props.navigation;
        this.state = {
            navigate: navigate,
        }
    }


    // _onScroll=(e)=>{

    // }
    // _onChangeTab=(i)=>{
    //     alert("点击了:"+i);
    // }

    //  onScroll={(e) => this._onScroll(e)}
    //             onChangeTab={(i) => this._onChangeTab(i)} 
    render() {
        return (
            <ScrollableTabView
                style={styles.container}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar />}
                tabBarUnderlineStyle={styles.lineStyle}
                tabBarActiveTextColor='#c91f35'
                onChangeTab={(obj) => {
                    //alert("点击了:"+obj.i);
                }}
                onScroll={
                    (position) => {

                    }
                }
            >

                <AndroidPage style={styles.textStyle} tabLabel='Android' navigate={this.state.navigate} />
                <IosPage style={styles.textStyle} tabLabel='Ios' navigate={this.state.navigate} />
                <QianduanPage style={styles.textStyle} tabLabel='前端' navigate={this.state.navigate} />
                <FuliPage style={styles.textStyle} tabLabel='福利' navigate={this.state.navigate} />
                <VideoPage style={styles.textStyle} tabLabel='视频' navigate={this.state.navigate} />
            </ScrollableTabView>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  marginTop: 20
    },
    lineStyle: {
        width: ScreenWidth / 5,
        height: 2,
        backgroundColor: '#FF0000',
    },
    textStyle: {
        flex: 1,
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
    },
})