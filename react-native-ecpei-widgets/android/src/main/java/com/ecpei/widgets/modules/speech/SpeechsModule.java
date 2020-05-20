/**
 * Copyright (C) 2015 Baidu, Inc. All Rights Reserved.
 */
package com.ecpei.widgets.modules.speech;

import android.content.Context;
import android.media.AudioManager;
import android.os.Handler;
import android.os.Message;

import com.baidu.tts.client.SpeechSynthesizer;
import com.baidu.tts.client.SpeechSynthesizerListener;
import com.baidu.tts.client.TtsMode;
import com.ecpei.widgets.modules.speech.listener.UiMessageListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.ecpei.widgets.modules.speech.control.InitConfig;

/**
 * 纯在线语言
 */
public class SpeechsModule extends ReactContextBaseJavaModule {

    private static Context mContext;

    // ================== 初始化参数设置开始 ==========================
    /**
     * 发布时请替换成自己申请的appId appKey 和 secretKey。
     */
    private static String appId;

    private static String appKey;

    private static String secretKey;

    // TtsMode.MIX; 离在线融合，在线优先； TtsMode.ONLINE 纯在线； 没有纯离线
    private static TtsMode ttsMode = TtsMode.ONLINE;

    public static SpeechSynthesizer mSpeechSynthesizer;

    // =========== 初始化参数设置结束 ==================================================

    private static Handler mainHandler;

    public SpeechsModule(ReactApplicationContext reactContext, String appId, String appKey, String secretKey) {
        super(reactContext);
        mContext = reactContext;
        this.appId = appId;
        this.appKey = appKey;
        this.secretKey = secretKey;
    }

    /**
     * 初始化
     */
    @ReactMethod
    public static void initialTts() {
        SpeechSynthesizerListener listener = new UiMessageListener(getMainHandler());
        // 1. 获取实例
        mSpeechSynthesizer = SpeechSynthesizer.getInstance();
        mSpeechSynthesizer.setContext(mContext);
        // 2. 设置listener
        mSpeechSynthesizer.setSpeechSynthesizerListener(listener);
        //  3. 设置appId，appKey.secretKey
        mSpeechSynthesizer.setAppId(appId);
        mSpeechSynthesizer.setApiKey(appKey, secretKey);
        //设置参数 0为默认在线女音
        mSpeechSynthesizer.setParam(SpeechSynthesizer.PARAM_SPEAKER, "0");
        // 设置合成的音量，0-9 ，默认 5
        mSpeechSynthesizer.setParam(SpeechSynthesizer.PARAM_VOLUME, "9");
        // 设置合成的语速，0-9 ，默认 5
        mSpeechSynthesizer.setParam(SpeechSynthesizer.PARAM_SPEED, "5");
        // 设置合成的语调，0-9 ，默认 5
        mSpeechSynthesizer.setParam(SpeechSynthesizer.PARAM_PITCH, "6");

        mSpeechSynthesizer.setParam(SpeechSynthesizer.PARAM_MIX_MODE, SpeechSynthesizer.MIX_MODE_DEFAULT);
        mSpeechSynthesizer.setAudioStreamType(AudioManager.MODE_IN_CALL);
        // 不使用压缩传输
        mSpeechSynthesizer.setParam(SpeechSynthesizer.PARAM_AUDIO_ENCODE, SpeechSynthesizer.AUDIO_ENCODE_PCM);
        mSpeechSynthesizer.setParam(SpeechSynthesizer.PARAM_AUDIO_RATE, SpeechSynthesizer.AUDIO_BITRATE_PCM);
        new InitConfig(appId, appKey, secretKey, ttsMode, null, listener);
        // 6. 初始化
        mSpeechSynthesizer.initTts(ttsMode);
    }

    /**
     * 语音播报开始
     *
     * @param args
     * @param callback
     */
    @ReactMethod
    public void speak(final ReadableMap args, final Callback callback) {
        String text = args.hasKey("text") ? args.getString("text") : null;
        if (args.getString("text") == null || text == "") {
            callback.invoke("t can not be blank");
            return;
        }
        if (null != mSpeechSynthesizer) {
            mSpeechSynthesizer.speak(text);
        }
        callback.invoke(null, true);
    }

    public static void speakStart(String text){
        if (null != mSpeechSynthesizer ){
            mSpeechSynthesizer.speak(text);
        }
    }

    /**
     * 销毁
     */
    @ReactMethod
    public static void speechRelease() {
        if (null != mSpeechSynthesizer) {
            mSpeechSynthesizer.stop();
            mSpeechSynthesizer.release();
            mSpeechSynthesizer = null;
        }
    }

    private static Handler getMainHandler() {
        mainHandler = new Handler(mContext.getMainLooper()) {
            @Override
            public void handleMessage(Message msg) {
                super.handleMessage(msg);
            }
        };
        return mainHandler;
    }

    @Override
    public String getName() {
        return "SpeechModule";
    }
}
