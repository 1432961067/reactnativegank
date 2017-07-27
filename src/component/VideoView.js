import React, { PropTypes, Component } from 'react';
import {
    requireNativeComponent,
    View,
    UIManager,
    findNodeHandle
} from 'react-native';
// var VideoView = {
//     name:'VideoView',
//     propTypes:{
//         path:PropTypes.string,
//         ...View.propTypes,//包含默认的View的属性，如果没有这句会报‘has no propType for native prop’错误
//     }
// };
// var VideoView = requireNativeComponent('VideoView',VideoView);
// module.exports = VideoView;
let RCT_VIDEO_REF = 'VideoView';
class VideoView extends Component {
    constructor(props) {
        super(props)
    }

    _video_rendeing_start = () => {
        if (!this.props.video_rendeing_start) {
            return
        }
        this.props.video_rendeing_start();
    }

    _video_buffering_start = () => {
        if (!this.props.video_buffering_start) {
            return
        }
        this.props.video_buffering_start();
    }
    _video_buffering_end = () => {
        if (!this.props.video_buffering_end) {
            return
        }
        this.props.video_buffering_end();
    }

    _video_onPrepared = (event) => {
        if (!this.props.video_onPrepared) {
            return
        }
        this.props.video_onPrepared(event.nativeEvent.duration);
    }
    _video_onCompletion = () => {
        if (!this.props.video_onCompletion) {
            return
        }
        this.props.video_onCompletion();
    }
    _video_onError = (event) => {
        if (!this.props.video_onError) {
            return
        }
        this.props.video_onError(event.nativeEvent)
    }
    _video_pro_time=(msg)=>{
        if(!this.props.video_pro_time){
            return
        }
        this.props.video_pro_time(msg.nativeEvent)
    }

    pause = () => {
        //向native层发送命令
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.refs[RCT_VIDEO_REF]),
            UIManager.VideoView.Commands.pause,//Commands.pause与native层定义的COMMAND_PAUSE_NAME一致
            null//命令携带的参数数据
        );
    }

    play = () => {
        //向native层发送命令
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.refs[RCT_VIDEO_REF]),
            UIManager.VideoView.Commands.play,//Commands.pause与native层定义的COMMAND_PAUSE_NAME一致
            null//命令携带的参数数据
        );
    }

    render() {
        return (
            <RCTVideoView
                {...this.props}
                ref={RCT_VIDEO_REF}
                video_rendeing_start={this._video_rendeing_start}
                video_buffering_start={this._video_buffering_start}
                video_buffering_end={this._video_buffering_end}
                video_onPrepared={this._video_onPrepared}
                video_onCompletion={this._video_onCompletion}
                video_onError={this._video_onError}
                video_pro_time={this._video_pro_time}
            />
        )
    }

}

VideoView.name = 'VideoView'
VideoView.propTypes = {
    video_rendeing_start: PropTypes.func,
    video_buffering_start: PropTypes.func,
    video_buffering_end: PropTypes.func,
    video_onPrepared: PropTypes.func,
    video_onCompletion: PropTypes.func,
    video_onError: PropTypes.func,
    video_pro_time:PropTypes.func,
    style: View.propTypes.style,
    path: PropTypes.string,
    ...View.propTypes,//包含默认的View的属性，如果没有这句会报‘has no propType for native prop’错误
}

var RCTVideoView = requireNativeComponent("VideoView", VideoView, {
    nativeOnly: { onChange: true }
});
module.exports = VideoView

