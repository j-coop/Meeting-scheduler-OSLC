import styles from "../styles/navButtons.module.css";
import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext";


function HighlightButton(props) {
    const {isLoggedIn,} = useAuth();

    return (
        <Link to={isLoggedIn ? "/" : "/signup"}>
            <button className={styles.highlightButton}>
                {props.value}
            </button>
        </Link>
    )
}

export default HighlightButton;