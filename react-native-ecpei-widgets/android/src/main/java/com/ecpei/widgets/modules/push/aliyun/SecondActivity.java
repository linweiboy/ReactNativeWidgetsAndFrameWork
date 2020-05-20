package com.ecpei.widgets.modules.push.aliyun;

import com.alibaba.sdk.android.push.AndroidPopupActivity;
import java.util.Map;

public class SecondActivity extends AndroidPopupActivity {

    /**
     * 实现通知打开回调方法，获取通知相关信息
     * @param title     标题
     * @param summary   内容
     * @param extMap    额外参数
     */
    @Override
    protected void onSysNoticeOpened(String title, String summary, Map<String, String> extMap) {}
}
