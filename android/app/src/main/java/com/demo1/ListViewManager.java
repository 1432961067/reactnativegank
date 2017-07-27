package com.demo1;

import android.content.Context;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.Toast;

import com.baoyz.swipemenulistview.SwipeMenu;
import com.baoyz.swipemenulistview.SwipeMenuCreator;
import com.baoyz.swipemenulistview.SwipeMenuItem;
import com.baoyz.swipemenulistview.SwipeMenuListView;
import com.baoyz.swipemenulistview.SwipeMenuView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017/7/20.
 */

public class ListViewManager extends SimpleViewManager<ListView> {

    private MyAdapter adapter;
    private List<String> dataSource;
    private Context mContext;

    @Override
    public String getName() {
        return "MyListView";
    }

    @Override
    protected ListView createViewInstance(final ThemedReactContext reactContext) {
        this.mContext = reactContext;
        ListView mListView = new ListView(reactContext);

        mListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
//                Toast.makeText(mContext, dataSource.get(position).toString(), Toast.LENGTH_SHORT).show();
                WritableMap event = Arguments.createMap();
                event.putString("content",dataSource.get(position).toString());//key用于js中的nativeEvent
                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(position, "onItemClickListener", event);
            }
        });


        return mListView;
    }

    /**
     * 初始化菜单
     *
     * @param context
     * @return
     */
//    SwipeMenuCreator initMenu(final Context context) {
//        SwipeMenuCreator creator = new SwipeMenuCreator() {
//
//            @Override
//            public void create(SwipeMenu menu) {
//                // create "delete" item
//                SwipeMenuItem deleteItem = new SwipeMenuItem(
//                        context);
//                // set item background
//                deleteItem.setBackground(new ColorDrawable(Color.rgb(0xF9,
//                        0x3F, 0x25)));
//                // set item width
//                deleteItem.setWidth(100);
//                // set a icon
//                deleteItem.setIcon(R.drawable.ic_delete);
//                // add to menu
//                menu.addMenuItem(deleteItem);
//            }
//        };
//        return creator;
//    }


    /**
     * 导出属性"array"给JS模块调用
     *
     * @param array
     */
    @ReactProp(name = "array")
    public void setDataSource(ListView mListView, ReadableArray array) {
        dataSource = new ArrayList<>();
        for (int i = 0; i < array.size(); i++) {
            dataSource.add(array.getString(i));
        }
        adapter = new MyAdapter(mContext, dataSource);
        mListView.setAdapter(adapter);
    }

}
