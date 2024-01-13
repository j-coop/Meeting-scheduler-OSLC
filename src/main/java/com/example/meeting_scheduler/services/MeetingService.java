package com.example.meeting_scheduler.services;

import com.example.meeting_scheduler.entities.Meeting;
import com.example.meeting_scheduler.repositories.MeetingRepository;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class MeetingService {
    private final MeetingRepository meetingRepository;

    public MeetingService(MeetingRepository meetingRepository) {
        this.meetingRepository = meetingRepository;
    }

    public Meeting findByMeetingId(UUID id) {
        return meetingRepository.findByMeetingId(id);
    }

    public void saveMeeting(Meeting meeting) {
        this.meetingRepository.save(meeting);
    }

    public void deleteMeeting(Meeting meeting) {
        this.meetingRepository.delete(meeting);
    }
}
