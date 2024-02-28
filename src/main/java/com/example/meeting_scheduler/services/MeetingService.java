package com.example.meeting_scheduler.services;

import com.example.meeting_scheduler.dto.meeting.MeetingCreateDTO;
import com.example.meeting_scheduler.dto.participation.ParticipationCreateDTO;
import com.example.meeting_scheduler.entities.Meeting;
import com.example.meeting_scheduler.entities.MeetingParticipation;
import com.example.meeting_scheduler.entities.MeetingProposal;
import com.example.meeting_scheduler.entities.enums.MeetingStatus;
import com.example.meeting_scheduler.entities.enums.ParticipationStatus;
import com.example.meeting_scheduler.repositories.MeetingRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
public class MeetingService {
    private final MeetingRepository meetingRepository;
    private final MeetingParticipationService meetingParticipationService;

    public MeetingService(
            MeetingRepository meetingRepository,
            MeetingParticipationService meetingParticipationService
    )
    {
        this.meetingRepository = meetingRepository;
        this.meetingParticipationService = meetingParticipationService;
    }

    @Transactional
    public Meeting findByMeetingId(UUID id) {
        return meetingRepository.findByMeetingId(id);
    }

    @Transactional
    public void saveMeeting(Meeting meeting) {
        this.meetingRepository.save(meeting);
    }

    @Transactional
    public void deleteMeeting(Meeting meeting) {
        this.meetingRepository.delete(meeting);
    }

    @Transactional
    public Meeting addMeeting(MeetingCreateDTO dto) {
        Meeting meeting = Meeting.builder()
                .meetingId(UUID.randomUUID())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .organiser(dto.getOrganiser())
                .status(MeetingStatus.PROPOSED)
                .meetingRecap("")
                .chosenProposal(-1)
                .participations(new ArrayList<>())
                .proposals(new ArrayList<>())
                .build();

        this.saveMeeting(meeting);

        // Add organizer's participation
        ParticipationCreateDTO createDTO = new ParticipationCreateDTO(dto.getOrganiser());
        MeetingParticipation mp = meetingParticipationService.addMeetingParticipation(createDTO, meeting);
        mp.setUserStatus(ParticipationStatus.JOINED);
        meetingParticipationService.saveMeetingParticipation(mp);

        this.saveMeeting(meeting);
        return meeting;
    }

    @Transactional
    public void addMeetingProposal(Meeting meeting, MeetingProposal meetingProposal) {
        meeting.getProposals().add(meetingProposal);
        this.saveMeeting(meeting);
    }

    @Transactional
    public void addMeetingParticipation(Meeting meeting, MeetingParticipation meetingParticipation) {
        meeting.getParticipations().add(meetingParticipation);
        this.saveMeeting(meeting);
    }

    @Transactional
    public void cancelMeeting(Meeting meeting) {
        meeting.setStatus(MeetingStatus.CANCELLED);
        this.saveMeeting(meeting);
    }
}
