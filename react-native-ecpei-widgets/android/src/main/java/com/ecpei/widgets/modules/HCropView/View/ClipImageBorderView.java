package com.ecpei.widgets.modules.HCropView.View;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Paint.Style;
import android.util.AttributeSet;
import android.util.Log;
import android.util.TypedValue;
import android.view.View;

/**
 * @author zhy
 * http://blog.csdn.net/lmj623565791/article/details/39761281
 */
public class ClipImageBorderView extends View {
    /**
     * 水平方向与View的边距
     */
    private int mHorizontalPadding;

    /**
     * 垂直方向与View的边距
     */
    private int mVerticalPadding;
    /**
     * 绘制的矩形的宽度
     */
    private int mWidth;
    /**
     * 边框的颜色，默认为白色
     */
    private int mBorderColor = Color.parseColor("#FFFFFF");


    private Paint mPaint;

    private int borderWidth = 0;

    private int borderHeight = 0;

    /**
     * 小线长度 单位dp
     */
    private int linelength = 0;
    /**
     * 小线宽度 单位dp
     */
    private int mBorderWidth = 0;

    public ClipImageBorderView(Context context) {
        this(context, null);
        init(context, null);
    }

    public ClipImageBorderView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
        init(context, attrs);
    }

    public ClipImageBorderView(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
        init(context, attrs);
    }

    public void init(Context context, AttributeSet attrs) {
        mBorderWidth = (int) TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP, mBorderWidth, getResources()
                        .getDisplayMetrics());
        mPaint = new Paint();
        mPaint.setAntiAlias(true);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        // 计算矩形区域的宽度
        mWidth = getWidth() - 2 * mHorizontalPadding;
        // 计算距离屏幕垂直边界 的边距
        mVerticalPadding = (getHeight() - mWidth) / 2;
        mPaint.setColor(Color.parseColor("#aa000000"));
        mPaint.setStyle(Style.FILL);
//		// 绘制左边1
//		canvas.drawRect(0, 0, mHorizontalPadding, getHeight(), mPaint);
//		// 绘制右边2
//		canvas.drawRect(getWidth() - mHorizontalPadding, 0, getWidth(),
//				getHeight(), mPaint);
//		// 绘制上边3
//		canvas.drawRect(mHorizontalPadding, 0, getWidth() - mHorizontalPadding,
//				mVerticalPadding, mPaint);
//		// 绘制下边4
//		canvas.drawRect(mHorizontalPadding, getHeight() - mVerticalPadding,
//				getWidth() - mHorizontalPadding, getHeight(), mPaint);

        float xWidth = (getWidth() - borderWidth) / 2;
        float yHeight = (getHeight() - borderHeight) / 2;
        // 绘制左边1
        canvas.drawRect(0, 0, (int) xWidth, getHeight(), mPaint);
        // 绘制右边2
        canvas.drawRect((int) xWidth + borderWidth, 0, getWidth(), getHeight(), mPaint);
        // 绘制上边3
        canvas.drawRect((int) xWidth, 0, (int) xWidth + borderWidth, (int) yHeight, mPaint);
        // 绘制下边4
        canvas.drawRect((int) xWidth, (int) yHeight + borderHeight, (int) xWidth + borderWidth, getHeight(), mPaint);

        // 绘制外边框
        mPaint.setColor(mBorderColor);
        mPaint.setStrokeWidth(mBorderWidth);

        if ( linelength != 0 && mBorderWidth != 0){
            //左上橫
            canvas.drawLine((int) xWidth, (int) yHeight + (mBorderWidth / 2), (int) xWidth + linelength, (int) yHeight + (mBorderWidth / 2), mPaint);
            //左上竖
            canvas.drawLine((int)xWidth + (mBorderWidth / 2), (int) yHeight, (int)xWidth + (mBorderWidth / 2), (int) yHeight + linelength, mPaint);
            //左下横
            canvas.drawLine((int) xWidth, (int) yHeight + borderHeight - (mBorderWidth / 2), (int) xWidth + linelength, (int) yHeight + borderHeight - (mBorderWidth / 2), mPaint);
            //左下竖
            canvas.drawLine((int)xWidth+(mBorderWidth/2) ,(int)yHeight - linelength + borderHeight  ,(int)xWidth+(mBorderWidth/2) ,(int)yHeight + borderHeight  ,mPaint);
            //右上横
            canvas.drawLine((int)xWidth + borderWidth - linelength, (int)yHeight + (mBorderWidth/2),(int)xWidth + borderWidth ,(int)yHeight + (mBorderWidth/2),mPaint );
            //右上竖
            canvas.drawLine((int)xWidth + borderWidth - (mBorderWidth / 2), (int) yHeight, (int)xWidth + borderWidth - (mBorderWidth / 2), (int) yHeight + linelength, mPaint);
            //右下横
            canvas.drawLine((int)xWidth + borderWidth - linelength, (int)yHeight + borderHeight - (mBorderWidth/2),(int)xWidth + borderWidth ,(int)yHeight + borderHeight - (mBorderWidth/2),mPaint );
            //右下竖
            canvas.drawLine((int)xWidth + borderWidth - (mBorderWidth/2) ,(int)yHeight - linelength + borderHeight  ,(int)xWidth + borderWidth - (mBorderWidth/2) ,(int)yHeight + borderHeight  ,mPaint);
        }
    }

    public void setHorizontalPadding(int mHorizontalPadding) {
        this.mHorizontalPadding = mHorizontalPadding;
    }

    public void setBorder(int width, int height) {
        this.borderWidth = width;
        this.borderHeight = height;
    }

    public void setBorderColor(String color) {
        this.mBorderColor = Color.parseColor(color);
    }

    public void setLineBorder(int lineWidth, int lineHeight) {
        this.linelength = lineWidth;
        this.mBorderWidth = lineHeight;
    }
}
