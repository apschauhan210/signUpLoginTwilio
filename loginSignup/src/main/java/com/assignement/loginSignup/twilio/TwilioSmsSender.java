package com.assignement.loginSignup.twilio;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.rest.api.v2010.account.MessageCreator;
import com.twilio.type.PhoneNumber;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("twilio")
public class TwilioSmsSender implements SmsSender{

    private final static Logger LOGGER = LoggerFactory.getLogger(TwilioSmsSender.class);

    private final TwilioConfiguration twilioConfiguration;

    @Autowired
    public TwilioSmsSender(TwilioConfiguration twilioConfiguration) {
        this.twilioConfiguration = twilioConfiguration;
    }

    @Override
    public void sendSms(SmsRequest smsRequest) {
        if(isPhoneNumberValid(smsRequest.getPhone())){
            PhoneNumber to = new PhoneNumber(smsRequest.getPhone());
            PhoneNumber from = new PhoneNumber(twilioConfiguration.getTrialNumber());
            String message = smsRequest.getMessage();

            MessageCreator creator = Message.creator(to, from, message);
            creator.create();
            LOGGER.info("Send SMS {} " + smsRequest);
        } else {
            throw new IllegalArgumentException("Phone number [" + smsRequest.getPhone() + "] is not a valid number");
        }
    }

    private boolean isPhoneNumberValid(String phone) {
        return true;
    }


}
