package com.example.meeting_scheduler.services;

import com.example.meeting_scheduler.entities.MeetingProposal;
import com.example.meeting_scheduler.entities.ProposalResponse;
import com.example.meeting_scheduler.repositories.ProposalResponseRepository;

import java.util.List;
import java.util.UUID;

public class ProposalResponseService {
    private final ProposalResponseRepository proposalResponseRepository;

    public ProposalResponseService(ProposalResponseRepository proposalResponseRepository) {
        this.proposalResponseRepository = proposalResponseRepository;
    }

    public ProposalResponse findByResponseId(UUID id) {
        return proposalResponseRepository.findByResponseId(id);
    }

    public List<ProposalResponse> findAllByMeetingProposal(MeetingProposal meetingProposal) {
        return proposalResponseRepository.findAllByMeetingProposal(meetingProposal);
    }

    List<ProposalResponse> findAllByMeetingProposalAndUserId(MeetingProposal meetingProposal, UUID userId) {
        return proposalResponseRepository.findAllByMeetingProposalAndUserId(meetingProposal, userId);
    }
}
