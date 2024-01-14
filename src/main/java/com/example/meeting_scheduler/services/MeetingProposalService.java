package com.example.meeting_scheduler.services;

import com.example.meeting_scheduler.entities.Meeting;
import com.example.meeting_scheduler.entities.MeetingProposal;
import com.example.meeting_scheduler.repositories.MeetingProposalRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MeetingProposalService {
    private final MeetingProposalRepository meetingProposalRepository;

    public MeetingProposalService(MeetingProposalRepository meetingProposalRepository) {
        this.meetingProposalRepository = meetingProposalRepository;
    }

    @Transactional
    public MeetingProposal findByProposalId(UUID id) {
        return meetingProposalRepository.findByProposalId(id);
    }

    @Transactional
    public List<MeetingProposal> findAllByMeeting(Meeting meeting) {
        return meetingProposalRepository.findAllByMeeting(meeting);
    }

    @Transactional
    public void saveMeetingProposal(MeetingProposal meetingProposal) {
        this.meetingProposalRepository.save(meetingProposal);
    }
}
