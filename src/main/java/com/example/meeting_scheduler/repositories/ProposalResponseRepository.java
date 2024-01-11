package com.example.meeting_scheduler.repositories;

import com.example.meeting_scheduler.entities.MeetingProposal;
import com.example.meeting_scheduler.entities.ProposalResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProposalResponseRepository extends JpaRepository<ProposalResponse, UUID> {

    ProposalResponse findByResponseId(UUID responseId);

    List<ProposalResponse> findAllByMeetingProposal(MeetingProposal meetingProposal);

    List<ProposalResponse> findAllByMeetingProposalAndUserId(MeetingProposal meetingProposal, UUID userId);

}
