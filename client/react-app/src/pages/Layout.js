import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import {AuthProvider} from "../context/AuthContext";
import React, {useEffect} from 'react'
import {ColorModeProvider} from "../context/ColorModeContext";
import Footer from "../components/Footer";
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

        adjustContentHeight();
        window.addEventListener('resize', adjustContentHeight);
        
    }, []);

    return (
        <ColorModeProvider>
            <AuthProvider>
                <>
                    <div className="navbar">
                        <NavBar/>
                    </div>
                    <div className="page-container">
                        <div className="content">
                            <Outlet/>
                        </div>
                        <footer className="footer">
                            <Footer/>
                        </footer>
                    </div>
                </>
            </AuthProvider>
        </ColorModeProvider>
    )
};

export default Layout;