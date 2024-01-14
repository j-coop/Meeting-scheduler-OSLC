package com.example.meeting_scheduler.entities;

import com.example.meeting_scheduler.entities.enums.MeetingStatus;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="meetings")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class Meeting implements Serializable {
    @Id
    @Column(name="meetingId")
    private UUID meetingId;

    @Column(name="title")
    private String title;

    @Column(name="description")
    private String description;

    // id of the user who is the organiser
    @Column(name="organiser")
    private UUID organiser;

    @Column(name="status")
    private MeetingStatus status;

    @Column(name="meetingRecap")
    private String meetingRecap;

    // id of the chosen proposal
    @Column(name="chosenProposal")
    private int chosenProposal;

    @OneToMany(mappedBy = "meeting")
    private List<MeetingProposal> proposals;

    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<MeetingParticipation> participations;
}
