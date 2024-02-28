import ParticipantsList from "./ParticipantsList";
import styles from "../../styles/meetingPanel.module.css"
import ProposalsList from "./ProposalsList";
import MeetingActionsPanel from "./MeetingActionsPanel";
import {useAuth} from "../../context/AuthContext";
import {useState} from "react";


const MeetingPanel = (props) => {

    const meetingData = props.meetingData;

    const {userId} = useAuth();

    return (
        <div className={styles.container}>
            <hr />

            <div className={styles.left}>
                <div className={styles.proposals}>
                    <ProposalsList
                        meetingData={meetingData}
                        owner={userId === meetingData.organiser}
                    />
                </div>
                <div className={styles.actions}>
                    <hr />
                    <MeetingActionsPanel
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
    )
}

export default MeetingPanel;