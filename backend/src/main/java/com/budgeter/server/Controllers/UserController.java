package com.budgeter.server.Controllers;
import com.budgeter.server.Entities.User;
import com.budgeter.server.UserDTO;
import com.budgeter.server.Repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    private final UserRepository userRepo;

    public UserController(UserRepository userRepository){
        this.userRepo = userRepository;
    }

    @CrossOrigin(origins="http://localhost:3000")
    @PostMapping("/login")
    public Long login(@RequestBody UserDTO login){
        User user = userRepo.findByUsername(login.getUsername());
        return user.getId();
    }

}
