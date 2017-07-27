package com.demo1;

import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.os.Handler;
import android.util.Log;
import android.widget.VideoView;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.BaseViewManager;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by Helen on 2016/9/19.
 */
public class VideoViewManager extends SimpleViewManager<ReactVideoView> {

    private static final int COMMAND_PLAY_ID = 0;
    private static final String COMMAND_PLAY_NAME = "play";
    private static final int COMMAND_PAUSE_ID = 1;
    private static final String COMMAND_PAUSE_NAME = "pause";

    @Override
    public String getName() {
        return "VideoView";
    }

    @Override
    protected ReactVideoView createViewInstance(ThemedReactContext reactContext) {
        ReactVideoView video = new ReactVideoView(reactContext);
        return video;
    }

    //控制js--> native 消息
    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
//        return super.getCommandsMap();
        return MapBuilder.of(
                COMMAND_PLAY_NAME, COMMAND_PLAY_ID,
                COMMAND_PAUSE_NAME, COMMAND_PAUSE_ID
        );
    }

    @Override
    public void receiveCommand(ReactVideoView root, int commandId, @Nullable ReadableArray args) {
        super.receiveCommand(root, commandId, args);
        switch (commandId) {
            case COMMAND_PLAY_ID://播放
                //root.start();
                root.myPlay();
                Log.e("TAG","播放开始");
                break;
            case COMMAND_PAUSE_ID://暂停
                //root.pause();
                root.myPause();
                break;
            default:
                break;
        }
    }


    public void start(){

    }


    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
//        return super.getExportedCustomDirectEventTypeConstants();
        MapBuilder.Builder builder = MapBuilder.builder();
        for (ReactVideoView.Event e : ReactVideoView.Event.values()) {
            builder.put(e.toString(), MapBuilder.of("registrationName", e.toString()));
        }
        return builder.build();
    }

    @Override
    public void onDropViewInstance(ReactVideoView view) {//销毁对象时释放一些资源
        super.onDropViewInstance(view);
        view.destroy();
        ((ThemedReactContext) view.getContext()).removeLifecycleEventListener((ReactVideoView) view);
    }


    @ReactProp(name = "path")
    public void setVideoPath(VideoView view, String path) {
        if (view != null && path != null && !path.equals("")) {
            view.setVideoPath(path);
//            view.start();
        }
    }


//    @ReactProp(name = "source")
//    public void setSource(VideoView videoView,@Nullable ReadableMap source){
//        if(source != null){
//            if (source.hasKey("url")) {
//                String url = source.getString("url");
//                FLog.e(VideoViewManager.class,"url = "+url);
//                HashMap<String, String> headerMap = new HashMap<>();
//                if (source.hasKey("headers")) {
//                    ReadableMap headers = source.getMap("headers");
//                    ReadableMapKeySetIterator iter = headers.keySetIterator();
//                    while (iter.hasNextKey()) {
//                        String key = iter.nextKey();
//                        String value = headers.getString(key);
//                        FLog.e(VideoViewManager.class,key+" = "+value);
//                        headerMap.put(key,value);
//                    }
//                }
//                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
//                    videoView.setVideoURI(Uri.parse(url),headerMap);
//                }else{
//                    try {
//                        Method setVideoURIMethod = videoView.getClass().getMethod("setVideoURI", Uri.class, Map.class);
//                        setVideoURIMethod.invoke(videoView, Uri.parse(url), headerMap);
//                    } catch (Exception e) {
//                        e.printStackTrace();
//                    }
//                }
//                videoView.start();
//            }
//        }
//    }


}
