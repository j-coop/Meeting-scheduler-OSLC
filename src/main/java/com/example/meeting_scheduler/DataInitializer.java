package com.example.meeting_scheduler;

import com.example.meeting_scheduler.entities.Meeting;
import com.example.meeting_scheduler.entities.MeetingParticipation;
import com.example.meeting_scheduler.entities.MeetingProposal;
import com.example.meeting_scheduler.entities.User;
import com.example.meeting_scheduler.entities.enums.MeetingStatus;
import com.example.meeting_scheduler.entities.enums.ParticipationStatus;
import com.example.meeting_scheduler.services.MeetingParticipationService;
import com.example.meeting_scheduler.services.MeetingProposalService;
import com.example.meeting_scheduler.services.MeetingService;
import com.example.meeting_scheduler.services.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;

@Component
public class DataInitializer {
    private final UserService userService;
    private final MeetingService meetingService;
    private final MeetingParticipationService meetingParticipationService;
    private final MeetingProposalService meetingProposalService;

    private static final Random random = new Random(147);

    @Autowired
    public DataInitializer(UserService userService,
                           MeetingService meetingService,
                           MeetingParticipationService meetingParticipationService,
                           MeetingProposalService meetingProposalService)
    {
        this.userService = userService;
        this.meetingService = meetingService;
        this.meetingParticipationService = meetingParticipationService;
        this.meetingProposalService = meetingProposalService;
    }

    @PostConstruct
    public void initialize() {
        String[] userNames = {"John Cena", "Mike Tyson", "Venus Williams", "Emma Watson", "Stephen Hendry", "Harry Potter",
                "Jack Sparrow", "John Lennon", "Michael Jordan", "Roger Federer", "Leo Messi", "Leonardo DiCaprio",
                "Xavi Hernandez", "Carlos Alcaraz"};
        String[] userLogins = {"john_cena", "mikeyT", "venus", "hermiona123", "hendrysteven", "magic_one",
                "JackIAm", "JohnLennon1", "BigMike", "Roger20", "Leo2022", "LeoDiCap",
                "Xavi6", "Carlitos"};
        String[] userPasswords = {"john_cena", "mikety12", "serenarules22", "harrySlays7", "crucible7", "quidditch4life",
                "caribbean.life", "imagineYoko4", "nbaOwner2", "roland_garros_sucks", "barcaforever", "callMeOscar",
                "ballondor1day", "CabezaCorazonCojones2022"};
        UUID[] userIDs = new UUID[userNames.length];
        for (int i=0; i< userNames.length; i++) {
            userIDs[i] = UUID.randomUUID();
        }
        String[] userEmails = {"john_cena@cena.com", "mikeyTyson@gmail.com", "venus_williams@wta.tennis.com",
                "hermiona123@hogwart.mg", "hendrysteven147@wst.co.uk", "h.potter@hogwart.mg",
                "JackSparrow@carribean.ca", "JohnLennon@beatles.co.uk", "BigMike@nba.com", "Roger.Federer@atp.eu",
                "LeoMessi10@barca.es", "LeoDiCaprio@hollywood.com", "Xavi6@barca.es", "carlitos@atp.eu"};
        ZoneId[] timezones = {
                ZoneId.of(ZoneId.SHORT_IDS.get("ECT")),
                ZoneId.of(ZoneId.SHORT_IDS.get("CST")),
                ZoneId.of(ZoneId.SHORT_IDS.get("CTT")),
                ZoneId.of(ZoneId.SHORT_IDS.get("PST"))
        };

        User[] users = new User[14];
        Meeting[] meetings = new Meeting[5];

        for (int i=0; i<userNames.length; i++) {
            User user = new User(
                    userIDs[i], userLogins[i],
                    userNames[i], userEmails[i],
                    timezones[random.nextInt(timezones.length)],
                    userPasswords[i], new ArrayList<MeetingParticipation>());
            users[i] = user;
        }

        int num_meetings = 5;
        UUID[] meetingIDs = new UUID[num_meetings];
        for (int i=0; i< num_meetings; i++) {
            meetingIDs[i] = UUID.randomUUID();
        }
        String[] titles = {"Board meeting", "Friday Games", "Barca match watching", "Chill meeting", "Serious Secret Meeting"};
        String[] descriptions = {"Our company board annual meeting", "We gonna play Settlers of Catan",
            "Barca vs Real, Supercopa de Espana 2024, Leo's house, Miami",
                "Imagine all the people chilling life in peace... Woohoohoohoo", "Can't tell you, it's secret obviously"
        };
        UUID[] organizers = new UUID[num_meetings];
        for (int j=0; j<num_meetings; j++) {
            organizers[j] = userIDs[random.nextInt(userIDs.length)];
        }
        MeetingStatus[] meetingStatuses = {
                MeetingStatus.SCHEDULED, MeetingStatus.COMPLETED, MeetingStatus.SCHEDULED,
                MeetingStatus.PROPOSED, MeetingStatus.COMPLETED
        };
        String[] recaps = {"", "", "", "", ""};

        List<MeetingProposal>[] meetingProposals = new ArrayList[num_meetings];
        for (int k=0; k<meetingProposals.length; k++) {
            meetingProposals[k] = new ArrayList<>();
        }
        List<MeetingParticipation>[] meetingParticipations = new ArrayList[num_meetings];
        for (int k=0; k<meetingParticipations.length; k++) {
            meetingParticipations[k] = new ArrayList<>();
        }

        for (int i=0; i<num_meetings; i++) {
            meetings[i] = new Meeting(meetingIDs[i], titles[i], descriptions[i], organizers[i], meetingStatuses[i],
                    recaps[i], null, meetingProposals[i], meetingParticipations[i]);
        }

        // Save users and meetings
        for (User user: users) {
            userService.saveUser(user);
        }
        for (Meeting meeting: meetings) {
            meetingService.saveMeeting(meeting);
        }

        for (int i = 0; i < num_meetings; i++) {
            meetingProposals[i] = generateMeetingProposals(meetings[i]);
            meetingParticipations[i] = generateMeetingParticipations(meetings[i], users);
        }

        // Save users and meetings
        System.out.println("USERS:\n");
        for (User user: users) {
            userService.saveUser(user);
            System.out.println(user.toString());
        }
        System.out.println("MEETINGS:\n");
        for (Meeting meeting: meetings) {
            meetingService.saveMeeting(meeting);
            System.out.println(meeting.toString());
        }

    }

