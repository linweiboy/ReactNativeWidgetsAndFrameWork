package com.ecpei.widgets.modules.speech;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by Administrator on 2018/7/3 0003.
 */

public class SpeechsPackage implements ReactPackage {


    private String appId;

    private String appKey;

    private String secretKey;


    public SpeechsPackage(String appId, String appKey, String secretKey) {
        this.appId = appId;
        this.appKey = appKey;
        this.secretKey = secretKey;
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new SpeechsModule(reactContext, this.appId, this.appKey, this.secretKey));
        return modules;
    }


    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}