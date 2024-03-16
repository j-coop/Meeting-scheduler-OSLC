package com.example.meeting_scheduler.controllers;

import com.example.meeting_scheduler.dto.dto_builders.UserDTOsBuilder;
import com.example.meeting_scheduler.dto.user.UserCreateDTO;
import com.example.meeting_scheduler.dto.user.UserDTO;
import com.example.meeting_scheduler.dto.user.UsersDTO;
import com.example.meeting_scheduler.entities.MeetingParticipation;
import com.example.meeting_scheduler.entities.User;
import com.example.meeting_scheduler.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<UsersDTO> getUsers(@RequestParam String search) {
        try {
            List<User> users = userService.findByLoginSearch(search);
            if (users == null) {
                users = List.of();
            }
            return ResponseEntity.ok(UserDTOsBuilder.usersToUsersDTO(users));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable UUID id) {
        User user = userService.findByUserId(id);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        UserDTO userDTO = UserDTOsBuilder.userToDTO(user);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/login/{login}")
    public ResponseEntity<UserDTO> getUserByLogin(@PathVariable String login) {
        User user = userService.findByLogin(login);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        UserDTO userDTO = UserDTOsBuilder.userToDTO(user);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserDTO> getUserByEmail(@PathVariable String email) {
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        UserDTO userDTO = UserDTOsBuilder.userToDTO(user);
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/login")
    public ResponseEntity<UUID> checkLogin(
            @RequestParam String login,
            @RequestParam String password
    )
    {
        if (userService.checkLogin(login, password)) {
            // return sign in token
            return ResponseEntity.ok(UUID.randomUUID());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Void> addUser(@RequestBody UserCreateDTO userCreateDTO) {
        User user = userService.findByEmail(userCreateDTO.getEmail());
        if (user != null) return ResponseEntity.status(HttpStatus.CONFLICT).build();
        user = userService.findByLogin(userCreateDTO.getLogin());
        if (user != null) return ResponseEntity.status(HttpStatus.CONFLICT).build();

        user = userService.addUser(
                userCreateDTO.getLogin(),
                userCreateDTO.getFullName(),
                userCreateDTO.getEmail(),
                userCreateDTO.getTimezone(),
                userCreateDTO.getPassword()
        );
        return ResponseEntity.created(URI.create("/users/"+user.getUserId())).build();
    }

    @PutMapping("/{id}/email")
    public ResponseEntity<Void> changeEmail() {
        return null;
    }

}
