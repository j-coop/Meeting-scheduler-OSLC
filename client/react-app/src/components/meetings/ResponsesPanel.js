import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import {IconButton, Tooltip} from "@mui/material";
import {useEffect, useState} from "react";
import config from "../../config";
import axios from "axios";
import {useAuth} from "../../context/AuthContext";

const ResponsesPanel = ({meetingData, proposalId}) => {

    let meetingId = meetingData.id;

    const {userId} = useAuth();

    const [votes, setVotes] = useState({
        AVAILABLE: 0,
        IF_MUST: 0,
        UNAVAILABLE: 0
    });

    const [activeOption, setActiveOption] = useState(null);

    const [responses, setResponses] = useState([]);

    const sendVote = (option) => {

        let path = config.apiUrl+'/meetings/'+meetingId+'/proposals/'+proposalId+'/responses';

        let data = {
            userId: userId,
            response: option
        }

        fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    console.log("vote sent");

                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleResponses = () => {
        setVotes({
            AVAILABLE: 0,
            IF_MUST: 0,
            UNAVAILABLE: 0
        })
        setVotes((prevVotes) => ({
            ...prevVotes,
            [activeOption]: prevVotes[activeOption] + 1
        }));
        console.log(responses)
        for (const response of responses) {
            console.log(response)
            console.log(response.response)
            let option = response.response;
            setVotes((prevVotes) => ({
                ...prevVotes,
                [option]: prevVotes[option] + 1
            }));
        }
    }

    const fetchResponses = async () => {
        let path = config.apiUrl+'/meetings/'+meetingId+'/proposals/'+proposalId+'/responses';
        try {
            const response = await axios.get(path);
            const responsesList = response.data.responsesList || [];
            console.log(responsesList)
            setResponses(responsesList);
            handleResponses();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchResponses();
    }, [activeOption]);

    const handleVote = (option) => {
        // decrease number of current option votes
        setVotes((prevVotes) => ({
            ...prevVotes,
            [activeOption]: prevVotes[activeOption] - 1
        }));
        // change active option
        setActiveOption(option);
        // increase number of new option votes
        setVotes((prevVotes) => ({
            ...prevVotes,
            [option]: prevVotes[option] + 1
        }));
        sendVote(option);
    };

    return (
        <div>
            <Tooltip title="Available">
                <IconButton
                    onClick={() => handleVote('AVAILABLE')}
                    color={activeOption === 'AVAILABLE' ? 'secondary' : 'default'}
                >
                    <CheckIcon/>
                    <span>{votes.AVAILABLE}</span>
                </IconButton>
            </Tooltip>

            <Tooltip title="If must">
                <IconButton
                    onClick={() => handleVote('IF_MUST')}
                    color={activeOption === 'IF_MUST' ? 'secondary' : 'default'}
                >
                    <PriorityHighIcon/>
                    <span>{votes.IF_MUST}</span>
                </IconButton>
            </Tooltip>

            <Tooltip title="Unavailable">
                <IconButton
                    onClick={() => handleVote('UNAVAILABLE')}
                    color={activeOption === 'UNAVAILABLE' ? 'secondary' : 'default'}
                >
                    <CloseIcon/>
                    <span>{votes.UNAVAILABLE}</span>
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default ResponsesPanel;