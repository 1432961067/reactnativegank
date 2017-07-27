package com.demo1;

/**
 * Created by Administrator on 2017/7/26.
 */

public class Utils {
    public static String formatTime(long elapsedTime) {
        // TODO: Refactor this -- I think it should be a one-liner!
        String format = String.format("%%0%dd", 2);
        elapsedTime = elapsedTime / 1000;
        String seconds = String.format(format, elapsedTime % 60);
        String minutes = String.format(format, (elapsedTime % 3600) / 60);
        String time = minutes + ":" + seconds;
        return time;
    }
}
