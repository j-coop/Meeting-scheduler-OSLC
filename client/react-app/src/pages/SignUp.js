import Logo from "../components/Logo";
import styles from "../styles/signup.module.css"

const SignUp = () => {
    return (
        <div className={styles.container}>
            <div className={styles.signupLogo}>
                <Logo/>
            </div>
            <div className={styles.wrapper}>
                <input placeholder={"e-mail"}/>
                <input placeholder={"full name"}/>
                <input placeholder={"login"}/>
                <input placeholder={"password"}/>
                <input placeholder={"password"}/>
                <button style={{display: "block"}}>Create account</button>
            </div>
        </div>
    );
};

export default SignUp;