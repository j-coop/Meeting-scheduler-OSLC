package com.example.meeting_scheduler.controllers;

import com.example.meeting_scheduler.dto.dto_builders.UserDTOsBuilder;
import com.example.meeting_scheduler.dto.user.UserDTO;
import com.example.meeting_scheduler.entities.MeetingParticipation;
import com.example.meeting_scheduler.entities.User;
import com.example.meeting_scheduler.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<UserDTO> getStudentById(@PathVariable UUID id) {
        User user = userService.findByUserId(id);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        UserDTO userDTO = UserDTOsBuilder.userToDTO(user);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/login/{login}")
    public ResponseEntity<UserDTO> getStudentByLogin(@PathVariable String login) {
        User user = userService.findByLogin(login);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        UserDTO userDTO = UserDTOsBuilder.userToDTO(user);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserDTO> getStudentByEmail(@PathVariable String email) {
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        UserDTO userDTO = UserDTOsBuilder.userToDTO(user);
        return ResponseEntity.ok(userDTO);
    }

}
