package com.example.meeting_scheduler.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="proposals")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MeetingProposal implements Serializable {

    @ManyToOne
    private Meeting meeting;

    @Id
    @Column(name="proposalId")
    private UUID proposalId;

    @Column(name="date")
    private LocalDate date;

    @Column(name="startTime")
    private LocalTime startTime;

    @Column(name="endTime")
    private LocalTime endTime;

    @OneToMany(mappedBy = "meetingProposal")
    private List<ProposalResponse> responses;

    public MeetingProposal(String id) {
        this.proposalId = UUID.fromString(id);
    }
}
