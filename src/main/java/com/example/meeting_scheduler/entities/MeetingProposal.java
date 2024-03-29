package com.example.meeting_scheduler.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="proposals")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class MeetingProposal implements Serializable {

    @ManyToOne
    private Meeting meeting;

    @Id
    @Column(name="proposalId")
    private UUID proposalId;


    @Column(name="startTime")
    private ZonedDateTime startTime;

    @Column(name="endTime")
    private ZonedDateTime endTime;

    @OneToMany(mappedBy = "meetingProposal")
    private List<ProposalResponse> responses;

    public MeetingProposal(String id) {
        this.proposalId = UUID.fromString(id);
    }
}
