package com.example.meeting_scheduler.dto.dto_builders;

import com.example.meeting_scheduler.dto.participation.ParticipationsDTO;
import com.example.meeting_scheduler.entities.MeetingParticipation;

import java.util.List;

public class ParticipationDTOsBuilder {

    public static ParticipationsDTO participationsToDTO(List<MeetingParticipation> participations) {
        if (participations == null) return null;
        List<ParticipationsDTO.Participation> participations1 = participations.stream()
                .map(participation -> new ParticipationsDTO.Participation(
                        participation.getParticipationId(),
                        participation.getUser().getUserId(),
                        participation.getUserStatus()
                )).toList();
        return new ParticipationsDTO(participations1);
    }
}
