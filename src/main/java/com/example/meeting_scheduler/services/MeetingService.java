package com.example.meeting_scheduler.services;

import com.example.meeting_scheduler.repositories.MeetingRepository;

public class MeetingService {
    private final MeetingRepository meetingRepository;

    public MeetingService(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }
}
