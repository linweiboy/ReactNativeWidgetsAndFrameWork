package com.ecpei.widgets.modules.RNDeviceInfo;

import android.app.KeyguardManager;
import android.bluetooth.BluetoothAdapter;
import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.os.Build;
import android.provider.Settings.Secure;
import android.text.TextUtils;

import com.ecpei.core.AppConfig;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.ecpei.core.upgrade.H5Manifest;
//import com.google.android.gms.iid.InstanceID;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;

import javax.annotation.Nullable;

public class RNDeviceModule extends ReactContextBaseJavaModule {

    ReactApplicationContext reactContext;

    public RNDeviceModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNDeviceInfos";
    }

    private String getCurrentLanguage() {
        Locale current = getReactApplicationContext().getResources().getConfiguration().locale;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            return current.toLanguageTag();
        } else {
            StringBuilder builder = new StringBuilder();
            builder.append(current.getLanguage());
            if (current.getCountry() != null) {
                builder.append("-");
                builder.append(current.getCountry());
            }
            return builder.toString();
        }
    }

    private String getCurrentCountry() {
        Locale current = getReactApplicationContext().getResources().getConfiguration().locale;
        return current.getCountry();
    }

    private Boolean isEmulator() {
        return Build.FINGERPRINT.startsWith("generic")
                || Build.FINGERPRINT.startsWith("unknown")
                || Build.MODEL.contains("google_sdk")
                || Build.MODEL.contains("Emulator")
                || Build.MODEL.contains("Android SDK built for x86")
                || Build.MANUFACTURER.contains("Genymotion")
                || (Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic"))
                || "google_sdk".equals(Build.PRODUCT);
    }

    private Boolean isTablet() {
        int layout = getReactApplicationContext().getResources().getConfiguration().screenLayout & Configuration.SCREENLAYOUT_SIZE_MASK;
        return layout == Configuration.SCREENLAYOUT_SIZE_LARGE || layout == Configuration.SCREENLAYOUT_SIZE_XLARGE;
    }

    @ReactMethod
    public void isPinOrFingerprintSet(Callback callback) {
        KeyguardManager keyguardManager = (KeyguardManager) this.reactContext.getSystemService(Context.KEYGUARD_SERVICE); //api 16+
        callback.invoke(keyguardManager.isKeyguardSecure());
    }

    @Override
    public @Nullable
    Map<String, Object> getConstants() {
        HashMap<String, Object> constants = new HashMap<String, Object>();

        PackageManager packageManager = this.reactContext.getPackageManager();
        String packageName = this.reactContext.getPackageName();

        constants.put("appVersion", "not available");
        constants.put("buildVersion", "not available");
        constants.put("buildNumber", 0);

        try {
            PackageInfo info = packageManager.getPackageInfo(packageName, 0);
            constants.put("appVersion", info.versionName);
            constants.put("buildNumber", info.versionCode);
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();
        }

        String deviceName = "Unknown";

        try {
            BluetoothAdapter myDevice = BluetoothAdapter.getDefaultAdapter();
            if (myDevice != null) {
                deviceName = myDevice.getName();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

//        constants.put("instanceId", InstanceID.getInstance(this.reactContext).getId());
        constants.put("deviceName", deviceName);
        constants.put("systemName", "Android");
        constants.put("systemVersion", Build.VERSION.RELEASE);
        constants.put("model", Build.MODEL);
        constants.put("brand", Build.BRAND);
        constants.put("deviceId", Build.BOARD);
        constants.put("deviceLocale", this.getCurrentLanguage());
        constants.put("deviceCountry", this.getCurrentCountry());
        constants.put("uniqueId", Secure.getString(this.reactContext.getContentResolver(), Secure.ANDROID_ID));
        constants.put("systemManufacturer", Build.MANUFACTURER);
        constants.put("bundleId", packageName);
        constants.put("userAgent", System.getProperty("http.agent"));
        constants.put("timezone", TimeZone.getDefault().getID());
        constants.put("isEmulator", this.isEmulator());
        constants.put("isTablet", this.isTablet());
//        constants.put("runMode", AppConfig.RUN_MODE);//运行模式
        constants.put("runMode", getMode());//运行模式

        //wgt配置信息 H5+
        try {
            JSONObject jsonObject = H5Manifest.getManifest(this.reactContext);
//        "version": {
//            "name": "2.1.2",/*应用版本名称*/
//                    "code": "20102"
//        },
            if (jsonObject != null) {
                constants.put("wgtVersionCode", jsonObject.getJSONObject("version").getString("code"));
                constants.put("wgtVersionName", jsonObject.getJSONObject("version").getString("name"));
            }
        } catch (JSONException ex) {
        }
        return constants;
    }

    @ReactMethod
    public void saveMode(String mode){
        SharedPreferences preference = null;
        preference = getCurrentActivity().getSharedPreferences("text", 0);
        SharedPreferences.Editor editor = preference.edit();
        editor.putString("mode_key", mode);
        editor.commit();
    }

    public String getMode(){
        if (TextUtils.equals(AppConfig.RUN_MODE,"release")){
            return AppConfig.RUN_MODE;
        }else {
            SharedPreferences preference = null;
            preference = getCurrentActivity().getSharedPreferences("text", 0);
            String APP_MODE =  preference.getString("mode_key", AppConfig.RUN_MODE);
            return APP_MODE;
        }
    }

}
