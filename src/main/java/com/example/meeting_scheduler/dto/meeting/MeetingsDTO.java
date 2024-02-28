package com.example.meeting_scheduler.dto.meeting;

import com.example.meeting_scheduler.entities.enums.MeetingStatus;
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
public class MeetingsDTO {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Meeting {
        private UUID id;
        private String title;
        private String description;
        private UUID organiser;
        private MeetingStatus status;
        private UUID chosenProposal;
    }

    private List<Meeting> meetingsList;
}
