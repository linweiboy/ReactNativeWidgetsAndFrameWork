package com.ecpei.widgets.modules.push.aliyun;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.graphics.Color;
import android.os.Build;
import android.os.Handler;
import android.os.Looper;
import android.text.TextUtils;
import android.util.Log;

import com.alibaba.sdk.android.push.MessageReceiver;
import com.alibaba.sdk.android.push.notification.CPushMessage;
import com.ecpei.widgets.modules.speech.SpeechsModule;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import java.util.Map;

/**
 * Created by Administrator on 2018/3/12 0012.
 */

public class RypMessageReceiver extends MessageReceiver {
    public RypMessageReceiver() {
        super();
    }

    @Override
    protected void onNotificationOpened(Context context, String s, String s1, String s2) {
        super.onNotificationOpened(context, s, s1, s2);
        Log.e("RypMessageReceiver","onNotificationOpened:title:" + s + "  content:" + s1 +"  map:"+s2);
        WritableMap params = Arguments.createMap();
        params.putString("content", s1);
        params.putString("title", s);
        params.putString("params", s2);
        PushModule.sendEvent("onNotificationOpened", params);
    }

    @Override
    protected void onNotificationRemoved(Context context, String s) {
        super.onNotificationRemoved(context, s);
        Log.e("RypMessageReceiver","onNotificationRemoved:content:" + s);
        WritableMap params = Arguments.createMap();
        params.putString("title", s);
        PushModule.sendEvent("onNotificationRemoved", params);
    }

    @Override
    protected void onMessage(Context context, CPushMessage cPushMessage) {
        super.onMessage(context, cPushMessage);
        Log.e("RypMessageReceiver","onMessage:content:" + cPushMessage.toString());
        WritableMap params = Arguments.createMap();
        params.putString("messageId", cPushMessage.getMessageId());
        params.putString("content", cPushMessage.getContent());
        params.putString("title", cPushMessage.getTitle());
        PushModule.sendEvent("onMessage", params);

    }

    @Override
    protected void onNotification(Context context, String s, String s1, Map<String, String> map) {
        super.onNotification(context, s, s1, map);
        Log.e("RypMessageReceiver","onNotification:title:" + s + "  content:" + s1 +"  map:"+map.toString());
        SpeechsModule.initialTts();
        if (TextUtils.equals(map.get("urlPage"),"96")){
            SpeechsModule.speakStart("您有新的求购单，请查收！");
        }else if(TextUtils.equals(map.get("urlPage"),"97")){
            SpeechsModule.speakStart("您有新的报价，请查收！");
        }

        WritableMap params = Arguments.createMap();
        params.putString("content", s1);
        params.putString("title", s);
        for (Map.Entry<String, String> entry : map.entrySet()) {
            params.putString(entry.getKey(), entry.getValue());
        }
        PushModule.sendEvent("onNotification", params);

        new Thread() {
            @Override
            public void run() {
                Looper.prepare();
                new Handler().post(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            Thread.sleep(5000);
                            SpeechsModule.speechRelease();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                });
                Looper.loop();
            }
        }.start();
    }

    public static void createChannel(Context context){
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager mNotificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            // 通知渠道的id
            String id = "ecpei";
            // 用户可以看到的通知渠道的名字.
            CharSequence name = "ryp_push";
            // 用户可以看到的通知渠道的描述
            String description = " ";
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel mChannel = new NotificationChannel(id, name, importance);
            // 配置通知渠道的属性
            mChannel.setDescription(description);
            // 设置通知出现时的闪灯（如果 android 设备支持的话）
            mChannel.enableLights(false);
            mChannel.setLightColor(Color.RED);
            // 设置通知出现时的震动（如果 android 设备支持的话）
            mChannel.enableVibration(true);
            mChannel.setVibrationPattern(new long[]{100, 200, 300, 400, 500, 400, 300, 200, 400});
            //最后在notificationmanager中创建该通知渠道
            mNotificationManager.createNotificationChannel(mChannel);
        }
    }




}