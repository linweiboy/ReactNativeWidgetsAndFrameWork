package com.ecpei.widgets.modules.HCropView.event;

public class GetImageEvent {

    private String base64;
    private String status;
    private String path;
    private String action;

    public GetImageEvent(String status,String base64,String path,String action){
        this.status = status;
        this.base64 = base64;
        this.path = path;
        this.action = action;
    }

    public String getBase64() {
        return base64;
    }

    public String getPath() {
        return path;
    }

    public String getStatus() {
        return status;
    }

    public String getAction() {
        return action;
    }
}
