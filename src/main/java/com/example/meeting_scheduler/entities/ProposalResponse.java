package com.example.meeting_scheduler.entities;

import com.example.meeting_scheduler.entities.enums.Responses;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name="responses")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProposalResponse implements Serializable {

    @ManyToOne
    private MeetingProposal meetingProposal;

    @Id
    @Column(name="responseId")
    private UUID responseId;

    @Column(name="userId")
    private UUID userId;

    @Column(name="response")
    private Responses response;
}
