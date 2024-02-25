import {useEffect, useState} from "react";
import config from "../../config";
import axios from "axios";
import {List} from "@mui/material";
import ParticipantTile from "./ParticipantTile";
import ProposalTile from "./ProposalTile";


const ProposalsList = (props) => {

    let meetingId = props.id;

    const [proposals, setProposals] = useState([]);

    const fetchProposals = async () => {
        let path = config.apiUrl+'/meetings/'+meetingId+'/proposals';
        try {
            const response = await axios.get(path);
            const proposalsList = response.data.proposalsList || [];
            setProposals(proposalsList);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchProposals();
    }, [meetingId]);

    return (
        <div>
            <List>
                {
                    proposals.map(proposal => (
                        <div>
                            <ProposalTile
                                proposalData={proposal}
                            />
                            <br/>
                        </div>
                    ))
                }
            </List>
        </div>
    )
}

export default ProposalsList;