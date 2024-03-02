package com.example.meeting_scheduler.dto.response;

import com.example.meeting_scheduler.entities.enums.Responses;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponsesDTO {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private UUID responseId;
        private UUID userId;
        private Responses response;
    }

    private List<Response> responsesList;
}