    private List<MeetingProposal> generateMeetingProposals(Meeting meeting) {
        List<MeetingProposal> proposals = new ArrayList<>();

        // Generate some random number of proposals (adjust as needed)
        int numProposals = random.nextInt(3) + 1;

        for (int i = 0; i < numProposals; i++) {
            MeetingProposal proposal = new MeetingProposal();
            proposal.setProposalId(UUID.randomUUID());
            proposal.setMeeting(meeting);

            // Generate a random hour and minute
            int randomHour = random.nextInt(24);
            int randomMinute = random.nextInt(60);

            ZonedDateTime startTime = ZonedDateTime.now()
                    .plusDays(random.nextInt(30))
                    .plusHours(randomHour)
                    .plusMinutes(randomMinute);

            proposal.setStartTime(startTime);
            proposal.setEndTime(startTime.plusHours(random.nextInt(2) + 1));

            // Add proposal to meeting's list
            meeting.getProposals().add(proposal);

            // Save meeting proposal
            meetingProposalService.saveMeetingProposal(proposal);

            // Set as chosen proposal
            meeting.setChosenProposal(proposal.getProposalId());

            // Save meeting with chosen proposal
            meetingService.saveMeeting(meeting);

            proposals.add(proposal);
        }

        return proposals;
    }

    private List<MeetingParticipation> generateMeetingParticipations(Meeting meeting, User[] users) {
        List<MeetingParticipation> participations = new ArrayList<>();

        int numParticipations = new Random().nextInt(5) + 1;

        User[] chosenUsers = getRandomSubsetFromArray(users, numParticipations);

        for (int i = 0; i < numParticipations; i++) {
            MeetingParticipation participation = new MeetingParticipation();
            participation.setMeeting(meeting);

            User user = chosenUsers[i];
            participation.setUser(user);

            participation.setParticipationId(UUID.randomUUID());
            participation.setUserStatus(ParticipationStatus.INVITED);

            // Save participation
            meetingParticipationService.saveMeetingParticipation(participation);

            // Add participation to meeting's list
            meeting.getParticipations().add(participation);
            // Add participation to user's list
            user.getMeetings().add(participation);

            participations.add(participation);
        }

        return participations;
    }

    private static <T> T[] getRandomSubsetFromArray(T[] array, int m) {
        if (array == null || array.length == 0 || m <= 0 || m > array.length) {
            return null; // Handle invalid input
        }

        // Shuffle the array
        T[] shuffledArray = Arrays.copyOf(array, array.length);
        shuffleArray(shuffledArray);

        // Take the first m elements as the random subset
        return Arrays.copyOf(shuffledArray, m);
    }

    private static <T> void shuffleArray(T[] array) {
        Random random = new Random();

        for (int i = array.length - 1; i > 0; i--) {
            int index = random.nextInt(i + 1);

            // Swap array[i] and array[index]
            T temp = array[i];
            array[i] = array[index];
            array[index] = temp;
        }
    }
}
