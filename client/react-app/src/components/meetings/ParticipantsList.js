import {List} from "@mui/material";
import ParticipantTile from "./ParticipantTile";
import {useEffect, useState} from "react";
import {useAuth} from "../../context/AuthContext";
import axios from "axios";
import config from "../../config";
import MeetingCard from "./MeetingCard";


const ParticipantsList = (props) => {

    let meetingId = props.id;

    const [participants, setParticipants] = useState([]);

    const fetchParticipants = async () => {
        let path = config.apiUrl+'/meetings/'+meetingId+'/participations';
        try {
            const response = await axios.get(path);
            const participantsList = response.data.participationsList || [];
            setParticipants(participantsList);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchParticipants();
    }, [meetingId]);

    return (
        <div>
            <List>
                {
                    participants.map(participant => (
                        <div>
                            <ParticipantTile
                                login={participant.userLogin}
                                status={participant.userStatus}
                            />
                            <br/>
                        </div>
                    ))
                }
            </List>
        </div>
    )
}

export default ParticipantsList;