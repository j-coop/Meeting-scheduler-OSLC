import {Fragment} from "react";
import {Box, Stack, Typography} from "@mui/material";
import Logo from "./Logo";
import {Link} from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import styles from "../styles/home.module.css";


const Footer = () => {


    return (
        <Fragment>
            <Box width={"100%"} sx={{bgcolor: "background.paper", marginTop: "20px"}}>
                <footer className={styles.footer}>
                    <div className={styles.footerWrapper}>
                        <div className={styles.footerLogo}>
                            <Logo/>
                        </div>
                        <div className={styles.footerContainer}>
                            <div className={styles.footerContainerTop}>
                                <div className={styles.footerContainerTopLeft}>
                                    <Link to={"/about"}>
                                        <Typography align={"left"} color={"text.primary"}>
                                            About
                                        </Typography>
                                    </Link>
                                </div>
                                <div className={styles.footerContainerTopRight}>
                                    <a href="https://github.com/j-coop/Meeting-scheduler-OSLC" target="_blank">
                                        <Stack direction="row" alignItems="center" flexGap={1}>
                                            <GitHubIcon sx={{color: 'text.primary', marginRight: '3px'}}/>
                                            <Typography variant="body1" color="text.primary">
                                                Github page
                                            </Typography>
                                        </Stack>
                                    </a>
                                </div>
                            </div>
                            <div className={styles.footerContainerBottom}>
                                <Typography align={"right"}>MeetIT@2024 Jakub Bednarz ETI PG</Typography>
                            </div>
                        </div>
                    </div>
                </footer>
            </Box>
        </Fragment>
    )
}

export default Footer;