package com.ecpei.widgets.modules.common;

import android.Manifest;
import android.app.Activity;
import android.app.Application;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Matrix;
import android.hardware.Camera;
import android.os.Build;
import android.support.annotation.Nullable;
import android.content.Context;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.view.Display;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.Toast;

import com.ecpei.common.BitmapCut;
import com.ecpei.common.ImageUtil;
import com.ecpei.core.AppConfig;
import com.ecpei.core.upgrade.H5Manifest;
import com.ecpei.core.upgrade.IUpgradeReactNative;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.views.textinput.ReactEditText;

import org.json.JSONObject;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

import static android.content.ContentValues.TAG;


public class ToolsModule extends ReactContextBaseJavaModule {

    public static final String REACTCLASSNAME = "ToolsModule";
    private final int TAG_ID = 0xdeadbeaf;
    public static Context mContext;
    public static ReactContext rContext;

    public ToolsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
        rContext = this.getReactApplicationContext();
    }

    public ToolsModule() {
        super((ReactApplicationContext) mContext);
    }

    @Override
    public String getName() {
        return REACTCLASSNAME;
    }

//    @ReactMethod
//    public void startActivityByClassname(String name, String url) {
//        startActivityByClassname(name, url, null);
//    }

    /**
     * js页面跳转到activity 并传数据
     *
     * @param name
     */
    @ReactMethod
    public void startActivityByClassname(String name, String url) {
        try {
            Activity currentActivity = getCurrentActivity();
            if (null != currentActivity) {
                Class aimActivity = Class.forName(name);
                Intent intent = new Intent(currentActivity, aimActivity);
                intent.putExtra("url", url);
//                params = (params == null ? "" : params);
//                intent.putExtra("params", params);
                currentActivity.startActivity(intent);
            }
        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException(
                    "无法打开activity页面: " + e.getMessage());
        }
    }

    @ReactMethod
    public void NativeNotice(String event, String params) {
//        try {
//            JSONObject jsonObject = new JSONObject(params.toString());
//            Iterator iterator = jsonObject.keys();
        WritableMap writableMap = new WritableNativeMap();
        writableMap.putString("event", event);
        writableMap.putString("data", params.toString());
//            while (iterator.hasNext()) {
//                String key = (String) iterator.next();
//                String value = jsonObject.getString(key);
//                writableMap.putString(key, value);
//            }
        sendTransMisson((ReactApplicationContext) mContext, "NativeNotice", writableMap);
//        } catch (JSONException ex) {
//
//        }

    }

    // android.os.Environment.getExternalStorageDirectory() + File.separator + AppConfig.APPLICATION_ID +
    private String filePath = this.getReactApplicationContext().getExternalCacheDir().getAbsolutePath() + File.separator + "cutImage" + File.separator;

    @ReactMethod
    public boolean CutImage(String path, final ReadableMap options, final Promise promise) {
        BitmapCut bitmapCut = new BitmapCut();
        path = path.replace("file://", "");
        String fileImage = null;
        try {
            File file = new File(path);
            FileInputStream fis = new FileInputStream(file);
            int permissionCheck = ContextCompat.checkSelfPermission(getCurrentActivity(),
                    Manifest.permission.WRITE_CALENDAR);
            Bitmap bitmap = BitmapFactory.decodeStream(fis);
            //获取实际截取宽高
            int _w = bitmap.getWidth();
            int _h = bitmap.getHeight();
            double rnWidth = options.getDouble("rnWidth");
            double rnHeight = options.getDouble("rnHeight");
            //图片是否需要翻转
            int degrees = 0;
            if (options.getBoolean("direction") && _w > _h) {
                degrees = 90;
                _w = bitmap.getHeight();
                _h = bitmap.getWidth();
            }
            if (options.hasKey("layoutWidth") && options.hasKey("layoutHeight")) {
                //对应展示的视图大小
                int viewWidth = options.getInt("layoutWidth");
                int viewHeight = options.getInt("layoutHeight");

                //处理部分机型视图和获取的图片大小不一致问题。
                if (viewHeight - _h > 0 || viewWidth - _w > 0) {
                    int _width = viewWidth;
                    int _height = viewHeight;
                    int _left = (viewWidth - _w) / 2;
                    int _top = (viewHeight - _h) / 2;
                    if (degrees == 90) {
                        int _tmp = _left;
                        _left = _top;
                        _top = _left;
                        _tmp = _width;
                        _width = _height;
                        _height = _width;
                    }

                    Bitmap whiteBgBitmap = Bitmap.createBitmap(_width, _height, Bitmap.Config.ARGB_8888);
                    Canvas canvas = new Canvas(whiteBgBitmap);
                    canvas.drawColor(Color.RED);
                    canvas.drawBitmap(bitmap, _left, _top, null);
                    bitmap = whiteBgBitmap;
                    _w = _width;
                    _h = _height;
                }
            }
            double measureW = (_w / rnWidth);
            double measureH = (_h / rnHeight);
            //无需转换方向位置大小信息
            int left = (int) (options.getInt("x") * measureW);
            int top = (int) (options.getInt("y") * measureH);
            int width = (int) (options.getInt("width") * measureW);
            int height = (int) (options.getInt("height") * measureH);


            //剪裁图片
            bitmap = BitmapCut.bitmapCrop(bitmap, left, top, width, height, degrees);
            //filePath = getCurrentActivity().getFilesDir().toString() + File.separator + "cache" + File.separator + ImageUtil.createFileName(".jpg");
            fileImage = filePath + ImageUtil.createFileName(".jpg");
            //判断文件夹是否存在
            if (isFolderExists(filePath)) {
                if (!options.hasKey("base64") || options.getBoolean("base64")) {
                    //回传拍照后的截取图片信息
                    WritableMap writableMap = Arguments.createMap();
                    writableMap.putString("path", fileImage);
                    writableMap.putString("base64image", BitmapCut.bitmapToBase64(bitmap));
                    promise.resolve(writableMap);
                }

                if (!options.hasKey("imageFile") || options.getBoolean("imageFile")) {
                    FileOutputStream out = new FileOutputStream(fileImage);
                    bitmap.compress(Bitmap.CompressFormat.JPEG, options.getInt("quality"), out);
                    out.flush();
                    out.close();
                }
                //   /storage/emulated/0/DCIM/20171228_162351.jpg
            }
            //            释放内存
            if (bitmap != null && !bitmap.isRecycled()) {
                bitmap.recycle();
                bitmap = null;
            }
            System.gc();
        } catch (IOException ex) {
            Log.w("", ex.getMessage());
        }
        return true;
    }

    /**
     * 得到bitmap的大小
     */
    public static int getBitmapSize(Bitmap bitmap) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {    //API 19
            return bitmap.getAllocationByteCount();
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB_MR1) {//API 12
            return bitmap.getByteCount();
        }
        // 在低版本中用一行的字节x高度
        return bitmap.getRowBytes() * bitmap.getHeight();
    }

    public static double base64file_size( String base64String )  {

        //1.获取base64字符串长度(不含data:audio/wav;base64,文件头)
        int size0 = base64String.length();

        //2.获取字符串的尾巴的最后10个字符，用于判断尾巴是否有等号，正常生成的base64文件'等号'不会超过4个
        String tail = base64String.substring(size0-10);

        //3.找到等号，把等号也去掉,(等号其实是空的意思,不能算在文件大小里面)
        int equalIndex = tail.indexOf("=");
        if(equalIndex > 0) {
            size0 = size0 - (10 - equalIndex);
        }

        //4.计算后得到的文件流大小，单位为字节
        return size0 -( (double)size0 / 8 ) * 2;
    }

    /**
     * 针对全景图之类的尺寸大的图片缩放
     * @param path
     * @return
     */
    public Bitmap bitmapZoom(BitmapFactory.Options options,int screenWidth,int screenHeight,String path){
        options.inJustDecodeBounds = true;
        Bitmap bitmap = null;
        BitmapFactory.decodeFile(path,options);
        //获取图片的宽高
        int picWidth = options.outWidth;
        int picHeight = options.outHeight;
        //isSampleSize 是表示对图片的缩放程序，比如值为2图片的宽度和高度都变为以前的1/2
        options.inSampleSize = 1;
        //根据屏幕的大小和图片大小计算出缩放比例
        if (picWidth > picHeight){
            if (picWidth > screenWidth)
                options.inSampleSize = picWidth/screenWidth;
        }else {
            if (picHeight > screenHeight)
                options.inSampleSize = picHeight/screenHeight;
        }
        //这次在真正生成一个有像素的，经过缩放了的Bitmap
        options.inJustDecodeBounds = false;
        bitmap = BitmapFactory.decodeFile(path,options);
        return bitmap;
    }

    /**
     *  判断大小的压缩
     *  小于1M的图片不进行压缩
     * @param path
     * @param options
     * @param promise
     * @return
     */
    @ReactMethod
    public boolean CompressImageMin(String path,final ReadableMap options,final Promise promise){
        BitmapCut bitmapCut = new BitmapCut();
        path = path.replace("file://", "");
        String fileImage = null;
        try {
            BitmapFactory.Options options1 = new BitmapFactory.Options();
            BitmapFactory.decodeFile(path,options1);
            //获取屏幕宽高
            WindowManager windowManager = rContext.getCurrentActivity().getWindowManager();
            Display display = windowManager.getDefaultDisplay();
            Bitmap bitmap = null;
            int screenWidth = display.getWidth();
            int screenHeight = display.getHeight();
            if ( (options1.outWidth > screenWidth) && (options1.outHeight > screenHeight)){
                bitmap = bitmapZoom(options1,screenWidth,screenHeight,path);  //当图片的宽高都比屏幕宽高大时，把图片按照比例缩放
            }else {
                bitmap = BitmapFactory.decodeFile(path);
            }
            fileImage = filePath + ImageUtil.createFileName(".jpg");
            //判断图片的大小小于1M 则不进行压缩，并返回Base64
            if( getBitmapSize(bitmap)/1024 < (options.getInt("size") == 0 ? 1024 : options.getInt("size")) ){
                WritableMap writableMap = Arguments.createMap();
                if (!options.hasKey("base64") || options.getBoolean("base64")){
                    writableMap.putString("base64image",BitmapCut.bitmapToBase64(bitmap));
//                    writableMap.putString("base64image",BitmapCut.bitmapToBase64Param(bitmap,80));
                    writableMap.putString("path", fileImage);
                    FileOutputStream out = new FileOutputStream(fileImage);
                    bitmap.compress(Bitmap.CompressFormat.JPEG, 100, out);
                    out.flush();
                    out.close();
                }
                promise.resolve(writableMap);
            }else{
                bitmap = bitmapCut.compressImage(bitmap, options.getInt("size") == 0 ? 200 : options.getInt("size"), options.getInt("jpegQuality") == 0 ? 100 : options.getInt("jpegQuality"));
                //判断文件夹是否存在
                if (isFolderExists(filePath)) {
                    //回传拍照后的截取图片信息
                    WritableMap writableMap = Arguments.createMap();
                    if (!options.hasKey("base64") || options.getBoolean("base64")) {
                        writableMap.putString("base64image", BitmapCut.bitmapToBase64(bitmap));
//                        writableMap.putString("base64image", BitmapCut.bitmapToBase64Param(bitmap,80));
                    }
                    if (!options.hasKey("imageFile") || options.getBoolean("imageFile")) {
                        writableMap.putString("path", fileImage);
                        FileOutputStream out = new FileOutputStream(fileImage);
                        bitmap.compress(Bitmap.CompressFormat.JPEG, options.getInt("jpegQuality"), out);
                        out.flush();
                        out.close();
                    }
                    promise.resolve(writableMap);
                }
            }
            //            释放内存
            if (bitmap != null && !bitmap.isRecycled()) {
                bitmap.recycle();
                bitmap = null;
            }
            System.gc();
        } catch (FileNotFoundException ex) {
            promise.reject(ex);
        } catch (OutOfMemoryError ex) {
            promise.reject(ex);
            Toast.makeText(getCurrentActivity(), "内存不够，请释放内存", Toast.LENGTH_SHORT).show();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return true;
    }

    @ReactMethod
    public boolean CompressImage(String path, final ReadableMap options, final Promise promise) {
        BitmapCut bitmapCut = new BitmapCut();
        path = path.replace("file://", "");
        String fileImage = null;
        try {
            File file = new File(path);
            FileInputStream fis = new FileInputStream(file);
            Bitmap bitmap = BitmapCut.getBitmapFromStream(fis);

            bitmap = bitmapCut.compressImage(bitmap, options.getInt("size") == 0 ? 200 : options.getInt("size"), options.getInt("jpegQuality") == 0 ? 100 : options.getInt("jpegQuality"));

//            fileImage = filePath + ImageUtil.createFileName(file.getName().substring(file.getName().lastIndexOf(".") + 1));

            fileImage = filePath + ImageUtil.createFileName(".jpg");
            //判断文件夹是否存在
            if (isFolderExists(filePath)) {
                //回传拍照后的截取图片信息
                WritableMap writableMap = Arguments.createMap();
                if (!options.hasKey("base64") || options.getBoolean("base64")) {
                    writableMap.putString("base64image", BitmapCut.bitmapToBase64(bitmap));
                }
                if (!options.hasKey("imageFile") || options.getBoolean("imageFile")) {
                    writableMap.putString("path", fileImage);
                    FileOutputStream out = new FileOutputStream(fileImage);
                    bitmap.compress(Bitmap.CompressFormat.JPEG, options.getInt("jpegQuality"), out);
                    out.flush();
                    out.close();
                }
                promise.resolve(writableMap);
                //   /storage/emulated/0/DCIM/20171228_162351.jpg
            }
            //            释放内存
            if (bitmap != null && !bitmap.isRecycled()) {
                bitmap.recycle();
                bitmap = null;
            }
            System.gc();
        } catch (FileNotFoundException ex) {
            promise.reject(ex);
        } catch (OutOfMemoryError ex) {
            promise.reject(ex);
            Toast.makeText(getCurrentActivity(), "内存不够，请释放内存", Toast.LENGTH_SHORT).show();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return true;
    }

    private boolean isFolderExists(String strFolder) {
        File file = new File(strFolder);
        if (!file.exists()) {
            if (file.mkdirs()) {
                return true;
            } else
                return false;
        }
        return true;
    }

    @ReactMethod
    public void GetManifest(final Promise promise) {
        JSONObject jsonObject = H5Manifest.getManifest(mContext);
        String _json = "";
        if (jsonObject != null)
            _json = jsonObject.toString();
        promise.resolve(_json);
    }

    /**
     * 重新加载初始化ReactNative应用
     */
    @ReactMethod
    public void reLoad() {
        IUpgradeReactNative UpgradeReactNative = (IUpgradeReactNative) this.getReactApplicationContext().getApplicationContext();
        UpgradeReactNative.reCreateReactNativeHost();

        final Activity currentActivity = this.getCurrentActivity();
        if (currentActivity == null) {
            // The currentActivity can be null if it is backgrounded / destroyed, so we simply
            // no-op to prevent any null pointer exceptions.
            return;
        }
        currentActivity.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                currentActivity.recreate();
            }
        });
    }

    /**
     * 部分手机无法判断权限是否被拒
     * 由此判断摄像头是否可用
     *
     * @param callback
     */
    @ReactMethod
    public void isPermissionCompatibleCamera(Callback callback) {
        boolean isCanUse = true;
        Camera mCamera = null;
        try {
            mCamera = Camera.open();
            Camera.Parameters mParameters = mCamera.getParameters(); //针对魅族手机
            mCamera.setParameters(mParameters);
        } catch (NullPointerException e) {
            isCanUse = false;
        }
        if (mCamera != null) {
            try {
                mCamera.release();
            } catch (NullPointerException e) {
                e.printStackTrace();
                isCanUse = false;
            }
        }
        callback.invoke(isCanUse);
    }

    /**
     * 隐藏系统自带键盘
     */
    @ReactMethod
    public void forbidPopupKeyboard() {
        InputMethodManager imm = (InputMethodManager) mContext.getSystemService(Context.INPUT_METHOD_SERVICE);
        if (null != imm) {
            if (null != getCurrentActivity().getCurrentFocus()) {
                imm.hideSoftInputFromWindow(getCurrentActivity().getCurrentFocus().getWindowToken(), InputMethodManager.HIDE_NOT_ALWAYS);
//                imm.toggleSoftInput(InputMethodManager.HIDE_NOT_ALWAYS,0);
            } else {
                View view = new View(mContext);
                imm.hideSoftInputFromWindow(view.getWindowToken(), InputMethodManager.HIDE_NOT_ALWAYS);
            }
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

    /**
     * @param eventName 事件名
     * @param params    传惨
     */
    public static void sendMisson(String eventName, @Nullable WritableMap params) {
        if (null == rContext) {
            Log.e(TAG, "reactContext==null");
        } else {
            rContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }
    }

}
