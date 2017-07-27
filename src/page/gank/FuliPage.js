import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    Image,
} from 'react-native';
const baseHttp = 'http://gank.io/api/data/福利/';
var ScreenWidth = Dimensions.get('window').width;
export default class FuliPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataArr: [],
            number: 10,
            pageIndex: 1,
            isLoading: true,
        }
    }

    componentDidMount() {
        this.getFuliData();
    }





    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>正在获取数据中....</Text>
                </View>
            );
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.dataArr}
                        renderItem={this.renderItemImage}
                        ListHeaderComponent={this.headerComponent}>
                    </FlatList>
                </View>
            )
        }



    };

    renderItemImage = ({ item }) => {
        return (
            <View style={{ margin: 10 }}>
                <Image
                    source={{ uri: item.values.url }}
                    style={{ height: 200, borderRadius: 10, width: ScreenWidth - 20 }} />
            </View>
        )
    }

    getFuliData = async () => {
        let http = baseHttp + this.state.number + '/' + this.state.pageIndex
        try {
            let response = await fetch(http);
            let resopnseJson = await response.json();
            let data = resopnseJson.results;
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
            })
            console.log(this.state.dataArr)
        } catch (e) {
            console.log(e)
        }
    }


    headerComponent = () => {
        return (
            <View>
                <Text>这是头部</Text>
            </View>
        )
    }
}