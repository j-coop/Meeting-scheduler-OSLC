import axios from "axios";
import config from "../config";
import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import MeetingCard from "../components/MeetingCard";
import styles from "../styles/meetings.module.css"
import CreateMeetingButton from "../components/CreateMeetingButton";

const Meetings = () => {

    const [meetings, setMeetings] = useState([]);
    const {userLogin} = useAuth();

    const fetchMeetings = async () => {
        try {
            const response = await axios.get(config.apiUrl+'/meetings/user/'+userLogin);
            const meetingsList = response.data.meetingsList || [];
            if (response.data && response.data.meetingsList) {
                setMeetings(meetingsList);
            } else {
                setMeetings([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchMeetings();
    }, [userLogin]);

    return (
        <>
            <div className={styles.meetingsContainer}>
                {
                    meetings.map(meeting => (
                        <div>
                            <MeetingCard
                                title={meeting.title}
                                description={meeting.description}
                                status={meeting.status}
                            />
                            <br/>
                        </div>
                    ))
                }
            </div>
            <div className={styles.addButton}>
                <CreateMeetingButton />
            </div>
        </>
    )
};

export default Meetings;