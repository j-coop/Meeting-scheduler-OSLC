package com.example.meeting_scheduler.dto.proposal;

import com.example.meeting_scheduler.dto.meeting.MeetingsDTO;
import com.example.meeting_scheduler.entities.enums.MeetingStatus;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProposalsDTO {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Proposal {
        private UUID id;
        private ZonedDateTime startTime;
        private ZonedDateTime endTime;
    }

    private List<ProposalsDTO.Proposal> proposalsList;
}
