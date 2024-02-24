import ParticipantsList from "./ParticipantsList";


const MeetingPanel = (props) => {


    return (
        <div>
            <hr />
            <h2>Meeting Panel</h2>
            {props.id}
            <ParticipantsList id={props.id}/>
        </div>
    )
}

export default MeetingPanel;