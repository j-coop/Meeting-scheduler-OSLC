package com.example.meeting_scheduler.repositories;

import com.example.meeting_scheduler.entities.Meeting;
import com.example.meeting_scheduler.entities.MeetingParticipation;
import com.example.meeting_scheduler.entities.User;
import com.example.meeting_scheduler.entities.enums.ParticipationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MeetingParticipationRepository extends JpaRepository<MeetingParticipation, UUID> {

    MeetingParticipation findByParticipationId(UUID id);

    List<MeetingParticipation> findAllByUser(User user);

    List<MeetingParticipation> findAllByMeeting(Meeting meeting);

    List<MeetingParticipation> findAllByMeetingAndUserStatus(Meeting meeting, ParticipationStatus ps);

    List<MeetingParticipation> findAllByUserAndUserStatus(User user, ParticipationStatus ps);

}
