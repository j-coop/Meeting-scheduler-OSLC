import ParticipantsList from "./ParticipantsList";
import styles from "../../styles/meetingPanel.module.css"
import ProposalsList from "./ProposalsList";


const MeetingPanel = (props) => {

    const meetingData = props.meetingData;

    return (
        <div className={styles.container}>
            <hr />

            <div className={styles.left}>
                <div className={styles.proposals}>
                    <ProposalsList id={meetingData.id}/>
                </div>
                <div className={styles.actions}>

                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.participants}>
                    <ParticipantsList id={meetingData.id} ownerId={meetingData.organiser}/>
                </div>
            </div>

        </div>
    )
}

export default MeetingPanel;