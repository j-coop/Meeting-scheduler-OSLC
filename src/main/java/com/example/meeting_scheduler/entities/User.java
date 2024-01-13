package com.example.meeting_scheduler.entities;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="users")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class User implements Serializable {
    @Id
    @Column(name="userId")
    private UUID userId;

    @Column(name="login", unique = true)
    private String login;

    @Column(name="fullName")
    private String fullName;

    @Column(name="email", unique = true)
    private String email;

    @Column(name="timezone")
    private String timezone;

    @Column(name="password")
    private String password;

    @OneToMany(mappedBy = "user")
    private List<MeetingParticipation> meetings;
}
