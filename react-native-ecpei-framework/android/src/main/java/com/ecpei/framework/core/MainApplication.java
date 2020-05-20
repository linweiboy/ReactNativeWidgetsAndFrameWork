package com.ecpei.framework.core;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.support.multidex.MultiDex;
import android.support.multidex.MultiDexApplication;
import android.text.TextUtils;
import android.util.Log;

import com.alibaba.sdk.android.push.CommonCallback;
import com.alibaba.sdk.android.push.noonesdk.PushServiceFactory;
import com.alibaba.sdk.android.push.register.HuaWeiRegister;
import com.alibaba.sdk.android.push.register.MiPushRegister;
import com.ecpei.core.AppConfig;
import com.ecpei.core.upgrade.IUpgradeReactNative;
import com.ecpei.widgets.modules.push.aliyun.PushModule;
import com.ecpei.widgets.modules.push.aliyun.PushPackage;
import com.ecpei.widgets.modules.push.aliyun.RypMessageReceiver;
import com.ecpei.widgets.modules.share.SharePackage;
import com.ecpei.widgets.modules.speech.SpeechsPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.react.modules.network.ReactCookieJarContainer;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.tencent.bugly.crashreport.CrashReport;
import com.umeng.analytics.MobclickAgent;
import com.umeng.commonsdk.UMConfigure;
import com.umeng.socialize.Config;
import com.umeng.socialize.PlatformConfig;
import com.umeng.socialize.UMShareAPI;

import java.security.SecureRandom;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.KeyManager;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import okhttp3.OkHttpClient;



public class MainApplication extends MultiDexApplication implements ReactApplication, IUpgradeReactNative {

    private ReactNativeHost mReactNativeHost = createReactNativeHost();


    public ReactNativeHost createReactNativeHost() {
        ReactNativeHost reactNativeHost = new ReactNativeHost(this) {


            @Override
            public boolean getUseDeveloperSupport() {
                return AppConfig.DEBUG;
            }

            @Override
            protected List<ReactPackage> getPackages() {
                return getReactPackages();
            }


            @Override
            protected String getJSMainModuleName() {
                return "index";
            }
        };
        return reactNativeHost;
    }


