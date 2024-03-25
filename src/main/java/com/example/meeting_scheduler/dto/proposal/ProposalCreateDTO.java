package com.example.meeting_scheduler.dto.proposal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProposalCreateDTO {
    private ZonedDateTime startTime;
    private ZonedDateTime endTime;
}
