package com.example.meeting_scheduler.controllers;


import com.example.meeting_scheduler.dto.dto_builders.MeetingDTOsBuilder;
import com.example.meeting_scheduler.dto.dto_builders.ParticipationDTOsBuilder;
import com.example.meeting_scheduler.dto.dto_builders.ProposalDTOsBuilder;
import com.example.meeting_scheduler.dto.meeting.MeetingCreateDTO;
import com.example.meeting_scheduler.dto.meeting.MeetingDTO;
import com.example.meeting_scheduler.dto.meeting.MeetingsDTO;
import com.example.meeting_scheduler.dto.participation.ParticipationCreateDTO;
import com.example.meeting_scheduler.dto.participation.ParticipationsDTO;
import com.example.meeting_scheduler.dto.proposal.ProposalCreateDTO;
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
import org.springframework.web.bind.annotation.*;

import java.net.URI;
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

    @PostMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelMeeting(@PathVariable UUID id) {
        Meeting meeting = meetingService.findByMeetingId(id);
        if (meeting == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        meetingService.cancelMeeting(meeting);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/schedule")
    public ResponseEntity<Void> scheduleMeeting(
            @PathVariable UUID id,
            @RequestParam UUID proposalId
    )
    {
        Meeting meeting = meetingService.findByMeetingId(id);
        if (meeting == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        MeetingProposal meetingProposal = meetingProposalService.findByProposalId(proposalId);
        if (meetingProposal == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        if (meetingProposal.getMeeting() != meeting) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        meetingService.scheduleMeeting(meeting, proposalId);
        return ResponseEntity.ok().build();
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

    @GetMapping("/{id}/participations")
    public ResponseEntity<ParticipationsDTO> getMeetingParticipations(@PathVariable UUID id) {
        Meeting meeting = meetingService.findByMeetingId(id);
        if (meeting == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        List<MeetingParticipation> participations = meetingParticipationService.findAllByMeeting(meeting);
        return ResponseEntity.ok(ParticipationDTOsBuilder.participationsToDTO(participations));
    }

    @PostMapping
    public ResponseEntity<Void> addMeeting(@RequestBody MeetingCreateDTO meetingCreateDTO) {
        Meeting meeting = meetingService.addMeeting(meetingCreateDTO);
        return ResponseEntity.created(URI.create("/meetings/"+meeting.getMeetingId())).build();
    }

    @PostMapping("/{id}/proposals")
    public ResponseEntity<Void> addMeetingProposal(
            @PathVariable UUID id,
            @RequestBody ProposalCreateDTO proposalCreateDTO
    )
    {
        Meeting meeting = meetingService.findByMeetingId(id);
        if (meeting == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        MeetingProposal meetingProposal = meetingProposalService.addMeetingProposal(proposalCreateDTO, meeting);
        return ResponseEntity.created(URI.create("/meetings/"+
                meeting.getMeetingId()+"/proposals/"+meetingProposal.getProposalId())).build();
    }

    @PostMapping("/{id}/participations")
    public ResponseEntity<Void> addMeetingParticipation(
            @PathVariable UUID id,
            @RequestBody ParticipationCreateDTO createDTO
    )
    {
        Meeting meeting = meetingService.findByMeetingId(id);
        if (meeting == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        MeetingParticipation meetingParticipation = meetingParticipationService.addMeetingParticipation(createDTO, meeting);
        if (meetingParticipation == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        // Add participation to meeting's list
        meetingService.addMeetingParticipation(meeting, meetingParticipation);
        // Add participation to user's list
        User user = userService.findByUserId(createDTO.getUserId());
        userService.addMeetingParticipation(user, meetingParticipation);

        meetingParticipationService.saveMeetingParticipation(meetingParticipation);

        return ResponseEntity.created(URI.create("/meetings/"+
                meeting.getMeetingId()+"/participations/"+meetingParticipation.getParticipationId())).build();
    }


}
