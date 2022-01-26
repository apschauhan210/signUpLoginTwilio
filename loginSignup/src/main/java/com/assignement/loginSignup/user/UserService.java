package com.assignement.loginSignup.user;

import com.assignement.loginSignup.twilio.SmsRequest;
import com.assignement.loginSignup.twilio.TwilioSmsSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final TwilioSmsSender twilioSmsSender;

    @Autowired
    public UserService(UserRepository userRepository, @Qualifier("twilio") TwilioSmsSender twilioSmsSender) {
        this.userRepository = userRepository;
        this.twilioSmsSender = twilioSmsSender;
    }

    public User getUserByPhone(String phone){
        return userRepository.findUserByPhone(phone)
                .orElseThrow(() -> new IllegalStateException("User with phone number " + phone + " doesn't exist"));
    }

    public String requestOTP(User user){
        Optional<User> tempUser = userRepository.findUserByPhone(user.getPhone());
        if(tempUser.isPresent()){
            throw new IllegalStateException("The phone number is already taken");
        }
        int max = 999999, min = 100000;
        int otp = (int) (Math.floor(Math.random()*(max - min + 1)) + min);
        twilioSmsSender.sendSms(new SmsRequest(user.getPhone(), "Your OTP for signup is " + otp));
        return String.valueOf(otp);
    }

    public User registerUser(User user){
        userRepository.save(user);
        return user;
    }

    public User deleteUser(String phone){
        Optional<User> tempUser = userRepository.findUserByPhone(phone);
        if(tempUser.isEmpty())
            throw new IllegalStateException("The user with phone number " + phone + " doesn't exist");
        userRepository.delete(tempUser.get());
        return tempUser.get();
    }
}
