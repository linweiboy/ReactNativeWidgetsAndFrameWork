package com.ecpei.widgets.modules.push.aliyun;

import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import android.text.TextUtils;

import com.alibaba.sdk.android.push.MessageReceiver;
import com.ecpei.widgets.modules.speech.SpeechsModule;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.umeng.socialize.utils.Log;

import java.util.Map;

public class MyMessageReceiver extends MessageReceiver {

    public MyMessageReceiver() {
        super();
    }

    /**
     * 推送通知的回调方法
     * @param context
     * @param title
     * @param summary
     * @param extraMap
     */
    @Override
    public void onNotification(Context context, String title, String summary, Map<String, String> extraMap) {
        Log.e(TAG, "Receive notification, title: " + title + ", content: " + summary + ", extraMap: " + extraMap);

//        SpeechsModule.initialTts();
//        if (TextUtils.equals(extraMap.get("urlPage"),"96")){
//            SpeechsModule.speakStart("您有新的求购单，请查收！");
//        }else if(TextUtils.equals(extraMap.get("urlPage"),"97")){
//            SpeechsModule.speakStart("您有新的报价，请查收！");
//        }

        WritableMap params = Arguments.createMap();
        params.putString("content", summary);
        params.putString("title", title);
        for (Map.Entry<String, String> entry : extraMap.entrySet()) {
            params.putString(entry.getKey(), entry.getValue());
        }
        PushModule.sendEvent("onNotification", params);

//        new Thread() {
//            @Override
//            public void run() {
//                Looper.prepare();
//                new Handler().post(new Runnable() {
//                    @Override
//                    public void run() {
//                        try {
//                            Thread.sleep(5000);
//                            SpeechsModule.speechRelease();
//                        } catch (InterruptedException e) {
//                            e.printStackTrace();
//                        }
//                    }
//                });
//                Looper.loop();
//            }
//        }.start();
    }
}
