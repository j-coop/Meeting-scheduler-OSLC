import {Button, Typography} from "@mui/material";
import React from "react";


const StandardButton = ({handleClick, color, text}) => {


    return (
        <Button
            onClick={handleClick}
            variant="contained"
            color={color}
            sx={{
                borderRadius: "10px"
            }}
            style={{
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
                {text}
            </Typography>
        </Button>
    )
}

export default StandardButton;