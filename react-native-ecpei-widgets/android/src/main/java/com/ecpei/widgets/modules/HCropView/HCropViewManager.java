package com.ecpei.widgets.modules.HCropView;

import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import com.ecpei.common.BitmapCut;
import com.ecpei.widgets.modules.HCropView.View.HCropViewLayout;
import com.ecpei.widgets.modules.HCropView.event.GetImageEvent;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import org.greenrobot.eventbus.EventBus;

import javax.annotation.Nullable;

public class HCropViewManager extends ViewGroupManager<HCropViewLayout> {

    private static final String H_CORP_NAME = "HCropView";
    private HCropViewLayout mHCropViewLayout;
    private final String GET_CROP_EVENT = "getCropImage";
    private final int SET_ROTATION_ANGLE = 100;  //设置旋转的角度
    private final int GET_CROP_IMAGE = 101;      //获取截图区域的图片

    @Override
    public String getName() {
        return H_CORP_NAME;
    }

    @Override
    protected HCropViewLayout createViewInstance(final ThemedReactContext reactContext) {
        final Activity activity = reactContext.getCurrentActivity();
        mHCropViewLayout = new HCropViewLayout(activity,null);
        return mHCropViewLayout;
    }

    /**
     * 设置图片
     * @param hCropViewLayout
     * @param value  可传base64或直接传路径
     */
    @ReactProp(name = "setImageValue")
    public void setImage(final HCropViewLayout hCropViewLayout, String value){
        Bitmap bitmap = null;
        if (value.indexOf("file://") != -1){
            value = value.replace("file://", "");
            bitmap = BitmapFactory.decodeFile(value);
        }else {
            bitmap = BitmapCut.base64ToBitmap(value);
        }
        hCropViewLayout.setBitmapImage(bitmap);
    }

    @ReactProp(name = "cropSize")
    public void setCropSize(final HCropViewLayout hCropViewLayout, ReadableMap map){
        int width = map.getInt("width");
        int height = map.getInt("height");
        hCropViewLayout.setCropSize(width,height);
    }

    @ReactProp(name = "lineColor")
    public void setLineColor(final HCropViewLayout hCropViewLayout, String color){
        hCropViewLayout.setLineColor(color);
    }

    @ReactProp(name = "cropLineSize")
    public void setCropLineSize(final HCropViewLayout hCropViewLayout, ReadableMap map){
        int width = map.getInt("width");
        int height = map.getInt("height");
        hCropViewLayout.setCropLineSize(width,height);
    }

    @Override
    public void receiveCommand(HCropViewLayout hCropViewLayout, int commandId, @Nullable ReadableArray args) {
        switch (commandId){
            case SET_ROTATION_ANGLE:   //点击旋转
                hCropViewLayout.setRotationAngle(args.getInt(0));
                break;
            case GET_CROP_IMAGE:;
                String status,base64;
                Bitmap bitmap = hCropViewLayout.getCorpBitmap();
                if (bitmap != null){
                    status = "1";
                    base64 = BitmapCut.bitmapToBase64(bitmap);
                }else {
                    status = "0";
                    base64 = null;
                }
                EventBus.getDefault().post(new GetImageEvent(status,base64,null,GET_CROP_EVENT));
                break;
        }
    }
}
