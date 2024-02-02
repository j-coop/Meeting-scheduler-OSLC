import {Button, ButtonGroup, TextField} from "@mui/material";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";
import UserSearch from "../components/UserSearch";
import {useState} from "react";
import styles from "../styles/createMeeting.module.css"


const CreateMeeting = () => {

    const [durationValue, setDurationValue] = useState('30min');

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
                    <ToggleButton value="15min">15 min</ToggleButton>
                    <ToggleButton value="30min">30 min</ToggleButton>
                    <ToggleButton value="60min">60 min</ToggleButton>
                    <ToggleButton value="120min">120 min</ToggleButton>
                    <ToggleButton value="custom">Custom</ToggleButton>
                </ToggleButtonGroup>
            </label>
            <h2>Participants: </h2>

            <div className={styles.userAdding}>
                <div className={styles.searchBox}>
                    <UserSearch/>
                </div>
                <div className={styles.usersAdded}>
                    <h2>Users added to meeting:</h2>
                </div>
            </div>


            <br/>
            <br/>

        </div>
    )
}

export default CreateMeeting;