package com.example.meeting_scheduler.services;

import com.example.meeting_scheduler.entities.Meeting;
import com.example.meeting_scheduler.entities.MeetingParticipation;
import com.example.meeting_scheduler.entities.User;
import com.example.meeting_scheduler.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User findByUserId(UUID id) {
        return userRepository.findByUserId(id);
    }

    @Transactional
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Transactional
    public User findByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    @Transactional
    public List<User> findByFullName(String fullName) {
        return userRepository.findByFullName(fullName);
    }

    @Transactional
    public void saveUser(User user) {
        userRepository.save(user);
    }

    @Transactional
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Transactional
    public User addUser(String login, String fullName, String email, String timezone, String password) {
        User user = User.builder()
                .userId(UUID.randomUUID())
                .login(login)
                .fullName(fullName)
                .email(email)
                .timezone(timezone)
                .password(password)
                .meetings(new ArrayList<>())
                .build();
        this.saveUser(user);
        return user;
    }

    @Transactional
    public void addMeetingParticipation(User user, MeetingParticipation meetingParticipation) {
        user.getMeetings().add(meetingParticipation);
        this.saveUser(user);
    }
}
