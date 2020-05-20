package com.ecpei.widgets.modules.upgrade;


import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.os.Message;
import android.support.annotation.Nullable;
import android.support.v4.content.FileProvider;
import android.util.Log;
import android.widget.Toast;

import com.ecpei.common.ZipUtils;
import com.ecpei.core.AppConfig;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.ecpei.core.upgrade.H5Manifest;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.zip.ZipException;
import java.util.zip.ZipOutputStream;

/**
 * Created by lenny on 2017/1/1.
 */

public class UpgradeModule extends ReactContextBaseJavaModule {
    private static final String RECEIVER_ACTION = "com.android.upgrade";
    private final int SHOWDOWNLOADDIALOG = 88;
    private final int UPDATEDOWNLOADDIALOG = 99;
    private final int DOWNLOADFINISHED = 66;
    private final int DOWNLOADFAIL = 77;
    private int contentLength;//要下载文件的大小
    private ProgressDataReceiver progressReceiver;
    public static Context mContext;
    public static boolean isLoadSuccess = false;
    public static boolean isAssets = true;

    private Handler handler = new Handler(Looper.getMainLooper()) {

        public void handleMessage(Message msg) {
            switch (msg.what) {
                case SHOWDOWNLOADDIALOG://显示正在下载的对话框
                    sendReceiver("0000", "0", contentLength, msg.obj.toString());
                    break;
                case UPDATEDOWNLOADDIALOG://刷新正在下载对话框的内容
                    sendReceiver("0001", msg.obj.toString(), contentLength, "");
                    break;
                case DOWNLOADFINISHED://下载完成后进行的操作
                    sendReceiver("0002", contentLength + "", contentLength, msg.obj.toString());
//                    showToast("下载成功");
                    cancelDownLoad();
//                    InstallAPK((String) msg.obj);
                    break;
                case DOWNLOADFAIL:
                    showToast("访问服务器失败");
                default:
                    break;
            }
        }

        ;
    };

