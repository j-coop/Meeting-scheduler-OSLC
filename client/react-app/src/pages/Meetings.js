import axios from "axios";
import config from "../config";
import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext";
import MeetingCard from "../components/meetings/MeetingCard";
import styles from "../styles/meetings.module.css"
import CreateMeetingButton from "../components/CreateMeetingButton";
import {MeetingContextProvider} from "../context/MeetingContext";

const Meetings = () => {

    const [meetings, setMeetings] = useState([]);
    const {userLogin} = useAuth();

    const fetchMeetings = async () => {
        try {
            const response = await axios.get(config.apiUrl+'/meetings/user/'+userLogin);
            const meetingsList = response.data.meetingsList || [];
            setMeetings(meetingsList);
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
                            <MeetingContextProvider>
                                <MeetingCard
                                    meetingData={meeting}
                                />
                            </MeetingContextProvider>
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