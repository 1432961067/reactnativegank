import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    ActivityIndicator,
    Dimensions,
    TouchableHighlight
} from 'react-native';
// 分类数据: http://gank.io/api/data/数据类型/请求个数/第几页
// 数据类型： 福利 | Android | iOS | 休息视频 | 拓展资源 | 前端 | all
// 请求个数： 数字，大于0
// 第几页：数字，大于0
// const baseHttp='http://gank.io/api/data/Android/10/1';
const baseHttp = 'http://gank.io/api/data/前端/';
var ScreenWidth = Dimensions.get('window').width;
import ButtonType from './../../component/ButtonType'
export default class QianduanPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,//加载状态
            error: false,//网络请求的成功还是失败 (默认是失败)
            errInfo: '',//网络失败提示语
            dataArr: [],
            number: 10,
            pageIndex: 1,
        }
    }

    componentDidMount() {
        this.getAndroidData();
    }

    render() {
        if (this.state.isLoading) {
            return this.renderLoading();
        } else if (this.state.error) {
            return this.renderError();
        }
        return this.renderListView();
    };


    /**
     * 获取网络数据
     */
    getAndroidData = () => {
        let url = baseHttp + this.state.number + "/" + this.state.pageIndex
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                let data = responseData.results;
                let dataBlob = [];
                for (let i = 0; i < data.length; i++) {
                    dataBlob.push({
                        key: i,
                        values: data[i],
                    })
                }
                this.setState({
                    dataArr: dataBlob,
                    isLoading: false,
                    error: false,
                    errInfo: '获取数据成功',
                })
            })
            .catch((e) => {
                this.setState({
                    error: true,
                    errInfo: '网络错误',
                })
            })
    }

    /**
     * 加载进度框
     */
    renderLoading = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator
                    animating={true}
                    style={{ height: 80 }}
                    color='red'
                    size="large" />
            </View>
        )
    }

    /**
     * 请求数据失败
     */
    renderError = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{this.state.errInfo}</Text>
            </View>
        )
    }


    renderListView = () => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fefefe' }}>
                <FlatList
                    data={this.state.dataArr}
                    renderItem={this.renderItemView.bind(this)}
                />
            </View>
        )
    }


    //https://ws1.sinaimg.cn/large/610dc034ly1fhj5228gwdj20u00u0qv5.jpg
    //item.values.images[0]
    renderItemView = ({ item }) => {
        return (
            <TouchableHighlight underlayColor='#00000000' onPress={this.onpressItem.bind(this, 'aaa')}
                style={{ marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 10, width: ScreenWidth - 20 }}>
                <View style={{
                    width: ScreenWidth - 60, borderColor: '#e7e7e7', borderRadius: 10, borderWidth: StyleSheet.hairlineWidth
                }}>

                    <Image
                        source={{ uri: item.values.images ? item.values.images[0] : 'https://ws1.sinaimg.cn/large/610dc034ly1fhj5228gwdj20u00u0qv5.jpg' }}
                        style={{ height: 200, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}></Image>
                    <Text style={{ margin: 10, color: '#000', fontSize: 18 }} >{item.values.desc}</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 10, marginBottom: 5 }}>
                        <ButtonType url={require('./../../../img/like.png')} title='喜欢' onClick={() => {
                            this.onClick('喜欢')
                        }} />
                        <View style={{ width: 10 }} />
                        <ButtonType url={require('./../../../img/zan.png')} title='赞' onClick={() => {
                            this.onClick('赞')
                        }} />
                    </View>
                </View>

            </TouchableHighlight>
        )
    }

    onClick = (title) => {
        alert(title)
    }

    onpressItem = (url) => {
        alert(url)
    }

}