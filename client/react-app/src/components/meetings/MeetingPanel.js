import ParticipantsList from "./ParticipantsList";
import styles from "../../styles/meetingPanel.module.css"
import ProposalsList from "./ProposalsList";
import MeetingActionsPanel from "./MeetingActionsPanel";
import {useAuth} from "../../context/AuthContext";
import {Button} from "@mui/material";
import config from "../../config";


const MeetingPanel = (props) => {

    const meetingData = props.meetingData;
    const meetingId = meetingData.id;

    const {userId} = useAuth();

    const userStatus = props.userStatus;
    const userParticipationId = props.userParticipationId;

    const setParticipationStatus = props.setParticipationStatus;

    const changeParticipationStatus = (accepted) => {

        let path = config.apiUrl+'/meetings/'+meetingId+'/participations/'+
            userParticipationId+'/status?accepted='+accepted;

        fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log(accepted ? 'joined' : 'declined');
                    setParticipationStatus(accepted ? 'JOINED' : 'DECLINED')
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleAccept = () => {
        changeParticipationStatus(true);
    }

    const handleDecline = () => {
        changeParticipationStatus(false);
    }

    return (
        <div>
            <hr/>
            {
                userStatus === "JOINED" ?
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <div className={styles.left}>
                                <div className={styles.proposals}>
                                    <ProposalsList
                                        meetingData={meetingData}
                                        owner={userId === meetingData.organiser}
                                    />
                                </div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.participants}>
                                    <ParticipantsList
                                        id={meetingData.id}
                                        ownerId={meetingData.organiser}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <hr/>
                            <MeetingActionsPanel
                                meetingData={meetingData}
                                owner={userId === meetingData.organiser}
                            />
                        </div>
                    </div>
                    :
                    <div className={styles.container} style={{height: "fit-content"}}>
                        <hr/>

                        <div className={styles.prompt}>
                            <h2>Do you want to join this meeting?</h2>
                            <Button onClick={handleAccept}>Yes</Button>
                            <Button onClick={handleDecline}>No</Button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default MeetingPanel;