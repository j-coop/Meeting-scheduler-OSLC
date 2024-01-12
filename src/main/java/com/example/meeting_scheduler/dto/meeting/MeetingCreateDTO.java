package com.example.meeting_scheduler.dto.meeting;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MeetingCreateDTO {
    private UUID meetingId;
    private String title;
    private String description;
    private UUID organiser;
}