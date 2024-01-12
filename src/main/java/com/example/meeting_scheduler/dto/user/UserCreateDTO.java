package com.example.meeting_scheduler.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserCreateDTO {
    private String login;
    private String fullName;
    private String email;
    private String timezone;
    private String password;
}