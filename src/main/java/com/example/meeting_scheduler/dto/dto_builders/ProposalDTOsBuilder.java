package com.example.meeting_scheduler.dto.dto_builders;

import com.example.meeting_scheduler.dto.proposal.ProposalsDTO;
import com.example.meeting_scheduler.entities.MeetingProposal;

import java.util.List;

public class ProposalDTOsBuilder {
    public static ProposalsDTO proposalsToDTO(List<MeetingProposal> proposals) {
        if (proposals == null) return null;
        List<ProposalsDTO.Proposal> proposals1 = proposals.stream()
                .map(proposal -> new ProposalsDTO.Proposal(
                        proposal.getProposalId(),
                        proposal.getDate(),
                        proposal.getStartTime(),
                        proposal.getEndTime()
                )).toList();
        return new ProposalsDTO(proposals1);
    }
}
