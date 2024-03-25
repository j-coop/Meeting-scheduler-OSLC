import {useEffect, useState} from "react";
import config from "../../config";
import axios from "axios";
import {List} from "@mui/material";
import ProposalTile from "./ProposalTile";
import {parseDateToISO8601, parseISO8601ToDate, setTimeZone} from "../../utils/FormatDate";
import {useAuth} from "../../context/AuthContext";


const ProposalsList = (props) => {

    let meetingData = props.meetingData;
    let meetingId = meetingData.id;
    let isOwner = props.owner;

    const [proposals, setProposals] = useState([]);

    const {userTimezone} = useAuth();

    const fetchProposals = async () => {
        let path = config.apiUrl+'/meetings/'+meetingId+'/proposals';
        try {
            const response = await axios.get(path);
            const proposalsList = response.data.proposalsList || [];

            console.log(proposalsList)

            // convert proposal list dates to user timezone
            for (let proposal of proposalsList) {
                let start = proposal.startTime;
                let startDate = parseISO8601ToDate(start);
                let offsetStartDate = setTimeZone(startDate, userTimezone);

                let end = proposal.endTime;
                let endDate = parseISO8601ToDate(end);
                let offsetEndDate = setTimeZone(endDate, userTimezone);

                proposal.startTime = parseDateToISO8601(offsetStartDate);
                proposal.endTime = parseDateToISO8601(offsetEndDate);
            }

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
                                id={proposal.id}
                                proposalData={proposal}
                                owner={isOwner}
                                meetingData={props.meetingData}
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