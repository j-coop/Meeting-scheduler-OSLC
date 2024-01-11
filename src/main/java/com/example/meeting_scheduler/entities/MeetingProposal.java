package com.example.meeting_scheduler.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Time;
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
    private Date date;

    @Column(name="startTime")
    private Time startTime;

    @Column(name="endTime")
    private Time endTime;

    @OneToMany
    private List<ProposalResponse> responses;
}