    protected List<ReactPackage> getReactPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage()
        );
    }


    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        OkHttpClientProvider.replaceOkHttpClient(initCustomOkHttpClient());
        //阿里云推送
        this.initCloudChannel();
        SoLoader.init(this, /* native exopackage */ false);
        try {
            //配置分享访问秘钥
            ApplicationInfo appInfo = this.getPackageManager().getApplicationInfo(getPackageName(), PackageManager.GET_META_DATA);

            if (TextUtils.equals(getMode(),"alpha")){
                appInfo.metaData.putString("WX_APPID","wx6e57ee7bc2411dd5");    //微信appid
                appInfo.metaData.putString("WX_SECRET","1b3a96d693da4056992e3419f42c7d3a");  //微信appkey
                appInfo.metaData.putString("UMENG_APPKEY","5d661be53fc1957ac50005e2");      //友盟appkey
                appInfo.metaData.putString("com.alibaba.app.appkey","27835698");      //阿里云推送appkey
                appInfo.metaData.putString("com.alibaba.app.appsecret","1cb1173522fdb775050f47aec080b483");    //阿里云推送appsecret
                appInfo.metaData.putString("MI_APPID","appid_2882303761517941738");             //小米聊天appid
                appInfo.metaData.putString("MI_PUSH_APPID","appPushId_2882303761517913280");       //小米推送appid
                appInfo.metaData.putString("MI_PUSH_APPKEY","appPushKey_5331791326280");            //小米推送appkey
                appInfo.metaData.putString("QQ_APPID","1108842614");                //QQ分享appid
                appInfo.metaData.putString("QQ_KEY","yPsZz0PBmcldzmG4");            //QQ分享appkey
            }

            PlatformConfig.setWeixin(appInfo.metaData.getString("WX_APPID"), appInfo.metaData.getString("WX_SECRET"));
            PlatformConfig.setQQZone(appInfo.metaData.get("QQ_APPID").toString(), appInfo.metaData.get("QQ_KEY").toString());
//          PlatformConfig.setSinaWeibo("2733400964", "fac50980a44e3e3afd4bc968ea572887", "www.baidu.com");

            // 注册方法会自动判断是否支持小米系统推送，如不支持会跳过注册。
            MiPushRegister.register(this.getApplicationContext(),appInfo.metaData.getString("MI_PUSH_APPID").replace("appPushId_", ""),appInfo.metaData.getString("MI_PUSH_APPKEY").replace("appPushKey_",""));
            // 注册方法会自动判断是否支持华为系统推送，如不支持会跳过注册。
            HuaWeiRegister.register(this.getApplicationContext());

        } catch (PackageManager.NameNotFoundException ex) {

        }
        // 此处配置类型，供后台分析各渠道时使用
        Config.shareType = "normal";
        // 初始化Umeng分享
        UMShareAPI.get(this);
        //设置统计场景
        UMConfigure.init(this, UMConfigure.DEVICE_TYPE_PHONE, null);
        MobclickAgent.setScenarioType(this.getApplicationContext(), MobclickAgent.EScenarioType.E_UM_NORMAL);
        RypMessageReceiver.createChannel(this);
        //bugly APP BUG 监测
        CrashReport.initCrashReport(getApplicationContext());
    }

    /**
     * 初始化云推送通道
     */
    private void initCloudChannel() {
        PushServiceFactory.init(this.getApplicationContext());
        PushServiceFactory.getCloudPushService().register(this.getApplicationContext(), new CommonCallback() {
            @Override
            public void onSuccess(String s) {
                WritableMap params = Arguments.createMap();
                params.putBoolean("success", true);
                Log.e("MainApplication","onSuccess: 初始化获取阿里DeviceId：" + PushServiceFactory.getCloudPushService().getDeviceId());
                PushModule.sendEvent("onInit", params);
            }

            @Override
            public void onFailed(String s, String s1) {
                WritableMap params = Arguments.createMap();
                params.putBoolean("success", false);
                params.putString("errorMsg", "errorCode:" + s + ". errorMsg:" + s1);
                Log.e("MainApplication","onFailed: 初始化获取阿里DeviceId：" + PushServiceFactory.getCloudPushService().getDeviceId());
                PushModule.sendEvent("onInit", params);
            }
        });

    }

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
        MultiDex.install(this);
    }

    // 配置平台key、secret信息
    {

    }

    public static OkHttpClient initCustomOkHttpClient() {
        OkHttpClient.Builder client = new OkHttpClient.Builder()
                .connectTimeout(0, TimeUnit.MILLISECONDS)
                .readTimeout(0, TimeUnit.MILLISECONDS)
                .writeTimeout(0, TimeUnit.MILLISECONDS)
                .cookieJar(new ReactCookieJarContainer());

        OkHttpClient.Builder builder = OkHttpClientProvider.enableTls12OnPreLollipop(client);
        builder.sslSocketFactory(getSSLSocketFactory())
                .hostnameVerifier(new HostnameVerifier() {
                    @Override
                    public boolean verify(String hostname, SSLSession session) {
                        return true; //忽略所有的认证，直接返回了true
                    }
                });
        return builder.build();
    }

    private static SSLSocketFactory getSSLSocketFactory() {
        TrustManager[] trustAllCerts = new TrustManager[]{new X509TrustManager() {
            public void checkClientTrusted(X509Certificate[] chain, String authType) throws
                    CertificateException {
            }

            public void checkServerTrusted(X509Certificate[] chain, String authType) throws CertificateException {
            }

            public X509Certificate[] getAcceptedIssuers() {
                return new X509Certificate[0];
            }
        }};
        SSLSocketFactory sslSocketFactory = null;

        try {
            SSLContext sslContext = SSLContext.getInstance("TLS");
            sslContext.init((KeyManager[]) null, trustAllCerts, new SecureRandom());
            sslSocketFactory = sslContext.getSocketFactory();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return sslSocketFactory;
    }

    @Override
    public void reCreateReactNativeHost() {
        synchronized (mReactNativeHost) {
            mReactNativeHost = createReactNativeHost();
        }
    }

    public String getMode(){
        if (TextUtils.equals(AppConfig.RUN_MODE,"release")){
            return AppConfig.RUN_MODE;
        }else {
            SharedPreferences preference = null;
            preference = this.getSharedPreferences("text", 0);
            String APP_MODE =  preference.getString("mode_key", AppConfig.RUN_MODE);
            return APP_MODE;
        }
    }

}
