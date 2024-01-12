package com.example.meeting_scheduler.services;

import com.example.meeting_scheduler.entities.Meeting;
import com.example.meeting_scheduler.entities.MeetingProposal;
import com.example.meeting_scheduler.repositories.MeetingProposalRepository;

import java.util.List;
import java.util.UUID;

public class MeetingProposalService {
    private final MeetingProposalRepository meetingProposalRepository;

    public MeetingProposalService(MeetingProposalRepository meetingProposalRepository) {
        this.meetingProposalRepository = meetingProposalRepository;
    }

    public MeetingProposal findByProposalId(UUID id) {
        return meetingProposalRepository.findByProposalId(id);
    }

    public List<MeetingProposal> findAllByMeeting(Meeting meeting) {
        return meetingProposalRepository.findAllByMeeting(meeting);
    }
}
