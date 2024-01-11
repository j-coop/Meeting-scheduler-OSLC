package com.example.meeting_scheduler.repositories;

import com.example.meeting_scheduler.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    User findByUserId(UUID id);



}
