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

    const [chosenOption, setChosenOption] = useState(null);

    const [responses, setResponses] = useState([]);

    let proposed = meetingData.status === "PROPOSED";

    const sendVote = (newOption, previousOption) => {

        let param = previousOption !== null ? '?prev='+previousOption : '';

        let path = config.apiUrl+'/meetings/'+meetingId+'/proposals/'+proposalId+'/responses'+param;

        let data = {
            userId: userId,
            response: newOption
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

    const fetchResponses = async () => {
        let path = config.apiUrl+'/meetings/'+meetingId+'/proposals/'+proposalId+'/responses';
        try {
            const response = await axios.get(path);
            const responsesList = response.data.responsesList || [];
            console.log(responsesList)
            setResponses(responsesList);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleVote = (option) => {
        sendVote(option, chosenOption);
        // change active option
        setChosenOption(option);
    };

    useEffect(() => {
        fetchResponses().then();
    }, [chosenOption]);

    // Handling fetched responses
    useEffect(() => {
        let votes = {
            AVAILABLE: 0,
            IF_MUST: 0,
            UNAVAILABLE: 0
        };
        for (const response of responses) {
            let option = response.response;
            if (typeof response.userId !== "undefined" && response.userId === userId) {
                // user's response
                setChosenOption(option);
            }
            votes[option]++;
        }
        setVotes(votes);
    }, [responses]);

    return (
        <div>
            <Tooltip title="Available">
                <IconButton
                    onClick={() => proposed ? handleVote('AVAILABLE') : null}
                    color={chosenOption === 'AVAILABLE' ? 'secondary' : 'default'}
                >
                    <CheckIcon/>
                    <span>{votes.AVAILABLE}</span>
                </IconButton>
            </Tooltip>

            <Tooltip title="If must">
                <IconButton
                    onClick={() => proposed ? handleVote('IF_MUST') : null}
                    color={chosenOption === 'IF_MUST' ? 'secondary' : 'default'}
                >
                    <PriorityHighIcon/>
                    <span>{votes.IF_MUST}</span>
                </IconButton>
            </Tooltip>

            <Tooltip title="Unavailable">
                <IconButton
                    onClick={() => proposed ? handleVote('UNAVAILABLE') : null}
                    color={chosenOption === 'UNAVAILABLE' ? 'secondary' : 'default'}
                >
                    <CloseIcon/>
                    <span>{votes.UNAVAILABLE}</span>
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default ResponsesPanel;