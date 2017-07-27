package com.demo1;

import android.app.Activity;
import android.util.ArrayMap;
import android.view.ViewGroup;
import android.view.ViewParent;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactRootView;

import java.util.HashMap;
import java.util.Map;

import okhttp3.Cache;

/**
 * Created by Administrator on 2017/7/26.
 */

public class ReactNativePreLoader {
    private static final Map<String, ReactRootView> CACHE = new ArrayMap<>();

    /**
     * 初始化ReactRootView并添加到缓存中
     *
     * @param activity
     * @param componentName
     */
    public static void preLoad(Activity activity, String componentName) {
        if (CACHE.get(componentName) != null) {
            return;
        }

        ReactRootView rootView = new ReactRootView(activity);
        rootView.startReactApplication(((ReactApplication) activity.getApplication()).getReactNativeHost().getReactInstanceManager(), componentName, null);
        CACHE.put(componentName, rootView);
    }


    public static ReactRootView getReactRootView(String componentName) {
        return CACHE.get(componentName);
    }
    public static void deatchView(String componentName){
        try{
            ReactRootView rootView=getReactRootView(componentName);
            ViewGroup mViewGroup= (ViewGroup) rootView.getParent();
            if(mViewGroup!=null){
                mViewGroup.removeView(rootView);
            }
        }catch (Exception e){

        }
    }
}
