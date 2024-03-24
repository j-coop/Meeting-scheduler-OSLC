package com.example.meeting_scheduler.services;

import com.example.meeting_scheduler.dto.user.UserUpdateDTO;
import com.example.meeting_scheduler.entities.Meeting;
import com.example.meeting_scheduler.entities.MeetingParticipation;
import com.example.meeting_scheduler.entities.User;
import com.example.meeting_scheduler.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
    public List<User> findByLoginSearch(String search) {
        return userRepository.findByLoginContaining(search);
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
    public User addUser(String login, String fullName, String email, ZoneId timezone, String password) {
        User user = User.builder()
                .userId(UUID.randomUUID())
                .login(login)
                .fullName(fullName)
                .email(email)
                .timezone(timezone)
                .password(passwordEncoder.encode(password))
                .meetings(new ArrayList<>())
                .build();
        this.saveUser(user);
        return user;
    }

    @Transactional
    public boolean checkLogin(String login, String password) {
        User user = userRepository.findByLogin(login);
        if (user == null) return false;
        // checks if password provided matches stored hash
        return passwordEncoder.matches(password, user.getPassword());
    }

    @Transactional
    public void addMeetingParticipation(User user, MeetingParticipation meetingParticipation) {
        user.getMeetings().add(meetingParticipation);
        this.saveUser(user);
    }

    @Transactional
    public boolean updateUser(User user, UserUpdateDTO updateDTO) {
        if (user == null) return false;
        // check authorisation
        if (passwordEncoder.matches(user.getPassword(), updateDTO.getCurrentPassword())) {
            user.setLogin(updateDTO.getLogin());
            user.setFullName(updateDTO.getFullName());
            user.setEmail(updateDTO.getEmail());
            user.setTimezone(updateDTO.getTimezone());
            user.setPassword(passwordEncoder.encode(updateDTO.getPassword()));
            this.saveUser(user);
            return true;
        }
        return false;
    }
}
