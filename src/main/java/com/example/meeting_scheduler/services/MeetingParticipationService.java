package com.example.meeting_scheduler.services;

import com.example.meeting_scheduler.entities.Meeting;
import com.example.meeting_scheduler.entities.MeetingParticipation;
import com.example.meeting_scheduler.entities.User;
import com.example.meeting_scheduler.entities.enums.ParticipationStatus;
import com.example.meeting_scheduler.repositories.MeetingParticipationRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MeetingParticipationService {
    private final MeetingParticipationRepository meetingParticipationRepository;

    public MeetingParticipationService(MeetingParticipationRepository meetingParticipationRepository) {
        this.meetingParticipationRepository = meetingParticipationRepository;
    }

    @Transactional
    public MeetingParticipation findByParticipationId(UUID id) {
        return meetingParticipationRepository.findByParticipationId(id);
    }

    @Transactional
    public List<MeetingParticipation> findAllByUser(User user) {
        return meetingParticipationRepository.findAllByUser(user);
    }

    @Transactional
    public List<MeetingParticipation> findAllByMeeting(Meeting meeting) {
        return meetingParticipationRepository.findAllByMeeting(meeting);
    }

    @Transactional
    public List<MeetingParticipation> findAllByMeetingAndUserStatus(Meeting meeting, ParticipationStatus ps) {
        return meetingParticipationRepository.findAllByMeetingAndUserStatus(meeting, ps);
    }

    @Transactional
    public List<MeetingParticipation> findAllByUserAndUserStatus(User user, ParticipationStatus ps) {
        return meetingParticipationRepository.findAllByUserAndUserStatus(user, ps);
    }

    @Transactional
    public void saveMeetingParticipation(MeetingParticipation meetingParticipation) {
        this.meetingParticipationRepository.save(meetingParticipation);
    }
}
