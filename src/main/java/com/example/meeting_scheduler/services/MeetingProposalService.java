package com.example.meeting_scheduler.services;

import com.example.meeting_scheduler.dto.proposal.ProposalCreateDTO;
import com.example.meeting_scheduler.entities.Meeting;
import com.example.meeting_scheduler.entities.MeetingProposal;
import com.example.meeting_scheduler.repositories.MeetingProposalRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class MeetingProposalService {
    private final MeetingProposalRepository meetingProposalRepository;
    private final MeetingService meetingService;

    public MeetingProposalService(
            MeetingProposalRepository meetingProposalRepository,
            MeetingService meetingService
    )
    {
        this.meetingProposalRepository = meetingProposalRepository;
        this.meetingService = meetingService;
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

    @Transactional
    public MeetingProposal addMeetingProposal(ProposalCreateDTO dto, Meeting meeting) {
        MeetingProposal meetingProposal = MeetingProposal.builder()
                .proposalId(UUID.randomUUID())
                .meeting(meeting)
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .responses(new ArrayList<>())
                .build();

        this.saveMeetingProposal(meetingProposal);

        // Add proposal to meeting's list
        meetingService.addMeetingProposal(meeting, meetingProposal);

        return meetingProposal;
    }
}
