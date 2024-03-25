package com.example.meeting_scheduler.dto.participation;

import com.example.meeting_scheduler.dto.proposal.ProposalsDTO;
import com.example.meeting_scheduler.entities.enums.ParticipationStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParticipationsDTO {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Participation {
        private UUID id;
        private UUID userId;
        private String userLogin;
        private ParticipationStatus userStatus;
    }

    private List<ParticipationsDTO.Participation> participationsList;
}
