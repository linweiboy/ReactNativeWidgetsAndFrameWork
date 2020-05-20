package com.ecpei.widgets.modules.HCropView.View;

import android.content.Context;
import android.graphics.Bitmap;
import android.support.annotation.Nullable;
import android.util.AttributeSet;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.ecpei.widgets.R;

public class HCropViewLayout extends LinearLayout {

    private CustomImageView mCustomImageView;
    private ClipImageBorderView clipImageBorderView;
    private Context mContext;
    private int width = 0;
    private int height = 0;

    public HCropViewLayout(Context context) {
        super(context);
        init(context);
    }

    public HCropViewLayout(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init(context);
    }

    public HCropViewLayout(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context);
    }

    private void init(Context context){
        mContext = context;
        inflate(context, R.layout.h_corp_layout,this);
        mCustomImageView = findViewById(R.id.custom_iv);
        clipImageBorderView = findViewById(R.id.clip_image_border);
        clipImageBorderView.setHorizontalPadding(0);
    }

    public void setBitmapImage(Bitmap bitmap){
        mCustomImageView.setImageBitmap(bitmap);
    }

    public void setRotationAngle(int angles){
        mCustomImageView.clickRotation(angles);
    }

    public void setCropSize(int cropWidth,int cropHeight){
        this.width = dp2px(cropWidth);
        this.height = dp2px(cropHeight);
        clipImageBorderView.setBorder(width,height);
    }

    public void setCropLineSize(int lineWidth,int lineHeight){
        clipImageBorderView.setLineBorder(dp2px(lineWidth),dp2px(lineHeight));
    }

    public void setLineColor(String color){
        clipImageBorderView.setBorderColor(color);
    }

    /**
     * 裁剪图片
     * @return
     */
    public Bitmap getCorpBitmap(){
        Bitmap bitmap = mCustomImageView.clip(width,height);
        return bitmap;
    }

    //将dp转换为与之相等的px
    public int dp2px(float dipValue){
        final float scale = mContext.getResources().getDisplayMetrics().density;
        return (int)(dipValue * scale + 0.5f);
    }
}
