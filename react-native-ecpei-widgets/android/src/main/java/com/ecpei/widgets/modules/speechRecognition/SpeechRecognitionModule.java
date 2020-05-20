package com.ecpei.widgets.modules.speechRecognition;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.media.MediaRecorder;
import android.os.Build;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.util.Log;

import com.baidu.speech.EventManager;
import com.baidu.speech.EventManagerFactory;
import com.baidu.speech.asr.SpeechConstant;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.json.JSONObject;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by Administrator on 2018/2/3 0003.
 */

public class SpeechRecognitionModule extends ReactContextBaseJavaModule implements com.baidu.speech.EventListener, LifecycleEventListener {

    public SpeechRecognitionModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return "BaiduSpeech";
    }


    EventManager asr = null;

    /**
     * 在onCreate中调用。初始化识别控制类MyRecognizer
     */
    @ReactMethod
    protected void initRecog() {
        if (asr == null) {
            initPermission();
            asr = EventManagerFactory.create(this.getCurrentActivity(), "asr"); // this是Activity或其它Context类
            asr.registerListener(this); //  EventListener 中 onEvent方法
            if (enableOffline) {
                loadOfflineEngine();
            }
        }
    }


    private boolean enableOffline = false; // 测试离线命令词，需要改成true
    private Promise promise = null;
    private boolean isStart = false;

    @ReactMethod
    public void start(final Promise promise) {
        if (isStart) {
            asr.send(SpeechConstant.ASR_CANCEL, null, null, 0, 0);
        }
        isStart = true;
        if (this.promise != null) {
            this.promise.reject("-2", "已经重新发起新的识别");
            this.promise = null;
        }
        this.promise = promise;
        _params = "";
        Map<String, Object> params = new LinkedHashMap<String, Object>();
        String event = null;
        event = SpeechConstant.ASR_START; // 替换成测试的event
        if (enableOffline) {
            params.put(SpeechConstant.DECODER, 2);
        }
        params.put(SpeechConstant.ACCEPT_AUDIO_VOLUME, false);
        // params.put(SpeechConstant.NLU, "enable");
        // params.put(SpeechConstant.VAD_ENDPOINT_TIMEOUT, 0); // 长语音
        // params.put(SpeechConstant.IN_FILE, "res:///com/baidu/android/voicedemo/16k_test.pcm");
        params.put(SpeechConstant.VAD, SpeechConstant.VAD_TOUCH);
        // params.put(SpeechConstant.PROP ,20000);
        // params.put(SpeechConstant.PID, 1537); // 中文输入法模型，有逗号
        // 请先使用如‘在线识别’界面测试和生成识别参数。 params同ActivityRecog类中myRecognizer.start(params);
        String json = null; // 可以替换成自己的json
        json = new JSONObject(params).toString(); // 这里可以替换成你需要测试的json
        asr.send(event, json, null, 0, 0);
//        promise.resolve(json.toString());
    }


    public static Map<String, Object> fetchOfflineParams() {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put(SpeechConstant.DECODER, 2);
        map.put(SpeechConstant.ASR_OFFLINE_ENGINE_GRAMMER_FILE_PATH, "asset:///baidu_speech_grammar.bsg");
//        map.putAll(fetchSlotDataParam());
        return map;
    }


