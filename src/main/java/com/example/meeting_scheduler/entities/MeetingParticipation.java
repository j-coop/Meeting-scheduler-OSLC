package com.example.meeting_scheduler.entities;

import com.example.meeting_scheduler.entities.enums.ParticipationStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name="participations")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MeetingParticipation implements Serializable {
    @Id
    @Column(name = "id")
    private UUID participationId;

    @ManyToOne
    private User user;

    @ManyToOne
    private Meeting meeting;

    @Column(name="userStatus")
    private ParticipationStatus userStatus;
}
