package com.example.meeting_scheduler.controllers;


import com.example.meeting_scheduler.dto.meeting.MeetingDTO;
import com.example.meeting_scheduler.dto.meeting.MeetingsDTO;
import com.example.meeting_scheduler.entities.Meeting;
import com.example.meeting_scheduler.entities.MeetingParticipation;
import com.example.meeting_scheduler.entities.MeetingProposal;
import com.example.meeting_scheduler.entities.User;
import com.example.meeting_scheduler.services.MeetingParticipationService;
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
import java.util.stream.Collectors;


@RestController()
@RequestMapping("/meetings")
public class MeetingController {
    @Autowired
    private final MeetingService meetingService;
    private final MeetingParticipationService meetingParticipationService;
    private final UserService userService;

    public MeetingController(MeetingService meetingService,
                             MeetingParticipationService meetingParticipationService,
                             UserService userService)
    {
        this.meetingService = meetingService;
        this.meetingParticipationService = meetingParticipationService;
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<MeetingDTO> getMeetingById(@PathVariable UUID id) {
        Meeting meeting = meetingService.findByMeetingId(id);
        if (meeting == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        MeetingDTO meetingDTO = meetingToDTO(meeting);
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
        return ResponseEntity.ok(meetingsToDTO(meetings));
    }

    private MeetingDTO meetingToDTO(Meeting meeting) {
        if (meeting == null) return null;
        MeetingDTO meetingDTO = new MeetingDTO();
        meetingDTO.setMeetingId(meeting.getMeetingId());
        meetingDTO.setTitle(meeting.getTitle());
        meetingDTO.setDescription(meeting.getDescription());
        meetingDTO.setOrganiser(meeting.getOrganiser());
        meetingDTO.setStatus(meeting.getStatus());
        meetingDTO.setMeetingRecap(meeting.getMeetingRecap());
        meetingDTO.setChosenProposal(meeting.getChosenProposal());
        meetingDTO.setMeetingProposals(meeting.getProposals().stream()
                .map(MeetingProposal::getProposalId)
                .collect(Collectors.toList()));
        meetingDTO.setMeetingParticipations(meeting.getParticipations().stream()
                .map(MeetingParticipation::getParticipationId)
                .collect(Collectors.toList()));
        return meetingDTO;
    }

    private MeetingsDTO meetingsToDTO(List<Meeting> meetings) {
        if (meetings == null) return null;
        List<MeetingsDTO.Meeting> meetings1 =  meetings.stream()
                .map(meeting -> new MeetingsDTO.Meeting(
                        meeting.getMeetingId(),
                        meeting.getTitle(),
                        meeting.getDescription(),
                        meeting.getOrganiser(),
                        meeting.getStatus(),
                        meeting.getChosenProposal()
                )).toList();
        return new MeetingsDTO(meetings1);
    }

}