//    public static Map<String, Object> fetchSlotDataParam() {
//        Map<String, Object> map = new HashMap<String, Object>();
//        try {
//            JSONObject json = new JSONObject();
//            json.put("name", new JSONArray().put("赵六").put("赵六"))
//                    .put("appname", new JSONArray().put("手百").put("度秘"));
//            map.put(SpeechConstant.SLOT_DATA, json);
//        } catch (JSONException e) {
//            e.printStackTrace();
//        }
//        return map;
//    }

    private void loadOfflineEngine() {
        asr.send(SpeechConstant.ASR_KWS_LOAD_ENGINE, new JSONObject(fetchOfflineParams()).toString(), null, 0, 0);
    }


    @ReactMethod
    private void stop() {
        isStart = false;
        asr.send(SpeechConstant.ASR_STOP, null, null, 0, 0); //
    }


    @ReactMethod
    private void cancel() {
        isStart = false;
        asr.send(SpeechConstant.ASR_CANCEL, null, null, 0, 0); //
    }


    private String _params = "";

    @Override
    public void onEvent(String name, String params, byte[] data, int offset, int length) {
        String logTxt = "name: " + name;
        if (params != null && !params.isEmpty()) {
            logTxt += " ;params :" + params;
        }
        if (name.equals(SpeechConstant.CALLBACK_EVENT_ASR_PARTIAL)) {
            if (params.contains("\"nlu_result\"")) {
                if (length > 0 && data.length > 0) {
                    logTxt += ", 语义解析结果：" + new String(data, offset, length);
                }
            }
        } else if (data != null) {
            logTxt += " ;data length=" + data.length;
        }
        if (name.equals(SpeechConstant.CALLBACK_EVENT_ASR_PARTIAL)) {
            _params = params;
        }
        if (name.equals(SpeechConstant.CALLBACK_EVENT_ASR_FINISH)) {
            Log.w(getClass().getName(), "_params:" + _params);
            Log.w(getClass().getName(), "params:" + params);
            Log.w(getClass().getName(), "data:" + data);
            Log.w(getClass().getName(), "data:" + data);
            SpeechEvent("FINISH", _params);
            WritableMap writableMap = new WritableNativeMap();
            writableMap.putString("event", "FINISH");
            writableMap.putString("data", _params.toString());
            isStart = false;
            if (promise != null) {
                promise.resolve(writableMap);
                promise = null;
            }
        }
        printLog(logTxt);
    }

    private boolean logTime = true;

    private void printLog(String text) {
        if (logTime) {
            text += "  ;time=" + System.currentTimeMillis();
        }
        text += "\n";
        Log.i(getClass().getName(), text);
    }

    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {

    }

    @Override
    public void onHostDestroy() {
        if (asr != null) {
            asr.send(SpeechConstant.ASR_CANCEL, "{}", null, 0, 0);
            if (enableOffline) {
                unloadOfflineEngine(); // 测试离线命令词请开启, 测试 ASR_OFFLINE_ENGINE_GRAMMER_FILE_PATH 参数时开启
            }
        }
    }


    private void unloadOfflineEngine() {
        asr.send(SpeechConstant.ASR_KWS_UNLOAD_ENGINE, null, null, 0, 0); //
    }


    /**
     * android 6.0 以上需要动态申请权限
     */
    private void initPermission() {
        String permissions[] = {Manifest.permission.RECORD_AUDIO,
                Manifest.permission.ACCESS_NETWORK_STATE,
                Manifest.permission.INTERNET,
                Manifest.permission.READ_PHONE_STATE,
                Manifest.permission.WRITE_EXTERNAL_STORAGE
        };

        ArrayList<String> toApplyList = new ArrayList<String>();

        for (String perm : permissions) {
            if (PackageManager.PERMISSION_GRANTED != ContextCompat.checkSelfPermission(this.getCurrentActivity(), perm)) {
                toApplyList.add(perm);
                // 进入到这里代表没有权限.
            }
        }
        String tmpList[] = new String[toApplyList.size()];
        if (!toApplyList.isEmpty()) {
            ActivityCompat.requestPermissions(this.getCurrentActivity(), toApplyList.toArray(tmpList), 123);
        }
    }

    /**
     * 申请记录音频权限
     */
    @ReactMethod
    public void getAudioPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (ContextCompat.checkSelfPermission(this.getCurrentActivity(), Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this.getCurrentActivity(), new String[]{Manifest.permission.RECORD_AUDIO}, 1234);
            } else {
//                showToast("权限已申请");
            }
        }
    }

    /**
     * 判断用户是否拥有音频记录权限
     * @param callback
     */
    @ReactMethod
    public void isPermission(Callback callback){
        int resutl = -1;
        String msg = "";
        if ((PackageManager.PERMISSION_GRANTED == ContextCompat.checkSelfPermission(this.getCurrentActivity(),Manifest.permission.RECORD_AUDIO))
                && hasAudioPermission(getCurrentActivity()) ){
            //有权限
            resutl = 1;
            callback.invoke(resutl);
        }else{
            if (ActivityCompat.shouldShowRequestPermissionRationale(this.getCurrentActivity(),Manifest.permission.RECORD_AUDIO)){
                //没有权限但可以再次弹出获取权限框
                resutl = -1;
                callback.invoke(resutl);
            }else {
                //没有权限并且不在弹出权限框
                resutl = -1;
                msg = "请去系统设置里开启权限";
                callback.invoke(resutl,msg);
            }
        }
    }

    /**
     * 麦克风系统层的权限判断
     * @param context     上下文
     * @return 是否有权限 ：其中有一个获取不了就是失败了
     */
    public static boolean hasAudioPermission(@NonNull Context context) {
        File mTempFile = null;
        MediaRecorder mediaRecorder = new MediaRecorder();

        try {
            mTempFile = File.createTempFile("permission", "test");

            mediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
            mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.AMR_NB);
            mediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);
            mediaRecorder.setOutputFile(mTempFile.getAbsolutePath());
            mediaRecorder.prepare();
            mediaRecorder.start();
            return true;
        } catch (Throwable e) {
            PackageManager packageManager = context.getPackageManager();
            return !packageManager.hasSystemFeature(PackageManager.FEATURE_MICROPHONE);
        } finally {
            try {
                mediaRecorder.stop();
            } catch (Exception ignored) {
            }
            try {
                mediaRecorder.release();
            } catch (Exception ignored) {
            }

            if (mTempFile != null && mTempFile.exists()) {
                mTempFile.delete();
            }
        }
    }

    public void SpeechEvent(String event, String params) {
        WritableMap writableMap = new WritableNativeMap();
        writableMap.putString("event", event);
        writableMap.putString("data", params.toString());
        sendTransMisson(this.getReactApplicationContext(), "SpeechBaidu", writableMap);
    }


    /**
     * @param reactContext
     * @param eventName    事件名
     * @param params       传惨
     */
    private void sendTransMisson(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);

    }



}
