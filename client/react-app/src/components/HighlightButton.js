import styles from "../styles/navButtons.module.css";


function HighlightButton(props) {

    return (
        <button className={styles.highlightButton}>{props.value}</button>
    )
}

export default HighlightButton;