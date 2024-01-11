package com.example.meeting_scheduler.repositories;

import com.example.meeting_scheduler.entities.Meeting;
import com.example.meeting_scheduler.entities.MeetingProposal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MeetingProposalRepository extends JpaRepository<MeetingProposal, UUID> {

    MeetingProposal findByProposalId(UUID proposalId);

    List<MeetingProposal> findAllByMeeting(Meeting meeting);


}
