package com.example.meeting_scheduler.services;

import com.example.meeting_scheduler.entities.Meeting;
import com.example.meeting_scheduler.repositories.MeetingRepository;

import java.util.UUID;

public class MeetingService {
    private final MeetingRepository meetingRepository;

    public MeetingService(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    public Meeting findByMeetingId(UUID id) {
        return meetingRepository.findByMeetingId(id);
    }
}
