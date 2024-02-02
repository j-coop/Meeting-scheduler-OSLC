import Logo from "../components/Logo";
import styles from "../styles/signup.module.css"
import {useState} from "react";
import config from "../config";
import { useNavigate } from 'react-router-dom';

function signUp() {

}

const SignUp = () => {

    const [inputs, setInputs] = useState({
        "email": "",
        "full_name": "",
        "login": "",
        "password": "",
        "repeat_password": ""
    });

    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (inputs.password !== inputs.repeat_password) {
            alert("Passwords don't match!");
            return;
        }

        let body = {
            "email": inputs.email,
            "fullName": inputs.full_name,
            "login": inputs.login,
            "password": inputs.password,
            "timezone": "UTC+0"
        }

        fetch(config.apiUrl+'/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                console.log(response);
                if (response.ok) {
                    alert("Created");
                    navigate("/");
                }
                else if (response.status === 409) {
                    alert("Account with this email or login already exists");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className={styles.container}>
            <div className={styles.signupLogo}>
                <Logo/>
            </div>
            <div className={styles.wrapper}>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder={"e-mail"}
                        type="text"
                        name="email"
                        value={inputs.email || ""}
                        onChange={handleChange}
                    />
                    <input
                        placeholder={"full name"}
                        type="text"
                        name="full_name"
                        value={inputs.full_name || ""}
                        onChange={handleChange}
                    />
                    <input
                        placeholder={"login"}
                        type="text"
                        name="login"
                        value={inputs.login || ""}
                        onChange={handleChange}
                    />
                    <input
                        placeholder={"password"}
                        type="text"
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                    />
                    <input
                        placeholder={"password"}
                        type="text"
                        name="repeat_password"
                        value={inputs.repeat_password || ""}
                        onChange={handleChange}
                    />
                    <button style={{display: "block"}} type={"submit"}>Create account</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;