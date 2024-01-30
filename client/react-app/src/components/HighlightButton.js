import styles from "../styles/navButtons.module.css";
import {Link} from "react-router-dom";


function HighlightButton(props) {

    return (
        <Link to={(props.value !== "Account") ? "/signup" : "/"}>
            <button className={styles.highlightButton}>
                {props.value}
            </button>
        </Link>
    )
}

export default HighlightButton;