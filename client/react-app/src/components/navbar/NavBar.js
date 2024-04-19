import {Link} from "react-router-dom";
import styles from "../../styles/nav.module.css"
import NavButtons from "./NavButtons";
import Logo from "../common/Logo";
import {useAuth} from "../../context/AuthContext";
import {Button, Drawer, Typography} from "@mui/material";
import React, {useState} from "react";
import MenuIcon from '@mui/icons-material/Menu';
import UserCard from "../UserCard";

const NavBar = () => {

    const {isLoggedIn} = useAuth();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav>
            <div className={styles.navContainer}>
                <div className={styles.logoContainer}>
                    <Logo/>
                </div>
                <div className={styles.menuContainer}>
                    <div className={styles.navMenu}>
                        <ul>
                            <li>
                                <Link to="/" className={styles.navLink}>
                                    <Typography variant="h6" color="textPrimary">Home</Typography>
                                </Link>
                            </li>
                            <li>
                                <Link to="/users" className={styles.navLink}>
                                    <Typography variant="h6" color="textPrimary">Users</Typography>
                                </Link>
                            </li>
                            {
                                isLoggedIn &&
                                (
                                    <>
                                        <li>
                                            <Link to="/meetings" className={styles.navLink}>
                                                <Typography variant="h6" color="textPrimary">Meetings</Typography>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/settings" className={styles.navLink}>
                                                <Typography variant="h6" color="textPrimary">Settings</Typography>
                                            </Link>
                                        </li>
                                    </>
                                )
                            }
                        </ul>
                    </div>
                    {
                        !isMenuOpen &&
                        <NavButtons vertical={false}/>
                    }
                </div>
                <div className={styles.menuToggle}>
                    <Button onClick={toggleMenu}>
                    <MenuIcon/>
                    </Button>
                </div>
            </div>
            {
                isMenuOpen &&
                <Drawer open={isMenuOpen} onClose={closeMenu}>
                    <div className={styles.drawer}>
                        <div>
                            <Logo onClick={closeMenu}/>
                        </div>
                        {
                            isLoggedIn &&
                            <div style={{marginTop: "5px"}}>
                                <UserCard
                                    addPresent={false}
                                    compact={true}
                                    onClick={closeMenu}
                                />
                            </div>
                        }
                        <div className={styles.drawerLinks}>
                            <ul>
                                <li>
                                    <Link to="/" className={styles.navLink} onClick={closeMenu}>
                                        <Typography variant="h6" color="textPrimary">Home</Typography>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/users" className={styles.navLink} onClick={closeMenu}>
                                        <Typography variant="h6" color="textPrimary">Users</Typography>
                                    </Link>
                                </li>
                                {
                                    isLoggedIn &&
                                    (
                                        <>
                                            <li>
                                                <Link to="/meetings" className={styles.navLink} onClick={closeMenu}>
                                                    <Typography variant="h6" color="textPrimary">Meetings</Typography>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/settings" className={styles.navLink} onClick={closeMenu}>
                                                    <Typography variant="h6" color="textPrimary">Settings</Typography>
                                                </Link>
                                            </li>
                                        </>
                                    )
                                }
                            </ul>
                        </div>
                        <div className={styles.drawerButtons}>
                            <NavButtons vertical={true} onClick={closeMenu}/>
                        </div>
                    </div>
                </Drawer>
            }

        </nav>
    )
}

export default NavBar;