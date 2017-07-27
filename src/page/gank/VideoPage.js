import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ProgressBarAndroid,
  ActivityIndicator,
  Slider
} from "react-native";
import VideoView from "./../../component/VideoView";
let ScreenWidth = Dimensions.get("window").width;
//http://qiubai-video.qiushibaike.com/A14EXG7JQ53PYURP.mp4
//http://7xqtik.com1.z0.glb.clouddn.com/Sugar.mp4
export default class VideoPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          onPress={() => {
            this.props.navigate("VideoPlay");
          }}
        >
          进入视频播放
        </Text>
      </View>
    );
  }
}
