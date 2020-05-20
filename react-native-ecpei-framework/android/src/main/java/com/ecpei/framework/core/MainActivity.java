package com.ecpei.framework.core;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.view.ViewGroup;

import com.ecpei.common.BarTextColorUtils;
import com.ecpei.framework.ReactActivity;
import com.ecpei.framework.ReactActivityDelegate;
import com.ecpei.widgets.modules.share.ShareModule;
import com.ecpei.widgets.modules.speech.SpeechsModule;
import com.facebook.react.ReactInstanceManager;
import com.ecpei.core.asyn.AsynView;
import com.ecpei.core.asyn.Presenter;
import com.ecpei.core.asyn.AsynPresenter;
import com.ecpei.widgets.modules.upgrade.UpgradeModule;
import com.umeng.analytics.MobclickAgent;
import com.umeng.socialize.UMShareAPI;

import org.devio.rn.splashscreen.SplashScreen;
import org.opencv.android.OpenCVLoader;

public class MainActivity extends ReactActivity implements AsynView {

    public static String MainComponentName = "com.ryp.rn.core";
    public static MainActivity mainActivity = null;

    private Presenter presenter;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return MainComponentName;
    }

    @Override
    protected void onStart() {
        super.onStart();

    }


    static ReactActivityDelegate mDelegate;

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        mDelegate = new ReactActivityDelegate(this, getMainComponentName());
        return mDelegate;
    }


    public static View getRootView(Activity context) {
        return ((ViewGroup) context.findViewById(android.R.id.content)).getChildAt(0);
    }

    private @javax.annotation.Nullable
    ReactInstanceManager mReactInstanceManager;

    private Handler handler = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        mainActivity = this;
        //创建属于主线程的handler
        handler = new Handler();
        BarTextColorUtils.StatusBarLightMode(mainActivity);
//        SplashScreen.show(this, true);      //显示启动页
        //异步解压
        presenter = new AsynPresenter(this, this);
        presenter.loadFile(AsynPresenter.SUPPORT_BACKPRESSURE);
        super.onCreate(savedInstanceState);
        //初始化分享组件
        ShareModule.initSocialSDK(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        // 解决内存泄漏问题
        UMShareAPI.get(this).release();
        presenter.clearDisposable();
        SpeechsModule.speechRelease();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (getReactInstanceManager() != null) {
            getReactInstanceManager().onActivityResult(this, requestCode, resultCode, data);
        } else {
            super.onActivityResult(requestCode, resultCode, data);
        }
        UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
    }

    @Override
    public void onResume() {
        super.onResume();
        MobclickAgent.onResume(this);
        //通过OpenCV引擎服务加载并初始化OpenCV类库，所谓OpenCV引擎服务即是
        //OpenCV_2.4.3.2_Manager_2.4_*.apk程序包，存在于OpenCV安装包的apk目录中
//        OpenCVLoader.initAsync(OpenCVLoader.OPENCV_VERSION, this, mLoaderCallback);
        if (!OpenCVLoader.initDebug()) {
            // Handle initialization error
        }
    }

    @Override
    public void onPause() {
        super.onPause();
        MobclickAgent.onPause(this);
    }

    /**
     * RxJava 异步
     */
    @Override
    public void subscribe() {
        SplashScreen.show(this, true);      //显示启动页
    }

    @Override
    public void success(Object o) {
        UpgradeModule.isLoadSuccess = true;
        if (o != null && o.toString().equals("1")) {
            UpgradeModule.isAssets = true;
        } else {
            UpgradeModule.isAssets = false;
        }
    }

    @Override
    public void showError(String msgs) {
    }


}
