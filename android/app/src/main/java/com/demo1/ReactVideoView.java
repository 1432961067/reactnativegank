package com.demo1;

import android.annotation.TargetApi;
import android.content.Context;
import android.media.MediaPlayer;
import android.os.Build;
import android.os.Handler;
import android.os.Message;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;
import android.widget.VideoView;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by Administrator on 2017/7/24.
 */

public class ReactVideoView extends VideoView implements LifecycleEventListener, MediaPlayer.OnPreparedListener, MediaPlayer.OnInfoListener, MediaPlayer.OnCompletionListener, MediaPlayer.OnErrorListener {
    private Context mContext;
    private ThemedReactContext mThemedReactContext;
    private RCTEventEmitter mRCTEventEmitter;

    private boolean videor_Rendering = false;
    // 播放状态 0:空闲,1:停止，2:播放，3：暂停,4 错误
    private enum VIDEO_STATE {
        IDLE, STOP, PLAYING, PAUSED, ERROR
    }

    private VIDEO_STATE videoState = VIDEO_STATE.IDLE;



    public enum Event {
        EVENT_RENDERING_START("video_rendeing_start"),
        EVENT_BUFFERING_START("video_buffering_start"),
        EVENT_BUFFERING_END("video_buffering_end"),
        EVENT_ONPREPARED("video_onPrepared"),
        EVENT_ONCOMPLETION("video_onCompletion"),
        EVENT_ONERROR("video_onError"),
        EVENT_PROGRESSANDCHANGETIME("video_pro_time");
        private String mName;

        Event(String name) {
            mName = name;
        }

        @Override
        public String toString() {
            return mName;
        }
    }


    private Handler handler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            super.handleMessage(msg);
            switch (msg.what) {
                case 0:
                    if (videor_Rendering && videoState == VIDEO_STATE.PLAYING) {
                        String time = Utils.formatTime(getCurrentPosition());
                        Log.e("TAG", "时间：" + time);
                        WritableMap wm = Arguments.createMap();
                        wm.putString("changeTime", time);
                        mRCTEventEmitter.receiveEvent(getId(), Event.EVENT_PROGRESSANDCHANGETIME.toString(), wm);
                        handler.sendEmptyMessageDelayed(0,1000);
                    }
                    break;
            }
        }
    };


    public ReactVideoView(ThemedReactContext themedReactContext) {
        super(themedReactContext);
        this.mContext = themedReactContext;
        mThemedReactContext = themedReactContext;
        mRCTEventEmitter = themedReactContext.getJSModule(RCTEventEmitter.class);
        themedReactContext.addLifecycleEventListener(this);
        videoState = VIDEO_STATE.IDLE;
        setOnPreparedListener(this);
        setOnInfoListener(this);
        setOnCompletionListener(this);
        setOnErrorListener(this);
    }

    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {
        handler.removeMessages(0);
    }

    @Override
    public void onHostDestroy() {
        handler.removeMessages(0);
        //mThemedReactContext.removeLifecycleEventListener(this);
    }

//    @Override
//    public void seekTo(int msec) {
//        super.seekTo(msec);
//    }

    public void myPlay() {
        start();
        videoState = VIDEO_STATE.PLAYING;
    }

    public void myPause() {
        pause();
        videoState = VIDEO_STATE.PAUSED;
    }


    @Override
    public void onPrepared(MediaPlayer mp) {
        int duration = mp.getDuration();//获取视频时长
        WritableMap wm = Arguments.createMap();
        wm.putString("duration", Utils.formatTime(duration));
        mRCTEventEmitter.receiveEvent(getId(), Event.EVENT_ONPREPARED.toString(), wm);
    }

    @Override
    public boolean onInfo(MediaPlayer mp, int what, int extra) {
        switch (what) {
            case MediaPlayer.MEDIA_INFO_VIDEO_RENDERING_START://视频图像开始渲染
                videor_Rendering = true;
                handler.sendEmptyMessage(0);
                mRCTEventEmitter.receiveEvent(getId(), Event.EVENT_RENDERING_START.toString(), Arguments.createMap());
                break;
            case MediaPlayer.MEDIA_INFO_BUFFERING_START://缓冲开始
                videor_Rendering = false;
                handler.removeMessages(0);
                mRCTEventEmitter.receiveEvent(getId(), Event.EVENT_BUFFERING_START.toString(), Arguments.createMap());
                break;
            case MediaPlayer.MEDIA_INFO_BUFFERING_END://缓存结束
                mRCTEventEmitter.receiveEvent(getId(), Event.EVENT_BUFFERING_END.toString(), Arguments.createMap());
                break;
        }
        return false;
    }

    @Override
    public void onCompletion(MediaPlayer mp) {
        mRCTEventEmitter.receiveEvent(getId(), Event.EVENT_ONCOMPLETION.toString(), Arguments.createMap());
    }

    @Override
    public boolean onError(MediaPlayer mp, int what, int extra) {
        WritableMap wm = Arguments.createMap();
        wm.putInt("what", what);
        wm.putInt("extra", extra);
        mRCTEventEmitter.receiveEvent(getId(), Event.EVENT_ONERROR.toString(), wm);
        return true;
    }


    public void destroy() {
        stopPlayback();
    }
}
