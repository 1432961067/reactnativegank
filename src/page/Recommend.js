import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ProgressBarAndroid,
  Slider,
  Image,
  TouchableOpacity
} from "react-native";
export default class Recommend extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  render() {
    return (
      <View>
        <Text>这是推荐APP页面</Text>
        <ProgressBarAndroid
          color="green"
          styleAttr="Horizontal"
          progress={0.8}
          indeterminate={false}
          style={{ marginTop: 10 }}
        />

        <Slider
          style={{ height: 10 }}
          minimumValue={5}
          maximumValue={20}
          maximumTrackTintColor="#8B4C39"
          minimumTrackTintColor="#CD919E"
          onValueChange={value => {
            this.setState({ value: value });
          }}
          onSlidingComplete={value => {
            this.setState({ value: value });
          }}
        />
        <Slider step={0.2} style={{ marginTop: 10 }} />
        <TouchableOpacity
        onPress={
          ()=>{
            alert(123)
          }
        }>
        <Image
          style={{ width: 25, height: 25, margin: 5 }}
          source={require("./../../img/icon_small_play.png")}
        />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
