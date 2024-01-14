package com.example.meeting_scheduler.controllers;


import com.example.meeting_scheduler.dto.dto_builders.MeetingDTOsBuilder;
import com.example.meeting_scheduler.dto.dto_builders.ProposalDTOsBuilder;
import com.example.meeting_scheduler.dto.meeting.MeetingDTO;
import com.example.meeting_scheduler.dto.meeting.MeetingsDTO;
import com.example.meeting_scheduler.dto.proposal.ProposalsDTO;
import com.example.meeting_scheduler.entities.Meeting;
import com.example.meeting_scheduler.entities.MeetingParticipation;
import com.example.meeting_scheduler.entities.MeetingProposal;
import com.example.meeting_scheduler.entities.User;
import com.example.meeting_scheduler.services.MeetingParticipationService;
import com.example.meeting_scheduler.services.MeetingProposalService;
import com.example.meeting_scheduler.services.MeetingService;
import com.example.meeting_scheduler.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;


@RestController()
@RequestMapping("/meetings")
public class MeetingController {
    @Autowired
    private final MeetingService meetingService;
    private final MeetingParticipationService meetingParticipationService;
    private final UserService userService;
    private final MeetingProposalService meetingProposalService;

    public MeetingController(MeetingService meetingService,
                             MeetingParticipationService meetingParticipationService,
                             UserService userService,
                             MeetingProposalService meetingProposalService)
    {
        this.meetingService = meetingService;
        this.meetingParticipationService = meetingParticipationService;
        this.userService = userService;
        this.meetingProposalService = meetingProposalService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<MeetingDTO> getMeetingById(@PathVariable UUID id) {
        Meeting meeting = meetingService.findByMeetingId(id);
        if (meeting == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        MeetingDTO meetingDTO = MeetingDTOsBuilder.meetingToDTO(meeting);
        return ResponseEntity.ok(meetingDTO);
    }

    @GetMapping("/user/{login}")
    public ResponseEntity<MeetingsDTO> getMeetingsByUser(@PathVariable String login) {
        User user = userService.findByLogin(login);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        List<MeetingParticipation> participations = meetingParticipationService.findAllByUser(user);
        List<Meeting> meetings = participations.stream()
                .map(MeetingParticipation::getMeeting)
                .toList();
        return ResponseEntity.ok(MeetingDTOsBuilder.meetingsToDTO(meetings));
    }

    @GetMapping("/{id}/proposals")
    public ResponseEntity<ProposalsDTO> getMeetingProposals(@PathVariable UUID id) {
        Meeting meeting = meetingService.findByMeetingId(id);
        if (meeting == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        List<MeetingProposal> proposals = meetingProposalService.findAllByMeeting(meeting);
        return ResponseEntity.ok(ProposalDTOsBuilder.proposalsToDTO(proposals));
    }



}
