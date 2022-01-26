package com.assignement.loginSignup.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "assignment")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(path = "user")
    public ResponseEntity<User> getUserByPhone(@RequestParam String phone){
        return new ResponseEntity<User>(userService.getUserByPhone(phone), HttpStatus.OK);
    }

    @PostMapping(path = "requestotp")
    public ResponseEntity<String> requestOTP(@RequestBody User user){
        return new ResponseEntity<String>(userService.requestOTP(user), HttpStatus.OK) ;
    }

    @PostMapping(path = "register")
    public ResponseEntity<User> registerUser(@RequestBody User user){
        return new ResponseEntity<>(userService.registerUser(user), HttpStatus.CREATED);
    }

    @PostMapping(path = "login")
    public ResponseEntity<Boolean> validateUser(@RequestBody User user){
        Optional<User> user1 = Optional.ofNullable(userService.getUserByPhone(user.getPhone()));
        if(user1.isPresent()){
            if(user1.get().getPassword().equals(user.getPassword()))
                return new ResponseEntity<Boolean>(true, HttpStatus.ACCEPTED);
            else
                return new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
        }
        else
            return new ResponseEntity<Boolean>(false, HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping(path = "delete")
    public ResponseEntity<User> deleteUser(@RequestParam String phone){
        return new ResponseEntity<>(userService.deleteUser(phone), HttpStatus.OK);
    }
}
