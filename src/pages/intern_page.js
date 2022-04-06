import React, {useEffect, useState} from "react";
import { useNavigate} from 'react-router-dom';
import {doc, getDoc} from "firebase/firestore";
import {db} from "../services/firebase-config";

import PrivateSearchPage from './private_search_page'
import ProfilePage from "./profile_page";
import CreateBNEMaterial from "./create_bne_material_page";
import ApproveNewMembersPage from "./approve_new_members_page";
import ApproveNewMaterialPage from "./approve_new_material_page";

import '../styles/Intern.css';

function InternPage() {

    let navigate = useNavigate();

    const [userName, setUserName] = useState([]);
    const [userEMail, setUserEMail] = useState([]);
    const [userRole, setUserRole] = useState([]);
    const [userExperience, setUserExperience] = useState([]);


    const [activeProfile, setActiveProfile] = useState(true);
    const [activeNewMaterial, setActiveNewMaterial] = useState(false);
    const [activePrivateSearch, setActivePrivateSearch] = useState(false);
    const [activeApproveMember, setActiveApproveMember] = useState(false);
    const [activeApproveMaterial, setActiveApproveMaterial] = useState(false);


    function checkEntitlementProfile(){
        handleActivateProfile()
    }

    function checkEntitlementPrivateSearch(){
        if(userRole > 0){
            handleActivatePrivateSearch()
        }else{
            alert("Tut uns leid. Sie haben leider keine Berechtigung für diese Funktion. Bitte wenden Sie sich" +
                "an die Administration.")
        }
    }

    function checkEntitlementNewMaterial(){
        if(userRole > 1){
            handleActivateNewMaterial()
        }else{
            alert("Tut uns leid. Sie haben leider keine Berechtigung für diese Funktion. Bitte wenden Sie sich" +
                    "an die Administration.")
        }
    }

    function checkEntitlementApproveMember(){
        if(userRole > 2){
            handleActivateApproveMember()
        }else{
            alert("Tut uns leid. Sie haben leider keine Berechtigung für diese Funktion. Bitte wenden Sie sich" +
                "an die Administration.")
        }
    }

    function checkEntitlementApproveMaterial(){
        if(userRole > 1){
            handleActivateApproveMaterial()
        }else{
            alert("Tut uns leid. Sie haben leider keine Berechtigung für diese Funktion. Bitte wenden Sie sich" +
                "an die Administration.")
        }
    }

    function handleActivateProfile(){
        setActiveProfile(true);
        setActiveApproveMaterial(false);
        setActiveApproveMember(false);
        setActivePrivateSearch(false);
        setActiveNewMaterial(false);

    }
    function handleActivatePrivateSearch(){

        setActiveProfile(false);
        setActiveApproveMaterial(false);
        setActiveApproveMember(false);
        setActivePrivateSearch(true);
        setActiveNewMaterial(false);
    }
    function handleActivateNewMaterial(){
        setActiveProfile(false);
        setActiveApproveMaterial(false);
        setActiveApproveMember(false);
        setActivePrivateSearch(false);
        setActiveNewMaterial(true);
    }
    function handleActivateApproveMember(){
        setActiveProfile(false);
        setActiveApproveMaterial(false);
        setActiveApproveMember(true);
        setActivePrivateSearch(false);
        setActiveNewMaterial(false);
    }
    function handleActivateApproveMaterial(){
        setActiveProfile(false);
        setActiveApproveMaterial(true);
        setActiveApproveMember(false);
        setActivePrivateSearch(false);
        setActiveNewMaterial(false);
    }

    useEffect(() => {
        let authToken = sessionStorage.getItem('t4f_auth_token')
        if(authToken){
            navigate('/intern')
            getUser();
        }else{
            navigate('/login')
        }
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
        <div className="internMain">
            <div className="internFlexParentButtons">

                <button
                    onClick={checkEntitlementProfile}
                    className={activeProfile? "internActiveFlexButton" : "internPassiveFlexButton"}>
                    Profil
                </button>


                <button
                    onClick={checkEntitlementPrivateSearch}
                    className={
                        userRole > 0
                                ? activePrivateSearch
                                    ? "internActiveFlexButton"
                                    : "internPassiveFlexButton"
                                : "internProhibitedFlexButton"
                    }>
                    Erweiterte Suche
                </button>

                <button
                    onClick={checkEntitlementNewMaterial}
                    className={
                            userRole > 1
                                ? activeNewMaterial
                                    ? "internActiveFlexButton"
                                    : "internPassiveFlexButton"
                                : "internProhibitedFlexButton"
                    }>
                    Neues Material erstellen
                </button>

                <button
                    onClick={checkEntitlementApproveMember}
                    className={
                            userRole > 2
                                ? activeApproveMember
                                    ? "internActiveFlexButton"
                                    : "internPassiveFlexButton"
                                : "internProhibitedFlexButton"
                            }>
                    Neue Nutzer freigeben
                </button>

                <button
                    onClick={checkEntitlementApproveMaterial}
                    className={
                            userRole > 2
                                ? activeApproveMaterial
                                    ? "internActiveFlexButton"
                                    : "internPassiveFlexButton"
                                : "internProhibitedFlexButton"
                            }>
                    Neues Material freigeben
                </button>

            </div>
            <div>
                {activeProfile? <ProfilePage/>:(<div></div>)}
                {activePrivateSearch? <PrivateSearchPage userName={{userName}}/> : (<div></div>)}
                {activeNewMaterial? <CreateBNEMaterial />:(<div></div>)}
                {activeApproveMember? <ApproveNewMembersPage />:(<div></div>)}
                {activeApproveMaterial? <ApproveNewMaterialPage />:(<div></div>)}
            </div>
        </div>
    );
}

export default InternPage;
