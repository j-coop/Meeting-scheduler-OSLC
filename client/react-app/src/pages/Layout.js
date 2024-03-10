import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar";
import {AuthProvider} from "../context/AuthContext";
import React, {useEffect} from 'react'
import {ColorModeProvider} from "../context/ColorModeContext";
import Footer from "../components/common/Footer";
import styles from "../styles/home.module.css"


const Layout = () => {

    useEffect(() => {
        const adjustContentHeight = () => {
            const pageContainer = document.querySelector('.page-container');
            const content = document.querySelector('.content');
            const footer = document.querySelector('.footer');
            const navbar = document.querySelector('.navbar');

            if (pageContainer && content && footer && navbar) {
                const windowHeight = window.innerHeight;
                const contentHeight = content.offsetHeight;
                const footerHeight = footer.offsetHeight;
                const navbarHeight = navbar.offsetHeight;

                if (contentHeight + footerHeight + navbarHeight < windowHeight) {
                    const newContentHeight = windowHeight - footerHeight - navbarHeight;
                    content.style.height = `${newContentHeight}px`;
                }
            }
        };

        //adjustContentHeight();
        //window.addEventListener('resize', adjustContentHeight);
        
    }, );

    return (
        <ColorModeProvider>
            <AuthProvider>
                <div className={styles.bodyContainer}>
                    <div className={styles.contentsWrapper}>
                        <div className="navbar">
                            <NavBar/>
                        </div>
                        <div className={styles.pageContainer}>
                            <div className={styles.content}>
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.footerPageContainer}>
                        <Footer/>
                    </div>
                </div>
            </AuthProvider>
        </ColorModeProvider>
    )
};

export default Layout;