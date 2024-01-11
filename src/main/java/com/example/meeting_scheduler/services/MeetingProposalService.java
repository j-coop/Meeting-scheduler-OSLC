package com.example.meeting_scheduler.services;

import com.example.meeting_scheduler.repositories.MeetingProposalRepository;

public class MeetingProposalService {
    private final MeetingProposalRepository meetingProposalRepository;

    public MeetingProposalService(MeetingProposalRepository meetingProposalRepository) {
        this.meetingProposalRepository = meetingProposalRepository;
    }
}
