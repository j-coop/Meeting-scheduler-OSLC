package com.example.meeting_scheduler.controllers;

import com.example.meeting_scheduler.dto.user.UserDTO;
import com.example.meeting_scheduler.dto.user.UsersDTO;
import com.example.meeting_scheduler.entities.MeetingParticipation;
import com.example.meeting_scheduler.entities.User;
import com.example.meeting_scheduler.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController("/meetings")
public class MeetingController {
    @Autowired
    private final UserService userService;

    public MeetingController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users/id/{id}")
    public ResponseEntity<UserDTO> getStudentById(@PathVariable UUID id) {
        User user = userService.findByUserId(id);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        UserDTO userDTO = userToDTO(user);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/users/login/{login}")
    public ResponseEntity<UserDTO> getStudentByLogin(@PathVariable String login) {
        User user = userService.findByLogin(login);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        UserDTO userDTO = userToDTO(user);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/users/email/{email}")
    public ResponseEntity<UserDTO> getStudentByEmail(@PathVariable String email) {
        User user = userService.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        UserDTO userDTO = userToDTO(user);
        return ResponseEntity.ok(userDTO);
    }

    private UserDTO userToDTO(User user) {
        if (user == null) return null;
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setEmail(user.getEmail());
        userDTO.setLogin(user.getLogin());
        userDTO.setFullName(user.getFullName());
        userDTO.setPassword(user.getPassword());
        userDTO.setTimezone(user.getTimezone());
        userDTO.setMeetingParticipations(user.getMeetings().stream()
                .map(MeetingParticipation::getParticipationId)
                .collect(Collectors.toList()));
        return userDTO;
    }
}
