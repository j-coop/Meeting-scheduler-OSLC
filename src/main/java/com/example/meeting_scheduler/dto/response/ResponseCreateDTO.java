package com.example.meeting_scheduler.dto.response;

import com.example.meeting_scheduler.entities.enums.Responses;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ResponseCreateDTO {
    private UUID userId;
    private Responses response;
}
