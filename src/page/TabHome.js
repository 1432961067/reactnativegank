import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Image } from "react-native";
import { StackNavigator, TabNavigator } from "react-navigation";
import Gank from "./Gank";
import My from "./My";
import Recommend from "./Recommend";
import PageInfo from "./../page/gank/PageInfo";
import InfoWeb from "./InfoWeb";
import VideoPlay from "./VideoPlay";
import About from "./About";

const MyTab = TabNavigator(
  {
    Gank: {
      screen: Gank,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Gank", // 只会设置导航栏文字,
        tabBarLabel: "Gank",
        headerStyle: {
          backgroundColor: "#fff"
        }, // 设置导航条的样式。如果想去掉安卓导航条底部阴影可以添加elevation: 0,iOS去掉阴影是。
        tabBarVisible: true, // 是否隐藏标签栏。默认不隐藏(true)
        tabBarIcon: ({ tintColor }) =>
          <Image
            source={require("./../../img/gank.png")}
            style={[styles.icon, { tintColor: tintColor }]}
          />
      })
    },
    Recommend: {
      screen: Recommend,
      navigationOptions: {
        headerTitle: "推荐APP", // 只会设置导航栏文字,
        tabBarLabel: "推荐APP",
        headerStyle: {
          backgroundColor: "#4ECBFC"
        }, // 设置导航条的样式。如果想去掉安卓导航条底部阴影可以添加elevation: 0,iOS去掉阴影是。
        tabBarVisible: true, // 是否隐藏标签栏。默认不隐藏(true)
        tabBarIcon: ({ tintColor }) =>
          <Image
            source={require("./../../img/recommend.png")}
            style={[styles.icon, { tintColor: tintColor }]}
          />
      }
    },
    My: {
      screen: My,
      navigationOptions: {
        headerTitle: "我的", // 只会设置导航栏文字,
        tabBarLabel: "我的",
        headerStyle: {
          backgroundColor: "#FF83FA"
        }, // 设置导航条的样式。如果想去掉安卓导航条底部阴影可以添加elevation: 0,iOS去掉阴影是。
        tabBarVisible: true, // 是否隐藏标签栏。默认不隐藏(true)
        tabBarIcon: ({ tintColor }) =>
          <Image
            source={require("./../../img/my.png")}
            style={[styles.icon, { tintColor: tintColor }]}
          />
      }
    }
  },
  {
    tabBarPosition: "bottom", // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom'
    swipeEnabled: false, // 是否允许在标签之间进行滑动。
    animationEnabled: false, // 是否在更改标签时显示动画。
    lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
    tabBarOptions: {
      activeTintColor: "#c91f35", // 文字和图片选中颜色
      inactiveTintColor: "#6b6b6b", // 文字和图片未选中颜色
      showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
      indicatorStyle: {
        height: 0
      },
      style: {
        backgroundColor: "#fff", // TabBar 背景色
        height: 60
      },
      labelStyle: {
        fontSize: 13 // 文字大小
      },
      showLabel: true
    }
  }
);

const MyApp = StackNavigator({
  MyTab: {
    screen: MyTab
  },
  PageInfo: {
    screen: PageInfo
  },
  InfoWeb: {
    screen: InfoWeb
  },
  VideoPlay: {
    screen: VideoPlay
  },
  About: {
    screen: About,
    navigationOptions: {
      headerTitle: "关于",
      headerBackTitle: null
    }
  }
});

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22
  }
});

export default MyApp;
