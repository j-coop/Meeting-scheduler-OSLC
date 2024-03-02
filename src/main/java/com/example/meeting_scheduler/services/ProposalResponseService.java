package com.example.meeting_scheduler.services;

import com.example.meeting_scheduler.dto.response.ResponseCreateDTO;
import com.example.meeting_scheduler.entities.MeetingProposal;
import com.example.meeting_scheduler.entities.ProposalResponse;
import com.example.meeting_scheduler.repositories.ProposalResponseRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProposalResponseService {
    private final ProposalResponseRepository proposalResponseRepository;
    private final MeetingProposalService meetingProposalService;

    public ProposalResponseService(
            ProposalResponseRepository proposalResponseRepository,
            MeetingProposalService meetingProposalService
    ) {
        this.proposalResponseRepository = proposalResponseRepository;
        this.meetingProposalService = meetingProposalService;
    }

    @Transactional
    public void saveResponse(ProposalResponse proposalResponse) {
        this.proposalResponseRepository.save(proposalResponse);
    }

    @Transactional
    public void deleteResponse(ProposalResponse proposalResponse) {
        this.proposalResponseRepository.delete(proposalResponse);
    }

    @Transactional
    public ProposalResponse findByResponseId(UUID id) {
        return proposalResponseRepository.findByResponseId(id);
    }

    @Transactional
    public List<ProposalResponse> findAllByMeetingProposal(MeetingProposal meetingProposal) {
        return proposalResponseRepository.findAllByMeetingProposal(meetingProposal);
    }

    @Transactional
    public List<ProposalResponse> findAllByMeetingProposalAndUserId(MeetingProposal meetingProposal, UUID userId) {
        return proposalResponseRepository.findAllByMeetingProposalAndUserId(meetingProposal, userId);
    }

    @Transactional
    public ProposalResponse addResponse(MeetingProposal meetingProposal, ResponseCreateDTO createDTO) {
        ProposalResponse proposalResponse = new ProposalResponse(
                meetingProposal,
                UUID.randomUUID(),
                createDTO.getUserId(),
                createDTO.getResponse()
        );
        // save proposal response
        this.saveResponse(proposalResponse);
        // add response to proposal's list
        meetingProposal.getResponses().add(proposalResponse);
        // save modified proposal
        meetingProposalService.saveMeetingProposal(meetingProposal);

        return proposalResponse;
    }
}
