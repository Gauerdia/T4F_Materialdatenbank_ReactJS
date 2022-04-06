import React from "react";
import { useFormik} from 'formik';
import {TextField} from "@material-ui/core";
import {auth} from "../services/firebase-config";
import {createUserWithEmailAndPassword } from 'firebase/auth'
import {createUser} from '../services/firebase-crud';

import '../styles/Register.css';

function RegisterPage() {

    const formik = useFormik({
        initialValues: {
            name: '',
            email: "",
            password: '',
            experience:''
        },
        // validate,
        onSubmit: values => {
            handleAuth(values);

        },
    });

    const handleAuth = (values) => {
        createUserWithEmailAndPassword(auth, values["email"], values["password"]).then(
            (response) => {
                let experienceToExport = ""
                if(values["experience"] !== undefined){
                    experienceToExport = values["experience"]
                }
                createUser(response.user.uid, values['name'], values['email'],experienceToExport)
                sessionStorage.setItem('t4f_auth_token', response._tokenResponse.refreshToken)
                sessionStorage.setItem('login_id', response.user.uid)
                //navigate('/intern')
            }
        ).catch((error) =>{
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Error code: ", errorCode, ". Error message: ", errorMessage)
        })
    }

    return (
        <div className="registerMain">
            <div className="registerHead">
                <p className="registerTitle">
                    Registrieren
                </p>
                <form onSubmit={formik.handleSubmit}>
                    <div className="registerNameDiv">
                    <TextField
                        id="name"
                        name="name"
                        type="text"
                        label="Name"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    </div>
                    <div className="registerEMailDiv">
                    <TextField
                        id="email"
                        name="email"
                        type="text"
                        label="E-Mail"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    </div>
                    <div className="registerPasswordDiv">
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        label="Passwort"
                        variant="outlined"
                        className="passwordField"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    </div>
                    <div className="registerPasswordDiv">
                        <TextField
                            id="experience"
                            name="experience"
                            type="password"
                            label="Berufserfahrung (optional)"
                            variant="outlined"
                            className="passwordField"
                            onChange={formik.handleChange}
                            value={formik.values.experience}
                        />
                    </div>
                    <button type="submit" className="submitButton">Registrieren</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;
