import React, {useEffect, useState} from "react";
// import {useNavigate} from "react-router-dom";
import { db} from "../services/firebase-config"
import {
    doc,
    getDoc
} from 'firebase/firestore';

import '../styles/ProfilePage.css';

function ProfilePage() {


    const [userName, setUserName] = useState([]);
    const [userEMail, setUserEMail] = useState([]);
    const [userRole, setUserRole] = useState([]);
    const [userExperience, setUserExperience] = useState([]);

    useEffect(() => {
        getUser();
    },[]);

    const getUser = async() =>{
        const docRef = doc(db, "users", sessionStorage.getItem('login_id'))
        await getDoc(docRef).then(
            (result) =>{
                setUserName(result.data()["name"]);
                setUserEMail(result.data()["email"]);
                setUserRole(result.data()["role"]);
                setUserExperience(result.data()["experience"]);
            }
        );
    }

    return (
        <div className="profileMain">


            {/*HEADER*/}


            <div className="profileHeader">
                <p className="profileHeaderText">
                    Profil
                </p>
            </div>


            {/*LEFT COLUMN*/}


            <div className="leftColumn">
                <p> </p>
            </div>


            {/*MAIN COLUMN*/}


            <div className="mainColumn">
                <div className="profileMainContent">
                    <div className="detailFlexParent">
                        <div className="detailFlexCategoryLeft">
                            <div className="detailCategoryDiv">
                                <p className="profileCategoryText">Name:</p>
                            </div>
                        </div>
                        <div className="detailFlexCategoryRight">
                            <div className="detailCategoryDiv">
                                <p className="textHeader">E-Mail:</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="detailFlexParent">
                    <div className="detailFlexValueLeft">
                        {userName}
                    </div>
                    <div className="detailFlexValueRight">
                        {userEMail}
                    </div>
                </div>

                <div>
                    <div className="detailFlexParent">
                        <div className="detailFlexCategoryLeft">
                            <div className="detailCategoryDiv">
                                <p className="profileCategoryText">Rolle:</p>
                            </div>
                        </div>
                        <div className="detailFlexCategoryRight">
                            <div className="detailCategoryDiv">
                                <p className="textHeader">Berufserfahrung:</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="detailFlexParent">
                    <div className="detailFlexValueLeft">
                        {userRole === 0
                            ? "Einfaches Mitglied"
                            : userRole === 1
                                ? "Vollwertiges Mitglied"
                                : userRole === 2
                                    ? "RedakteurIn"
                                    : "Keine Angabe"
                        }
                    </div>
                    <div className="detailFlexValueRight">
                        {userExperience !== "" ? userExperience : "Keine Angabe"}
                    </div>
                </div>
            </div>


            {/*RIGHT COLUMN*/}


            <div className="rightColumn">
                <p> </p>
            </div>
        </div>
    );
}

export default ProfilePage;
