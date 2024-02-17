import React from 'react';
import { Typography, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import VerifiedIcon from '@mui/icons-material/Verified';
import styles from '../styles/home.module.css'

const ReassurancePanel = () => {

    return (
        <div className="panel">
            <Grid container spacing={3}>
                <Grid item xs={3} container justifyContent="center" alignItems="center">
                    <CheckCircleIcon className="icon"/>
                    <Typography variant="h6">Quality Assurance</Typography>
                </Grid>
                <Grid item xs={3} container justifyContent="center" alignItems="center">
                    <SecurityIcon className="icon"/>
                    <Typography variant="h6">Security</Typography>
                </Grid>
                <Grid item xs={3} container justifyContent="center" alignItems="center">
                    <VerifiedUserIcon className="icon"/>
                    <Typography variant="h6">Trust</Typography>
                </Grid>
                <Grid item xs={3} container justifyContent="center" alignItems="center">
                    <VerifiedIcon className="icon"/>
                    <Typography variant="h6">Certified</Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default ReassurancePanel;
