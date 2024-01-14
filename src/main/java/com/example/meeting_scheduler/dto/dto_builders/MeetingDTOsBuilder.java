package com.example.meeting_scheduler.dto.dto_builders;

import com.example.meeting_scheduler.dto.meeting.MeetingDTO;
import com.example.meeting_scheduler.dto.meeting.MeetingsDTO;
import com.example.meeting_scheduler.entities.Meeting;
import com.example.meeting_scheduler.entities.MeetingParticipation;
import com.example.meeting_scheduler.entities.MeetingProposal;

import java.util.List;
import java.util.stream.Collectors;

public class MeetingDTOsBuilder {
    public static MeetingDTO meetingToDTO(Meeting meeting) {
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

    public static MeetingsDTO meetingsToDTO(List<Meeting> meetings) {
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
