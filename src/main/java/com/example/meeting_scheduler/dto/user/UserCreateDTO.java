package com.example.meeting_scheduler.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZoneId;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserCreateDTO {
    private String login;
    private String fullName;
    private String email;
    private ZoneId timezone;
    private String password;
}