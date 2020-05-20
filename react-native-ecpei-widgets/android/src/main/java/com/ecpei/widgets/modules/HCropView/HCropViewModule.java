package com.ecpei.widgets.modules.HCropView;

import android.support.annotation.Nullable;

import com.ecpei.widgets.modules.HCropView.event.GetImageEvent;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

public class HCropViewModule extends ReactContextBaseJavaModule {

    private final String H_CROP_VIEW_MODULE = "HCropViewModule";
    private  ReactApplicationContext mContext;
    private final String GET_CROP_EVENT_MODULE = "getCropImage";

    public HCropViewModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return H_CROP_VIEW_MODULE;
    }

    @Override
    public void initialize() {
        super.initialize();
        if (!EventBus.getDefault().isRegistered(this)){
            EventBus.getDefault().register(this);
        }
    }

    @Override
    public void onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy();
        EventBus.getDefault().unregister(this);
    }

    /**
     * 截图成功返回的参数发送通知给RN
     * @param event
     */
    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onEvent(GetImageEvent event){
        if (event.getAction().equals(GET_CROP_EVENT_MODULE)){
            WritableMap writableMap = new WritableNativeMap();
            writableMap.putString("base64",event.getBase64());
            writableMap.putString("status",event.getStatus());
            writableMap.putString("path",event.getPath());
            sendTransMisson(getReactApplicationContext(),GET_CROP_EVENT_MODULE,writableMap);
        }
    }

    /**
     * @param reactContext
     * @param eventName    事件名
     * @param params       传惨
     */
    public static void sendTransMisson(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);

    }
}
