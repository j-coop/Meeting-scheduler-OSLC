package com.example.meeting_scheduler.dto.meeting;

import com.example.meeting_scheduler.entities.enums.MeetingStatus;
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
public class MeetingDTO {
    private UUID meetingId;
    private String title;
    private String description;
    private UUID organiser;
    private MeetingStatus status;
    private String meetingRecap;
    private int chosenProposal;
    private List<UUID> meetingProposals;
    private List<UUID> meetingParticipations;
}
