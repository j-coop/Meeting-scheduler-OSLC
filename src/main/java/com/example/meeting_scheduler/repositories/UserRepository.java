package com.example.meeting_scheduler.repositories;

import com.example.meeting_scheduler.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    User findByUserId(UUID id);

    List<User> findByLoginContaining(String search);

    User findByEmail(String email);

    User findByLogin(String login);

    List<User> findByFullName(String fullName);

}
