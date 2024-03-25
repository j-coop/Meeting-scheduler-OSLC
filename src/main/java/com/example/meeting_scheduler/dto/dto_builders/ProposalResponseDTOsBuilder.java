package com.example.meeting_scheduler.dto.dto_builders;

import com.example.meeting_scheduler.dto.proposal.ProposalsDTO;
import com.example.meeting_scheduler.dto.response.ResponsesDTO;
import com.example.meeting_scheduler.entities.MeetingProposal;
import com.example.meeting_scheduler.entities.ProposalResponse;

import java.util.List;

public class ProposalResponseDTOsBuilder {

    public static ResponsesDTO responsesDTO(List<ProposalResponse> responses) {
        if (responses == null) return null;
        List<ResponsesDTO.Response> responses1 = responses.stream()
                .map(response -> new ResponsesDTO.Response(
                        response.getResponseId(),
                        response.getUserId(),
                        response.getResponse()
                )).toList();
        return new ResponsesDTO(responses1);
    }

}
