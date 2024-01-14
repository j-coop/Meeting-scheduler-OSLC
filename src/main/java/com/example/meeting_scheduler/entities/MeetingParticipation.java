package com.example.meeting_scheduler.entities;

import com.example.meeting_scheduler.entities.enums.ParticipationStatus;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name="participations")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
public class MeetingParticipation implements Serializable {
    @Id
    @Column(name = "id")
    private UUID participationId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;

    @Column(name="userStatus")
    private ParticipationStatus userStatus;

    public MeetingParticipation(String id) {
        this.participationId = UUID.fromString(id);
    }
}
