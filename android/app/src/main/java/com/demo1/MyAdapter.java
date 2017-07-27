package com.demo1;

import android.content.Context;
import android.text.Layout;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import java.util.List;

/**
 * Created by Administrator on 2017/7/20.
 */

public class MyAdapter extends BaseAdapter {

    private Context mContext;
    private List<String> list;
    private LayoutInflater inflater;

    public MyAdapter(Context context, List<String> list) {
        this.list = list;
        this.mContext = context;
        this.inflater = LayoutInflater.from(context);
    }


    @Override
    public int getCount() {
        return list.size();
    }

    @Override
    public Object getItem(int position) {
        return list.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        MyHolder holder = null;
        if (convertView == null) {
            convertView = inflater.inflate(R.layout.layout_item, null);
            holder = new MyHolder();
            convertView.setTag(holder);
        } else {
            holder = (MyHolder) convertView.getTag();
        }
        holder.tv_desc = (TextView) convertView.findViewById(R.id.tv_desc);
        holder.tv_desc.setText("" + list.get(position).toString());
        return convertView;
    }

    private class MyHolder {
        private TextView tv_desc;
    }
}
