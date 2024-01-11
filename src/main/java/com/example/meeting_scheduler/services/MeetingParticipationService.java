package com.example.meeting_scheduler.services;

import com.example.meeting_scheduler.repositories.MeetingParticipationRepository;

public class MeetingParticipationService {
    private final MeetingParticipationRepository meetingParticipationRepository;

    public MeetingParticipationService(MeetingParticipationRepository meetingParticipationRepository) {
        this.meetingParticipationRepository = meetingParticipationRepository;
    }
}
