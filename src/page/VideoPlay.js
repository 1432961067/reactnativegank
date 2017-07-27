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
  Slider,
  TouchableHighlight
} from "react-native";
import VideoView from "./../component/VideoView";
let ScreenWidth = Dimensions.get("window").width;

//tips:最好在视频上面覆盖一张图片，不然看到的画面是 播放按钮下面是一片黑的。

//http://qiubai-video.qiushibaike.com/A14EXG7JQ53PYURP.mp4
//http://7xqtik.com1.z0.glb.clouddn.com/Sugar.mp4
export default class VideoPlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play_show: false, //播放按钮显示或者隐藏 false为显示，true为隐藏
      progress_show: false,
      status: false, //播放状态 false为未播放，true为播放
      total_Time: "00:00",
      start_Time: "00:00"
    };
  }

  static navigationOptions = ({ navigation, screenProps }) => ({
    // header: (
    //     <InfoHeader title='详细信息' gotourl='传送门' onBack={() => { navigation.state.params.onBack() }}></InfoHeader>
    // )
    headerTitle: "视频播放",
    headerTitleStyle: {
      alignSelf: "center"
    },
    headerLeft: (
      <TouchableHighlight
        style={{ justifyContent: "center", marginLeft: 10 }}
        underlayColor="#00000000"
        onPress={() => navigation.state.params.onBack()}
      >
        <Image
          source={require("./../../img/icon_back.png")}
          style={{ width: 25, height: 25 }}
        />
      </TouchableHighlight>
    )
  });
  componentDidMount() {
    this.props.navigation.setParams({
      onBack: this.onBack
    });
  }

  onBack = () => {
    const { goBack } = this.props.navigation;
    goBack();
  };

  _pause = () => {
    this.video.pause();
    this.setState({
      status: false
    });
  };
  _start = () => {
    this.video.play();
    this.setState({
      play_show: true,
      progress_show: true,
      status: true
    });
  };

  _smallButtonCliclk = () => {
    if (this.state.status) {
      //播放
      this._pause();
      this.setState({
        play_show: false
      });
    } else {
      this._start();
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>视频页面数据</Text>
        <View style={{ height: 250, width: ScreenWidth }}>
          <VideoView
            ref={video => {
              this.video = video;
            }}
            style={{ height: 250, width: ScreenWidth }}
            path="http://7xqtik.com1.z0.glb.clouddn.com/11900.mp4"
            video_rendeing_start={() => {
              console.log("video_rendeing_start");
              this.setState({
                progress_show: false
              });
            }}
            video_buffering_start={() => {
              console.log("video_buffering_start");
              this.setState({
                progress_show: true
              });
            }}
            video_buffering_end={() => {
              console.log("video_buffering_end");
              this.setState({
                progress_show: false
              });
            }}
            video_onPrepared={e => {
              console.log("video_onPrepared" + " 时长: " + e);
              this.setState({
                total_Time: e
              });
            }}
            video_onCompletion={() => {
              this.setState({
                play_show: false
              });
            }}
            video_onError={e => {
              console.log(
                "video_onError" + " 错误what:" + e.what + " 错误extra:" + e.extra
              );
            }}
            video_pro_time={msg => {
              console.log("video_pro_time" + " 变化时间:" + msg.changeTime);
              this.setState({
                start_Time: msg.changeTime
              });
            }}
          />

          {
            //视频时间 播放 暂停组件
            <View
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: ScreenWidth,
                backgroundColor: "#59000000",
                flexDirection: "row"
              }}
            >
              {this.state.status
                ? <TouchableOpacity
                    onPress={() => {
                      this._smallButtonCliclk();
                    }}
                  >
                    <Image
                      style={{ width: 25, height: 25, margin: 5 }}
                      source={require("./../../img/icon_small_pause.png")}
                    />
                  </TouchableOpacity>
                : <TouchableOpacity
                    onPress={() => {
                      this._smallButtonCliclk();
                    }}
                  >
                    <Image
                      style={{ width: 25, height: 25, margin: 5 }}
                      source={require("./../../img/icon_small_play.png")}
                    />
                  </TouchableOpacity>}

              <View style={{ justifyContent: "center" }}>
                <Text style={{ marginLeft: 5, color: "#fff" }}>
                  {this.state.start_Time}
                </Text>
              </View>
              <View style={{ justifyContent: "center", flex: 1 }}>
                <Slider
                  minimumValue={5}
                  maximumValue={20}
                  maximumTrackTintColor="#8B4C39"
                  minimumTrackTintColor="#CD919E"
                />
              </View>
              <View style={{ justifyContent: "center" }}>
                <Text style={{ marginLeft: 5, marginRight: 5, color: "#fff" }}>
                  {this.state.total_Time}
                </Text>
              </View>
            </View>
          }

          {//视频加载进度显示
          this.state.progress_show
            ? <View
                style={{
                  position: "absolute",
                  left: ScreenWidth / 2 - 25,
                  top: 250 / 2 - 25,
                  width: ScreenWidth,
                  backgroundColor: "#59000000",
                  flexDirection: "row"
                }}
              >
                <ActivityIndicator
                  style={{ width: 50, height: 50 }}
                  size="large"
                  color="red"
                />
              </View>
            : null}

          {//视频播放组件
          !this.state.play_show
            ? <View
                style={{
                  position: "absolute",
                  left: ScreenWidth / 2 - 40,
                  top: 250 / 2 - 40
                }}
              >
                <TouchableOpacity onPress={this._start}>
                  <Image
                    style={{ width: 80, height: 80 }}
                    source={require("./../../img/icon_topic_start_normal.png")}
                  />
                </TouchableOpacity>
              </View>
            : null}
        </View>
      </View>
    );
  }
}
