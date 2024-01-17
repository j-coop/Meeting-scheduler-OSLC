package com.example.meeting_scheduler.dto.participation;

import com.example.meeting_scheduler.entities.enums.ParticipationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ParticipationCreateDTO {
    private UUID userId;
}
