import StandardButton from "../StandardButton";
import config from "../../config";
import {useMeetingContext} from "../../context/MeetingContext";


const MeetingActionsPanel = (props) => {

    let id = props.meetingData.id;
    let isOwner = props.owner;

    const {status, setStatus} = useMeetingContext();

    const handleCancel = () => {

        let path = config.apiUrl+'/meetings/'+id+'/cancel';

        fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log("meeting cancelled");
                    setStatus("CANCELLED")
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleCompleted = () => {

        let path = config.apiUrl+'/meetings/'+id+'/complete';

        fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    console.log("meeting marked completed");
                    setStatus("COMPLETED");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div>
            <span>
            <StandardButton
                text="Cancel"
                color="error"
                handleClick={handleCancel}
                disabled={!(isOwner && (status === "PROPOSED" || status === "SCHEDULED"))}
                disabledText="Only meeting owner can cancel the meeting"
            />
            </span>
            <span style={{marginLeft: "15px"}}>
            <StandardButton
                text="Mark completed"
                color="secondary"
                handleClick={handleCompleted}
                disabled={!(isOwner && status === "SCHEDULED")}
                disabledText="A scheduled meeting can be marked completed by meeting owner"
            />
            </span>
        </div>
    )
}

export default MeetingActionsPanel;