package com.example.meeting_scheduler.dto.user;

import com.example.meeting_scheduler.entities.MeetingParticipation;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserDTO {
    private UUID userId;
    private String login;
    private String fullName;
    private String email;
    private String timezone;
    private String password;
    private List<UUID> meetingParticipations;
}