    public UpgradeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "UpgradeModule";
    }

    @ReactMethod
    public void init() {
        IntentFilter mIntentFilter = new IntentFilter();
        mIntentFilter.addAction(RECEIVER_ACTION);
        mIntentFilter.setPriority(500);
        progressReceiver = new ProgressDataReceiver();
        getReactApplicationContext().registerReceiver(progressReceiver, mIntentFilter);
    }

    @ReactMethod
    public void cancelDownLoad() {
        getReactApplicationContext().unregisterReceiver(progressReceiver); // 取消广播
        handler.removeCallbacksAndMessages(null);
    }

    @ReactMethod
    public void InstallAPK(String filePath) {
        Intent i = new Intent(Intent.ACTION_VIEW);
        File file = new File(filePath);
        //判断是否是AndroidN以及更高的版本
        i.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        Uri contentUri;
        if (Build.VERSION.SDK_INT >= 24) {
            contentUri = FileProvider.getUriForFile(mContext, AppConfig.APPLICATION_ID + ".file", file);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            i.setDataAndType(contentUri, "application/vnd.android.package-archive");
        } else {
            contentUri = Uri.parse("file://" + filePath);
            i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            i.setDataAndType(contentUri, "application/vnd.android.package-archive");
        }
//        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
//        i.setDataAndType(Uri.parse("file://" + filePath), "application/vnd.android.package-archive");
        // 查询所有符合 intent 跳转目标应用类型的应用，注意此方法必须放置在 setDataAndType 方法之后
        List<ResolveInfo> resolveLists = mContext.getPackageManager().queryIntentActivities(i, PackageManager.MATCH_DEFAULT_ONLY);
        // 然后全部授权
        for (ResolveInfo resolveInfo : resolveLists){
            String packageName = resolveInfo.activityInfo.packageName;
            mContext.grantUriPermission(packageName, contentUri, Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);
        }
        getReactApplicationContext().startActivity(i);
        System.exit(0);
    }


    @ReactMethod
    public void InstallWgt(String wgtPath, final ReadableMap options, final Promise promise) {
        File wgtFile = new File(wgtPath);
        //回传拍照后的截取图片信息
        WritableMap writableMap = Arguments.createMap();
        //升级文件是否存在
        if (wgtFile.exists()) {
            new Thread(new Runnable() {
                @Override
                public void run() {
                    //备份老版本
                    backZipWgt();
                }
            }).start();
            try {
                File file = mContext.getExternalFilesDir("");
                String appsPath = file.toString().replace(File.separator + "files", File.separator + AppConfig.ASSETS_H5_PATH);
                File wwwFile = new File(appsPath);
                if (wwwFile.exists())
                    wwwFile.delete();
                ZipUtils.upZipFile(wgtFile, appsPath);
                //返回信息
                writableMap.putString("status", "1");
                writableMap.putString("www", appsPath);
//                writableMap.putString("back", zipFile.toString());
            } catch (ZipException ex) {
                ex.printStackTrace();
            } catch (IOException ex) {
                ex.printStackTrace();
            }
            promise.resolve(writableMap);
        } else {
        }
    }


    //压缩备份老版本
    private void backZipWgt() {
        File file = mContext.getExternalFilesDir("");
        String appsPath = file.toString().replace(File.separator + "files", File.separator + AppConfig.ASSETS_H5_PATH);
        String backDir = file.toString().replace(File.separator + "files", File.separator + "apps" + File.separator + "back");

        File zipFile = null;

        //获取当前版本信息
        String version = "xx.xx.xx";
        try {
            JSONObject manifestJson = H5Manifest.getManifest(mContext);
            JSONObject versionJson = manifestJson.getJSONObject("version");
            version = versionJson.getString("name");
        } catch (NullPointerException ex) {
            ex.printStackTrace();
            return;
        } catch (JSONException e) {
            e.printStackTrace();
            return;
        }
        String zipPath = backDir + File.separator + this.getReactApplicationContext().getPackageName() + "." + version + ".wgt";

        //压缩老版本文件备份
        try {
            File backFile = new File(backDir);
            if (!backFile.exists())
                backFile.mkdirs();
            zipFile = new File(zipPath);
            if (!zipFile.exists())
                zipFile.createNewFile();
//                zipFile.mkdirs();
            if (new File(appsPath).exists()) {
                ZipOutputStream zipout = new ZipOutputStream(new BufferedOutputStream(new FileOutputStream(zipFile), ZipUtils.BUFF_SIZE));
                ZipUtils.zipFile(new File(appsPath), zipout, "");
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }


    enum UploadFileSuffix {
        APK,
        WGT
    }


    @ReactMethod
    public void startDownLoad(final String downloadUrl, String version, String fileName, int suffixType) {
        if (!isSDcardExist()) {
            showToast("SD卡不存在，下载失败");
            return;
        }
        HashMap hmSuffix = new HashMap();
        hmSuffix.put(UploadFileSuffix.APK.ordinal(), ".apk");
        hmSuffix.put(UploadFileSuffix.WGT.ordinal(), ".wgt");
//        final String downloadUrl = "http://www.online-cmcc.com/gfms/app/apk/4GTraffic2MM.apk";
//        final String filePath = getDownloadPath() + File.separator + fileName + hmSuffix.get(suffixType);

        File file = mContext.getExternalFilesDir("");
        String path = file.toString().replace("/files","/upgrade/");
        File fileDir = new File(path);
        if (!fileDir.exists()){
            fileDir.mkdirs();
        }
        final String filePath =  path + fileName + hmSuffix.get(suffixType);


        if (fileIsExists(filePath) && isLastVersion(filePath, version)) {
            InstallAPK(filePath);
            return;
        }
//        showToast("下载开始");
        new Thread() {
            private InputStream inputStream;
            private FileOutputStream fos;

            public void run() {
//                Looper.prepare();
                try {
                    URL url = new URL(downloadUrl);
                    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                    conn.setRequestMethod("GET");
                    conn.setConnectTimeout(30000);
                    //http请求不要gzip压缩，否则获取的文件大小可以小于文件的实际大小
                    conn.setRequestProperty("Accept-Encoding", "identity");
                    int responseCode = conn.getResponseCode();
                    if (responseCode == 200) {
                        inputStream = conn.getInputStream();
                        File file = new File(filePath);
                        fos = new FileOutputStream(file);
                        contentLength = conn.getContentLength();
                        System.out.println("文件的大小：：" + contentLength);
                        int fileLengthFromHeader = Integer.parseInt(conn.getHeaderField("Content-Length"));
                        System.out.println("根据头文件获取文件的大小：：" + fileLengthFromHeader);

                        //子线程不能显示和刷新UI
                        Message msg = Message.obtain();
                        msg.what = SHOWDOWNLOADDIALOG;
                        msg.obj = filePath;
                        handler.sendMessage(msg);

                        byte[] buffer = new byte[1024];
                        int len = 0;
                        int count = 0;
                        while (((len = inputStream.read(buffer)) != -1)) {
                            fos.write(buffer, 0, len);
                            ++count;
                            if ((contentLength > 1000000 && count % 400 == 0) || (contentLength <= 1000000 && count % 200 == 0)) { //减少发送次数
                                int curlength = (int) file.length();
                                Message updateMsg = Message.obtain();
                                updateMsg.what = UPDATEDOWNLOADDIALOG;
                                updateMsg.obj = curlength;
                                handler.sendMessage(updateMsg);
                                System.out.println("file.length()::" + curlength);
                            }
                        }

                        if (file.length() == contentLength) {
                            //下载完成
                            Message finishedMsg = Message.obtain();
                            finishedMsg.what = DOWNLOADFINISHED;
                            finishedMsg.obj = filePath;
                            handler.sendMessage(finishedMsg);
                        }
                    } else {
                        Message msg = Message.obtain();
                        msg.what = DOWNLOADFAIL;
                        handler.sendMessage(msg);
                    }
                } catch (MalformedURLException e) {
                    e.printStackTrace();
                    System.out.println("MalformedURLException:" + e.getMessage());
                } catch (IOException e2) {
                    e2.printStackTrace();
                    System.out.println("IOException:" + e2.getMessage());
                } finally {
                    try {
                        if (inputStream != null) {
                            inputStream.close();
                        }

                        if (fos != null) {
                            fos.close();
                        }
                    } catch (IOException e) {
                        e.printStackTrace();
                        System.out.println("IOException:" + e.getMessage());
                    }
                }
            }

            ;
        }.start();
    }

    private void showToast(String info) {
        Toast.makeText(getReactApplicationContext(), info, Toast.LENGTH_SHORT).show();
    }

    private String getDownloadPath() {
        return Environment.getExternalStorageDirectory().getAbsolutePath();
    }

    private boolean isSDcardExist() {
        return Environment.getExternalStorageState().equals(Environment.MEDIA_MOUNTED);
    }

    private boolean fileIsExists(String strFile) {
        try {
            File f = new File(strFile);
            if (!f.exists()) {
                return false;
            }

        } catch (Exception e) {
            return false;
        }

        return true;
    }

    private boolean isLastVersion(String filePath, String version) {
        PackageManager pm = getReactApplicationContext().getPackageManager();
        PackageInfo info = pm.getPackageArchiveInfo(filePath, PackageManager.GET_ACTIVITIES);
        if (info != null) {
            int code = info.versionCode;
            String appVersion = info.versionName;
            Log.e("output", "Version------------->>>" + appVersion + "<-->" + version);
            try {
                int appCode = pm.getPackageInfo(getReactApplicationContext().getPackageName(), 0).versionCode;
                if (code > appCode && appVersion.equals(version)) {
                    return true;
                }
            } catch (PackageManager.NameNotFoundException e) {
                return false;
            }
        }
        return false;
    }


    private void sendReceiver(String code, String currLength, Integer fileLength, @Nullable String filePath) {
//        Intent intent = new Intent(RECEIVER_ACTION);
//        intent.putExtra("code", code);
//        intent.putExtra("currLength", currLength);
//        intent.putExtra("fileLength", fileLength);

        WritableMap writableMap = new WritableNativeMap();
        writableMap.putString("code", code);
        writableMap.putString("downSize", currLength);
        writableMap.putString("fileSize", fileLength.toString());
        writableMap.putString("filePath", filePath);
//        getReactApplicationContext().sendBroadcast(intent);
        sendTransMisson(getReactApplicationContext(), "downProgress", writableMap);
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

    private class ProgressDataReceiver extends BroadcastReceiver {
        @Override
        public void onReceive(Context context, Intent intent) {
            String action = intent.getAction();
            if (RECEIVER_ACTION.equals(action)) {
                WritableMap params = Arguments.createMap();
                params.putString("code", intent.getStringExtra("code"));
                params.putString("downSize", intent.getStringExtra("currLength"));
                params.putInt("fileSize", intent.getIntExtra("fileLength", 0));
                getReactApplicationContext().getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                        .emit("progress", params);
                ;
            }
        }
    }

    @ReactMethod
    public void getH5SourceLoadStatus(Promise promise) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("isLoadSuccess", (isLoadSuccess));
        params.putBoolean("isAssets", (isAssets));
        promise.resolve(params);
    }

//    private void APKupgrade(Activity activity){
//        File file = activity.getBaseContext().getExternalFilesDir("");
//        String appsFile = file.toString().replace("/files", "/"+ BuildConfig.ASSETS_H5_PATH);
//        if (isSDcardExist()) {
//            //SD卡存在
//            if(new File(appsFile + "/manifest.json").exists()){
//                //本地有解压资源包
//                if(新资源包版本比本地高){
////                    删除本地
//                }else{
////                    不操作
//                }
//            }else{
////                不管
//            }
//        }
//    }
//
//    private void wgtUpgrade(){
//        if (SD卡存在){
//            if(本地有资源包){
//                if(版本比本地高){
//                    删除本地资源包
//                    解压新的资源包
//                }
//            }else{
//               解压
//            }
//        }
//    }
}