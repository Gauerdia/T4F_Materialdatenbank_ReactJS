import React, {useEffect} from "react";
import {useFormik} from 'formik';
import {TextField} from "@material-ui/core";
import {auth} from '../services/firebase-config'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {useNavigate} from "react-router-dom";

import '../styles/LogIn.css';

function LogInPage(props) {

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: '',
        },
        // validate,
        onSubmit: values => {
            handleAuth(values);

        },
    });

    const handleAuth = (values) => {
        signInWithEmailAndPassword(auth, values["email"], values["password"]).then(
            (response) => {
                sessionStorage.setItem('t4f_auth_token', response._tokenResponse.refreshToken)
                sessionStorage.setItem('login_id', response.user.uid)
                props.handleLogin()
                navigate('/intern')
            }
        )
    }

    useEffect(() => {
        let authToken = sessionStorage.getItem('t4f_auth_token')
        if(authToken){
            navigate('/intern')
            alert("Sie sind bereits eingeloggt.")
        }else{
            navigate('/login')
        }
    },[]);


    return (
        <div className="loginMain">
            <div className="logInHeader">
                <p className="logInHeadText">
                    Log In
                </p>
                <div className="logInContentDiv">
                    <form
                        onSubmit={formik.handleSubmit}>
                        <div className="logInEMailField">
                            <TextField
                                id="email"
                                name="email"
                                type="text"
                                label="E-Mail"
                                variant="outlined"
                                className="logInEMailField"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                        </div>
                        <div className="logInPasswordField">
                            <TextField
                                id="password"
                                name="password"
                                type="password"
                                label="Passwort"
                                variant="outlined"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="logInSubmitButton"
                            >Log In</button>
                        </div>
                    </form>
                    <div className="notYetRegisteredText">
                        <p>Noch kein Mitglied? Dann registrier dich hier:</p>
                        <a href="/register">Registrieren</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogInPage;
