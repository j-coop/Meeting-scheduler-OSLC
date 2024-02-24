import {Fragment} from "react";
import {Box, Typography} from "@mui/material";


const Footer = () => {


    return (
        <Fragment>
            <Box width={"100%"} sx={{bgcolor: "background.paper"}}>
                <Typography align={"right"}>MeetIt@2024 Jakub Bednarz ETI PG</Typography>
            </Box>
        </Fragment>
    )
}

export default Footer;