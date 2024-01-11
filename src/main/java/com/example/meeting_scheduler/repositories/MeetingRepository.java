package com.example.meeting_scheduler.repositories;

import com.example.meeting_scheduler.entities.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MeetingRepository extends JpaRepository<Meeting, UUID> {



}
