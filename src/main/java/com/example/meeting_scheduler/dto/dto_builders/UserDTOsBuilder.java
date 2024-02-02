package com.example.meeting_scheduler.dto.dto_builders;

import com.example.meeting_scheduler.dto.meeting.MeetingsDTO;
import com.example.meeting_scheduler.dto.user.UserDTO;
import com.example.meeting_scheduler.dto.user.UsersDTO;
import com.example.meeting_scheduler.entities.MeetingParticipation;
import com.example.meeting_scheduler.entities.User;

import java.util.List;
import java.util.stream.Collectors;

public class UserDTOsBuilder {
    public static UserDTO userToDTO(User user) {
        if (user == null) return null;
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setEmail(user.getEmail());
        userDTO.setLogin(user.getLogin());
        userDTO.setFullName(user.getFullName());
        userDTO.setPassword(user.getPassword());
        userDTO.setTimezone(user.getTimezone());
        userDTO.setMeetingParticipations(user.getMeetings().stream()
                .map(MeetingParticipation::getParticipationId)
                .collect(Collectors.toList()));
        return userDTO;
    }

    public static UsersDTO usersToUsersDTO(List<User> users) {
        if (users == null) return null;
        List<UsersDTO.User> users1 =  users.stream()
                .map(user -> new UsersDTO.User(
                        user.getUserId(),
                        user.getLogin(),
                        user.getFullName(),
                        user.getEmail()
                )).toList();
        return new UsersDTO(users1);
    }
}
