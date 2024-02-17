import React from 'react';
import { Typography, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import VerifiedIcon from '@mui/icons-material/Verified';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import HomeIcon from '@mui/icons-material/Home';
import styles from '../styles/home.module.css'

const ReassurancePanel = () => {

    return (
        <div className={styles.panel}>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Grid item>
                            <CheckCircleIcon className={styles.icon} color="primary"/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" align="center">Easy to use - start right away with intuitive
                                interface</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Grid item>
                            <AccessTimeIcon className={styles.icon} color="primary"/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" align="center">Create your meeting in 5 minutes</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Grid item>
                            <AllInclusiveIcon className={styles.icon} color="primary"/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" align="center">Unlimited meetings - no limits on usage</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Grid item>
                            <HomeIcon className={styles.icon} color="primary"/>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" align="center">Keep your schedule in one place</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default ReassurancePanel;
