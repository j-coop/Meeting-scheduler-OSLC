import {Button, Tooltip, Typography} from "@mui/material";
import React from "react";


const StandardButton = ({handleClick, color, text, disabled, disabledText}) => {


    return (
        <span>
        {disabled ? (
            <Tooltip title={disabledText}>
            <span>
                <Button
                    variant="contained"
                    color={color}
                    sx={{
                      borderRadius: "10px"
                    }}
                    style={{
                      paddingLeft: "15px",
                      paddingRight: "15px"
                    }}
                    disabled={disabled}
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
            </span>
            </Tooltip>
        ) : (
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
                disabled={disabled}
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
        )}
        </span>
    );

}

export default StandardButton;