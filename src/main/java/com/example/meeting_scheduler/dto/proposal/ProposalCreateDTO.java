package com.example.meeting_scheduler.dto.proposal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProposalCreateDTO {
    private LocalDate date;
    private LocalTime startTime;
    private LocalTime endTime;
}
