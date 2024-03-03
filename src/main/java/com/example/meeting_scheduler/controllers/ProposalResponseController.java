package com.example.meeting_scheduler.controllers;

import com.example.meeting_scheduler.dto.dto_builders.ProposalResponseDTOsBuilder;
import com.example.meeting_scheduler.dto.response.ResponseCreateDTO;
import com.example.meeting_scheduler.dto.response.ResponsesDTO;
import com.example.meeting_scheduler.entities.Meeting;
import com.example.meeting_scheduler.entities.MeetingProposal;
import com.example.meeting_scheduler.entities.ProposalResponse;
import com.example.meeting_scheduler.entities.enums.Responses;
import com.example.meeting_scheduler.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/meetings/{meetingId}/proposals/{proposalId}/responses")
public class ProposalResponseController {

    @Autowired
    private final MeetingService meetingService;
    private final MeetingProposalService meetingProposalService;
    private final ProposalResponseService proposalResponseService;

    public ProposalResponseController(MeetingService meetingService,
                                      MeetingProposalService meetingProposalService,
                                      ProposalResponseService proposalResponseService)
    {
        this.meetingService = meetingService;
        this.meetingProposalService = meetingProposalService;
        this.proposalResponseService = proposalResponseService;
    }

    @GetMapping
    public ResponseEntity<ResponsesDTO> getProposalResponse(
            @PathVariable("meetingId") UUID meetingId,
            @PathVariable("proposalId") UUID proposalId
    )
    {
        Meeting meeting = meetingService.findByMeetingId(meetingId);
        if (meeting == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        MeetingProposal meetingProposal = meetingProposalService.findByProposalId(proposalId);
        if (meetingProposal == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        //if (meetingProposal.getMeeting().getMeetingId() != meetingId) {
          //  return ResponseEntity.status(HttpStatus.CONFLICT).build();
        //}
        List<ProposalResponse> proposalResponses =
                proposalResponseService.findAllByMeetingProposal(meetingProposal);
        return ResponseEntity.ok(ProposalResponseDTOsBuilder.responsesDTO(proposalResponses));
    }

    @PostMapping
    public ResponseEntity<Void> addProposalResponse(
            @PathVariable("meetingId") UUID meetingId,
            @PathVariable("proposalId") UUID proposalId,
            @RequestBody ResponseCreateDTO createDTO,
            @RequestParam(required = false) Responses prev
            )
    {
        Meeting meeting = meetingService.findByMeetingId(meetingId);
        if (meeting == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        MeetingProposal meetingProposal = meetingProposalService.findByProposalId(proposalId);
        if (meetingProposal == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        if (prev != null) {
            // Check if prev param is valid
            if (prev != Responses.AVAILABLE && prev != Responses.UNAVAILABLE && prev != Responses.IF_MUST) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            // Find existing response
            ProposalResponse existingResponse = proposalResponseService.findByMeetingProposalAndUserId(
                    meetingProposal,
                    createDTO.getUserId()
            );
            if (existingResponse != null) {
                // Existing response should be changed
                existingResponse.setResponse(createDTO.getResponse());
                proposalResponseService.saveResponse(existingResponse);
                return ResponseEntity.ok().build();
            }
            else {
                return ResponseEntity.notFound().build();
            }
        }
        else {
            // Create new response entry
            ProposalResponse proposalResponse = proposalResponseService.addResponse(meetingProposal, createDTO);
            return ResponseEntity.created(URI.create("/meetings/"+meetingId
                    +"/proposals/"+proposalId+"/responses/"+proposalResponse.getResponseId())).build();
        }
    }

}