import {Button, List, ListItem, TextField, Typography} from "@mui/material";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";
import UserSearch from "../components/UserSearch";
import React, {useState} from "react";
import styles from "../styles/createMeeting.module.css"
import {momentLocalizer} from "react-big-calendar";
import moment from "moment";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import WeekCalendar from "../components/WeekCalendar";
import UserCard from "../components/UserCard";
import config from "../config";
import formatDateTime from "../utils/FormatDate"


const CreateMeeting = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [proposals, setProposals] = useState([]);

    const [durationState, setDurationState] = useState('30 min');
    const [durationValue, setDurationValue] = useState(30);

    const [chosenUsers, setChosenUsers] = useState([]);

    const [customInputValue, setCustomInputValue] = useState(0);

    const [isCustom, setIsCustom] = useState(false);

    const localizer = momentLocalizer(moment);


    const handleChange = (
        event,
        newValue
    ) => {
        setDurationState(newValue);
        if (newValue === durationState) return;
        if (newValue === "custom") {
            if (!isCustom) {
                setIsCustom(true);
            }
            setDurationValue(customInputValue);
        }
        else {
            setIsCustom(false);
            setDurationValue(parseInt(newValue.slice(0, -4)))
        }
    };

    const handleCustomInputChange = () => {
        if (isCustom) {
            setDurationValue(customInputValue);
        }
    }

    const addMeetingProposals = (meetingId) => {
        for (let proposal in proposals) {
            let proposalStartTime = new Date(proposal.start);
            let proposalEndTime = new Date(proposal.end);

            let formattedStartTime = formatDateTime(proposalStartTime);
            let formattedEndTime = formatDateTime(proposalEndTime);

            let data = {
                startTime: formattedStartTime,
                endTime: formattedEndTime
            }

            fetch(config.apiUrl+'/meetings/'+meetingId+'/proposals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (response.ok) {
                        console.log("Added meeting proposal successfully")
                    }
                    else {
                        console.log("Proposal addition failure");
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }

    const handleMeetingCreate = () => {

        let data = {
            title: title,
            description: description,
            organiser: JSON.parse(localStorage.getItem("userData")).userId
        }

        fetch(config.apiUrl+'/meetings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log(response.headers)
                    let meetingId = response.headers.get('Location');
                    console.log(meetingId);
                    meetingId = meetingId.split('/')[-1];
                    console.log(meetingId);
                    addMeetingProposals(meetingId);
                    alert("Meeting created");
                }
                else {
                    console.log("Response error");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className={styles.container}>
            <TextField
                id="standard-basic"
                label="Title"
                variant="standard"
                fullWidth={true}
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            <br/>
            <TextField
                id="standard-basic"
                label="Description"
                variant="standard"
                fullWidth={true}
                value={description}
                onChange={event => setDescription(event.target.value)}
            />
            <br/>
            <label style={{marginTop: "20px", display: "block", marginBottom: "60px"}}>
                Duration:
                <br/>
                <ToggleButtonGroup
                    color="primary"
                    value={durationState}
                    exclusive
                    onChange={handleChange}
                    aria-label="Platform"
                    style={{marginTop: "10px", float: "left"}}
                >
                    <ToggleButton value="15 min">15 min</ToggleButton>
                    <ToggleButton value="30 min">30 min</ToggleButton>
                    <ToggleButton value="60 min">60 min</ToggleButton>
                    <ToggleButton value="120 min">120 min</ToggleButton>
                    <ToggleButton value="custom">Custom</ToggleButton>
                </ToggleButtonGroup>
                <div
                    hidden={!isCustom}
                    style={{
                        marginLeft: "50px",
                        float: "left"
                    }}
                >
                    <TextField
                        id="standard-basic"
                        label="Duration (min)"
                        variant="standard"
                        type="number"
                        value={customInputValue}
                        onChange={(event) => {
                            setCustomInputValue(parseInt(event.target.value));
                            handleCustomInputChange(customInputValue);
                        }}
                    />
                </div>
            </label>


            <br/>
            <br/>

            <WeekCalendar
                localizer={localizer}
                duration={durationValue}
                key={durationValue}
                proposals={proposals}
                setProposals={setProposals}
            />

            <br/>
            <br/>


            <h2>Participants: </h2>

            <div className={styles.userAdding}>
                <div className={styles.searchBox}>
                    <UserSearch chosen={chosenUsers} setChosen={setChosenUsers}/>
                </div>
                <div className={styles.usersAdded}>
                    <div className={styles.usersAddedCaption}>
                        <h2>Users added to meeting:</h2>
                    </div>
                    <div className={styles.usersAddedContent}>
                        <List>
                            {chosenUsers.map(user => (
                                <ListItem key={user.login}>
                                    <UserCard
                                        login={user.login}
                                        email={user.email}
                                        name={user.name}
                                        addPresent={false}
                                        chosen={null}
                                        setChosen={null}
                                        width="70%"
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
            </div>

            <div className={styles.createMeetingButton}>
            <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        borderRadius: "20px"
                    }}
                    style={{
                        marginTop: 0,
                        marginLeft: "auto",
                        marginRight: "auto",
                        paddingLeft: "150px",
                        paddingRight: "150px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                    }}
                    onClick={handleMeetingCreate}
                >
                    <Typography
                        variant="body2"
                        color="textPrimary"
                        sx={{
                            textTransform: 'none',
                            letterSpacing: '2px',
                            fontSize: "1.2em"
                        }}
                    >
                        Create Meeting
                    </Typography>
                </Button>
            </div>

            <br/>
            <br/>

        </div>
    )
}

export default CreateMeeting;