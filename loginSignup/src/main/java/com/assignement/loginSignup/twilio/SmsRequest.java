package com.assignement.loginSignup.twilio;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SmsRequest {

    private final String phone;
    private final String message;

    public SmsRequest(String phone, String message) {
        this.phone = phone;
        this.message = message;
    }

    public String getPhone() {
        return phone;
    }

    public String getMessage() {
        return message;
    }

    @Override
    public String toString() {
        return "SmsRequest{" +
                "phone='" + phone + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
