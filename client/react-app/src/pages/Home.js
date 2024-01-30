import TabsComponent from "../components/TabsComponent";
import styles from "../styles/home.module.css"
import main_photo from "../resources/image.jpg"
import HighlightButton from "../components/HighlightButton";

const Home = () => {
    return (
        <>
            <div className={styles.banner}>
                <div className={styles.bannerLeft} style={{textAlign: "center", padding: "2%", boxSizing: "border-box"}}>
                    <span style={{fontSize: "50px", textAlign: "center", fontWeight: "bold"}}>
                        Scheduling<br/> meetings <br/> made easy
                    </span>
                    <br/>
                    <br/>
                    <br/>
                    <div style={{textAlign: "justify"}}>
                        Tired of fitting into your colleagues' overbooked schedules?<br/>
                        Let your team do it for you with MeetIT. Just choose participants, set possible
                        times and see how seamlessly you can arrange meetings
                    </div>
                    <div style={{fontSize: "40px"}}>
                        <HighlightButton value={"Sign up now"} size="40"/>
                    </div>
                </div>
                <div className={styles.bannerRight}>
                    <img alt={"main-photo"} src={main_photo} className={styles.mainPhoto}/>
                </div>
            </div>
            <TabsComponent/>
        </>
    )
};

export default Home;