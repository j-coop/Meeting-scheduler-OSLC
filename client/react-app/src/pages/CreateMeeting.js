import {Button, ButtonGroup, TextField} from "@mui/material";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";
import UserSearch from "../components/UserSearch";
import {useState} from "react";
import styles from "../styles/createMeeting.module.css"
import {momentLocalizer} from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import WeekCalendar from "../components/WeekCalendar";


const CreateMeeting = () => {

    const [durationValue, setDurationValue] = useState('30');

    const localizer = momentLocalizer(moment)

    const handleChange = (
        event,
        newValue
    ) => {
        setDurationValue(newValue);
    };

    return (
        <div className={styles.container}>
            <TextField id="standard-basic" label="Title" variant="standard" fullWidth={true}/>
            <br/>
            <TextField id="standard-basic" label="Description" variant="standard" fullWidth={true}/>
            <br/>
            <label style={{marginTop: "20px", display: "block"}}>
                Duration:
                <br/>
                <ToggleButtonGroup
                    color="primary"
                    value={durationValue}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    style={{marginTop: "10px"}}
                >
                    <ToggleButton value="15">15 min</ToggleButton>
                    <ToggleButton value="30">30 min</ToggleButton>
                    <ToggleButton value="60">60 min</ToggleButton>
                    <ToggleButton value="120">120 min</ToggleButton>
                    <ToggleButton value="custom">Custom</ToggleButton>
                </ToggleButtonGroup>
            </label>


            <br/>
            <br/>

            <WeekCalendar localizer={localizer} duration={parseInt(durationValue)} key={durationValue}/>

            <br/>
            <br/>


            <h2>Participants: </h2>

            <div className={styles.userAdding}>
                <div className={styles.searchBox}>
                    <UserSearch/>
                </div>
                <div className={styles.usersAdded}>
                    <h2>Users added to meeting:</h2>
                </div>
            </div>

            <button className={styles.createMeetingButton}>Create Meeting</button>

            <br/>
            <br/>

        </div>
    )
}

export default CreateMeeting;