import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import React from "react";


const CreateMeetingButton = ({vertical}) => {

    return (
        <div style={vertical ? {marginTop: '10px'} : {display: 'flex', alignItems: 'center'}}>
            <Link to={"/create"}>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        borderRadius: "20px"
                    }}
                    style={{
                        marginTop: 0,
                        paddingLeft: "15px",
                        paddingRight: "15px"
                    }}
                >
                    <Typography
                        variant="body2"
                        color="textPrimary"
                        sx={{
                            textTransform: 'none',
                            letterSpacing: '1px'
                        }}
                    >
                        <span style={{fontWeight: "bold"}}>+</span> Create Meeting
                    </Typography>
                </Button>
            </Link>
        </div>
    )
}

export default CreateMeetingButton;